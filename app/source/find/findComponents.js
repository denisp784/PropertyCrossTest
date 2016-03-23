var findComponentController = function ($window, loadService, historyService) {
    var self = this;
    this.typeDeal = 'buy';
    this.historyData = [];
    this.visibleError = '';
    this.historyData = this.historyData.concat(historyService.getHistory());
    this.getBuildings = function () {
        self.visibleError = ''
            loadService.getBuildings(self.city, self.typeDeal, '1').then(function (response) {
                var response = response.data;
                var href = '';
                if (['100', '101', '110'].indexOf(response.response.application_response_code) > -1) {
                    href = '#/buildings?city=' + self.city + '&typeDeal=' + self.typeDeal;
                    var historyObj = {
                        'city': self.city,
                        "typeDeal": self.typeDeal == 'buy' ? 'Buy' : 'Rent',
                        'link': href,
                        'count': response.response.total_results
                    };
                    self.historyData.unshift(historyObj);
                    historyService.saveHistory(self.historyData);
                    $window.location.href = href;
                } else {
                    self.visibleError = 'There was a problem with your search';
                }
            })

        ;
    };
}

var findComponentHistoryController = function ($window, historyService) {
    var self = this;
    this.historyData = [];
    this.historyData = this.historyData.concat(historyService.getHistory());
    this.clearHistory = function () {
        self.historyData = [];
        historyService.saveHistory(self.historyData);
    }
}

testPropertyCross.component('findComponent',{
    templateUrl:'find/findTemplate.html',
    controller:findComponentController,
    controllerAs: 'ctrl'
});

testPropertyCross.component('findComponentHistory',{
    templateUrl:'find/findHistoryTemplate.html',
    controller:findComponentHistoryController,
    controllerAs: 'ctrl'
});