testPropertyCross.controller('FindController', ['$scope', '$window', 'storageService', function ($scope, $window, storageService) {
    $scope.type_deal = 'buy';
    $scope.historyData = [];
    $scope.historyData = $scope.historyData.concat(storageService.getHistory());
    $scope.getBuilds = function () {
        var href = '#/builds?city=' + $scope.city + '&type_deal=' + $scope.type_deal;
        var historyObj = {'city': $scope.city,
                          'type_deal': $scope.type_deal,
                          'link' : href,
                          'count' : 0};
        if ($scope.city) {
            $scope.historyData.unshift(historyObj);
            storageService.saveHistory($scope.historyData);
        }
        $window.location.href = href;
    }
}]);

testPropertyCross.controller('ResultController', ['$scope', '$routeParams', '$http', 'loadService', 'storageService', function ($scope, $routeParams, $http, loadService, storageService) {
    $scope.city = $routeParams.city;
    $scope.type_deal = $routeParams.type_deal;
    loadService.getBuilds($scope.city, $scope.type_deal).then(function (builds) {
        $scope.builds = builds.data;
        $scope.resp = $scope.builds.response.listings;
        $scope.resultCount = $scope.builds.response.total_results;
        storageService.setResultCount($scope.city, $scope.type_deal, $scope.resultCount);
    });
}]);