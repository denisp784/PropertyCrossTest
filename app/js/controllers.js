testPropertyCross.controller('FindController', ['$scope', '$window', 'loadService', 'historyService',
    function ($scope, $window, loadService, historyService) {
        $scope.typeDeal = 'buy';
        $scope.historyData = [];
        $scope.historyData = $scope.historyData.concat(historyService.getHistory());
        $scope.getBuildings = function () {
            if ($scope.findForm.$valid) {
                loadService.getBuildings($scope.city, $scope.typeDeal, '1').then(function (response) {
                    var response = response.data;
                    var href = '';
                    if (['100', '101', '110'].indexOf(response.response.application_response_code) > -1) {
                        href = '#/buildings?city=' + $scope.city + '&typeDeal=' + $scope.typeDeal;
                        var historyObj = {
                            'city': $scope.city,
                            "typeDeal": $scope.typeDeal == 'buy' ? 'Buy' : 'Rent',
                            'link': href,
                            'count': response.response.total_results
                        };
                        $scope.historyData.unshift(historyObj);
                        historyService.saveHistory($scope.historyData);
                    } else {
                        href = '#/error';
                    }
                    $window.location.href = href;
                })
            }
            ;
        }
        $scope.clearHistory = function () {
            $scope.historyData = [];
            historyService.saveHistory($scope.historyData);
        }
    }]);

testPropertyCross.controller('ResultController', ['$scope', '$routeParams', '$http', 'loadService',
    function ($scope, $routeParams, $http, loadService) {
        $scope.city = $routeParams.city;
        $scope.typeDeal = $routeParams.typeDeal;
        $scope.page = 1;
        $scope.pages = [];
        loadService.getBuildings($scope.city, $scope.typeDeal, $scope.page).then(function (buildings) {
            $scope.buildings = buildings.data;
            $scope.resp = $scope.buildings.response.listings;
            $scope.pagesCount = $scope.buildings.response.total_pages;
        });

        $scope.getNumbersPages = function (page) {
            var maxPages = 11;
            var count = $scope.pagesCount;
            var to = count < maxPages ? count : maxPages;
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
            loadService.getBuildings($scope.city, $scope.typeDeal, $scope.page).then(function (buildings) {
                $scope.buildings = buildings.data;
                $scope.resp = $scope.buildings.response.listings;
            });
        }

        $scope.getPrevPage = function () {
            if ($scope.page > 1) {
                $scope.page--;
                loadService.getBuildings($scope.city, $scope.typeDeal, $scope.page).then(function (buildings) {
                    $scope.buildings = buildings.data;
                    $scope.resp = $scope.buildings.response.listings;
                });
            }
        }

        $scope.getNextPage = function () {
            if ($scope.page < $scope.pagesCount) {
                $scope.page++;
                loadService.getBuildings($scope.city, $scope.typeDeal, $scope.page).then(function (buildings) {
                    $scope.buildings = buildings.data;
                    $scope.resp = $scope.buildings.response.listings;
                });
            }
        }

    }]);