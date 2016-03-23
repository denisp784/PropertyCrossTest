var detailsDirectiveController = function ($routeParams, $http, $window, loadService, buildingService) {
    var self = this;
    this.city = $routeParams.city;
    this.typeDeal = $routeParams.typeDeal;
    this.page = 1;
    this.pages = [];
    loadService.getBuildings(this.city, this.typeDeal, this.page).then(function (buildings) {
            self.buildings = buildings.data;
            self.resp = self.buildings.response.listings;
            self.pagesCount = self.buildings.response.total_pages;
            self.resultCount = self.buildings.response.total_results;
        }
    );

    this.getNumbersPages = function (page) {
        var maxPages = 11;
        var count = self.pagesCount;
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

    this.toBuilding = function (buildingData) {
        buildingService.saveData(buildingData);
        $window.location.href = '#/details'
    }

    //pages
    this.setPage = function (page) {
        self.page = page;
        loadService.getBuildings(this.city, this.typeDeal, this.page).then(function (buildings) {
            self.buildings = buildings.data;
            self.resp = self.buildings.response.listings;
        });
    }

    this.getPrevPage = function () {
        if (this.page > 1) {
            this.page--;
            loadService.getBuildings(this.city, this.typeDeal, this.page).then(function (buildings) {
                self.buildings = buildings.data;
                self.resp = self.buildings.response.listings;
            });
        }
    }

    this.getNextPage = function () {
        if (this.page < this.pagesCount) {
            this.page++;
            loadService.getBuildings(this.city, this.typeDeal, this.page).then(function (buildings) {
                self.buildings = buildings.data;
                self.resp = self.buildings.response.listings;
            });
        }
    }

    this.toBuilding = function (buildingData) {
        buildingService.saveData(buildingData);
        $window.location.href = '#/details'
    }
}


testPropertyCross.directive('firstDir', function () {
    return {
        scope: {},
        require: 'ngModel',
        bindToController: true,
        templateUrl: 'results/resultsTemplate.html',
        controller: detailsDirectiveController,
        controllerAs: 'ctrl'
    }
});