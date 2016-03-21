testPropertyCross.service('loadService', function ($http) {
    this.getBuilds = function (city, type_deal) {
        return $http({
            url: "http://api.nestoria.co.uk/api",
            method: "JSONP",
            params: {
                country: 'uk',
                pretty: '1',
                action: 'search_listings',
                encoding: 'json',
                listing_type: type_deal,
                page: '1',
                place_name: city,
                callback: 'JSON_CALLBACK'
            }
        }).then(function (data) {
            return data;
        });
    }
})

testPropertyCross.service('storageService', function () {
    this.saveHistory = function (historyData){
        window.localStorage['historyData'] = JSON.stringify(historyData);
    }

    this.getHistory = function () {
        return JSON.parse(window.localStorage['historyData'] || '{}');
    }

    this.setResultCount = function (city, type_deal, count) {
        var historyData = [];
        historyData = historyData.concat(this.getHistory());
        var flag = true;
        angular.forEach(historyData, function (historyObj) {
            if (flag && historyObj.city == city && historyObj.type_deal == type_deal){
                historyObj.count = count;
                flag = false;
            }
        });
        this.saveHistory(historyData);
    }
});