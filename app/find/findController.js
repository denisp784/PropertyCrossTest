testPropertyCross.controller('FindController', ['$scope', '$window', 'loadService', 'historyService',
    function ($scope, $window, loadService, historyService) {
        $scope.typeDeal = 'buy';
        $scope.historyData = [];
        $scope.visibleError = '';
        $scope.historyData = $scope.historyData.concat(historyService.getHistory());
        $scope.getBuildings = function () {
            $scope.visibleError = ''
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
                        $window.location.href = href;
                    } else {
                        $scope.visibleError = 'There was a problem with your search';
                    }
                })
            }
            ;
        };
        $scope.clearHistory = function () {
            $scope.historyData = [];
            historyService.saveHistory($scope.historyData);
        }
    }]);