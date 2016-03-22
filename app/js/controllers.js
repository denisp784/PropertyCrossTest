testPropertyCross.controller('FindController', ['$scope', '$window', 'loadService', 'storageService',
    function ($scope, $window, loadService, storageService) {
        $scope.type_deal = 'buy';
        $scope.historyData = [];
        $scope.historyData = $scope.historyData.concat(storageService.getHistory(storageHistoryPath));
        $scope.getBuildings = function () {
            if ($scope.findForm.$valid) {
                loadService.getBuildings($scope.city, $scope.type_deal, '1').then(function (response) {
                    $scope.response = response.data;
                    var href = '';
                    console.info(response);
                    if (['100', '101', '110'].indexOf($scope.response.response.application_response_code) > -1) {
                        href = '#/buildings?city=' + $scope.city + '&type_deal=' + $scope.type_deal;
                        var historyObj = {
                            'city': $scope.city,
                            'type_deal': $scope.type_deal,
                            'link': href,
                            'count': 0
                        };
                        $scope.historyData.unshift(historyObj);
                        storageService.saveHistory(storageHistoryPath, $scope.historyData);
                    }else{
                        href = '#/error';
                    }
                    $window.location.href = href;
                })
            };
        }
        $scope.clearHistory = function () {
            storageService.saveHistory(storageHistoryPath, []);
            $scope.historyData = [];
        }
    }]);

testPropertyCross.controller('ResultController', ['$scope', '$routeParams', '$http', '$window', 'loadService', 'storageService',
    function ($scope, $routeParams, $http, $window, loadService, storageService) {
        $scope.city = $routeParams.city;
        $scope.type_deal = $routeParams.type_deal;
        $scope.page = 1;
        $scope.pages = [];
        loadService.getBuildings($scope.city, $scope.type_deal, $scope.page).then(function (buildings) {
            $scope.buildings = buildings.data;
            $scope.responseCode = $scope.buildings.response.application_response_code;
            console.info($scope.responseCode);
            if (['100', '101', '110'].indexOf($scope.responseCode) > -1) {
                $scope.resp = $scope.buildings.response.listings;
                $scope.resultCount = $scope.buildings.response.total_results;
                $scope.pagesCount = $scope.buildings.response.total_pages;
                storageService.setResultCount(storageHistoryPath, $scope.city, $scope.type_deal, $scope.resultCount, $scope.page);
            } else {
                $window.location.href = '#/error'
            }
        });

        $scope.getNumbersPages = function (page) {
            var count = $scope.pagesCount;
            var to = count < 11 ? count : 11;
            var pages = [];

            for (var i = 0; i < to; i++) {
                pages.push(page - parseInt(to / 2) + i);
            }
            var diff = pages[0];
            if (diff < 1) {
                for (var i = 0; i < to; i++) {
                    pages[i] += (-diff) + 1;
                }
            }
            diff = count - pages[to - 1];

            if (diff < 0) {
                for (var i = 0; i < to; i++) {
                    pages[i] += diff;
                }
            }

            return pages;
        }

        $scope.setPage = function (page) {
            $scope.page = page;
            loadService.getBuildings($scope.city, $scope.type_deal, $scope.page).then(function (buildings) {
                $scope.buildings = buildings.data;
                $scope.resp = $scope.buildings.response.listings;
            });
        }

        $scope.getPrevPage = function () {
            if ($scope.page > 1) {
                $scope.page--;
                loadService.getBuildings($scope.city, $scope.type_deal, $scope.page).then(function (buildings) {
                    $scope.buildings = buildings.data;
                    $scope.resp = $scope.buildings.response.listings;
                });
            }
        }

        $scope.getNextPage = function () {
            if ($scope.page < $scope.pagesCount) {
                $scope.page++;
                loadService.getBuildings($scope.city, $scope.type_deal, $scope.page).then(function (buildings) {
                    $scope.buildings = buildings.data;
                    $scope.resp = $scope.buildings.response.listings;
                });
            }
        }

    }]);