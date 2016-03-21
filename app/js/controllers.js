testPropertyCross.controller('FindController', ['$scope', '$window', 'storageService', function ($scope, $window, storageService) {
    $scope.type_deal = 'buy';
    $scope.historyData = [];
    $scope.historyData = $scope.historyData.concat(storageService.getHistory(storageHistoryPath));
    $scope.getBuilds = function () {
        var href = '#/buildings?city=' + $scope.city + '&type_deal=' + $scope.type_deal + '&page=1';
        var historyObj = {'city': $scope.city,
                          'type_deal': $scope.type_deal,
                          'link' : href,
                          'count' : 0};
        if ($scope.city) {
            $scope.historyData.unshift(historyObj);
            storageService.saveHistory(storageHistoryPath, $scope.historyData);
        }
        $window.location.href = href;
    }
}]);

testPropertyCross.controller('ResultController', ['$scope', '$routeParams', '$http', '$window', 'loadService', 'storageService',
    function ($scope, $routeParams, $http, $window, loadService, storageService) {
    $scope.city = $routeParams.city;
    $scope.type_deal = $routeParams.type_deal;
    $scope.page = $routeParams.page;
    $scope.pages = [];
    loadService.getBuilds($scope.city, $scope.type_deal, $scope.page).then(function (builds) {
        $scope.builds = builds.data;
        $scope.resp = $scope.builds.response.listings;
        $scope.resultCount = $scope.builds.response.total_results;
        $scope.pagesCount = $scope.builds.response.total_pages;
        storageService.setResultCount(storageHistoryPath ,$scope.city, $scope.type_deal, $scope.resultCount, $scope.page);
        for (var i = 1; i <= $scope.pagesCount; i++){
            $scope.pages.push(i);
        }
    });

    $scope.getNumbersPages = function (page) {
        var count = $scope.pagesCount;
        var to = count < 10 ? count : 10;
        var pages = [];

        for (var i = 0; i < to; i++){
            pages.push(page - (to / 2) + i);
        }

        while (pages[0] < 1){
            for (var i = 0; i < to; i++){
                pages[i]++;
            }
        }

        while (pages[to - 1] > count){
            for (var i = 0; i < to; i++){
                pages[i]--;
            }
        }

        return pages;
    }

    $scope.isActive = function (index, page) {
        return index == '...' ? 'disabled' : index == page ? 'active' : '';
    }

    $scope.setPage = function(page){
        $scope.page = page;
        loadService.getBuilds($scope.city, $scope.type_deal, $scope.page).then(function (builds) {
            $scope.builds = builds.data;
            $scope.resp = $scope.builds.response.listings;
        });
    }

    $scope.getPrevPage = function () {
        if ($scope.page > 1){
            $scope.page--;
            loadService.getBuilds($scope.city, $scope.type_deal, $scope.page).then(function (builds) {
                $scope.builds = builds.data;
                $scope.resp = $scope.builds.response.listings;
            });
        }
    }

    $scope.getNextPage = function () {
        if ($scope.page < $scope.pagesCount){
            $scope.page++;
            loadService.getBuilds($scope.city, $scope.type_deal, $scope.page).then(function (builds) {
                $scope.builds = builds.data;
                $scope.resp = $scope.builds.response.listings;
            });
        }
    }
    
}]);