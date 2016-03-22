testPropertyCross.controller('ResultController', ['$scope', '$routeParams', '$http', '$window', 'loadService', 'buildingService',
    function ($scope, $routeParams, $http, $window, loadService, buildingService) {
        $scope.city = $routeParams.city;
        $scope.typeDeal = $routeParams.typeDeal;
        $scope.page = 1;
        $scope.pages = [];
        loadService.getBuildings($scope.city, $scope.typeDeal, $scope.page).then(function (buildings) {
            $scope.buildings = buildings.data;
            $scope.resp = $scope.buildings.response.listings;
            $scope.pagesCount = $scope.buildings.response.total_pages;
            $scope.resultCount = $scope.buildings.response.total_results;
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

        $scope.toBuilding = function (buildingData) {
            buildingService.saveData(buildingData);
            $window.location.href = '#/details'
        }

        //pages
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