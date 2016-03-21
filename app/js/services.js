

testPropertyCross.service('loadService', function ($http) {
    this.getBuilds = function (city, type_deal, page) {
        return $http({
            url: "http://api.nestoria.co.uk/api",
            method: "JSONP",
            params: {
                country: 'uk',
                pretty: '1',
                action: 'search_listings',
                encoding: 'json',
                listing_type: type_deal,
                page: page,
                place_name: city,
                callback: 'JSON_CALLBACK'
            }
        });
    }
})

testPropertyCross.service('storageService', function () {
    this.saveHistory = function (stroragePath, historyData){
        window.localStorage[stroragePath] = JSON.stringify(historyData);
    }

    this.getHistory = function (stroragePath) {
        return JSON.parse(window.localStorage[stroragePath] || '{}');
    }

    this.setResultCount = function (storagePath, city, type_deal, count) {
        var historyData = [];
        historyData = historyData.concat(this.getHistory(storagePath));
        var flag = true;
        angular.forEach(historyData, function (historyObj) {
            if (flag && historyObj.city == city && historyObj.type_deal == type_deal){
                historyObj.count = count;
                flag = false;
            }
        });
        this.saveHistory(storagePath, historyData);
    }
});