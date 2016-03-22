testPropertyCross.factory('buildingsRequest', function () {
    var request = {};
    var city, type_deal, page;
    function getBuildingsRequest(city, type_deal, page){
        this.city = city || '';
        this.type_deal = type_deal || 'buy';
        this.page = page || '1';
        request = {
            url: "http://api.nestoria.co.uk/api",
            method: "JSONP",
            params: {
                country: 'uk',
                pretty: '1',
                action: 'search_listings',
                encoding: 'json',
                listing_type: this.type_deal,
                page: this.page,
                place_name: this.city,
                callback: 'JSON_CALLBACK'
            }
        };
        return request;
    }
    return{
        getBuildingsRequest:getBuildingsRequest
    }
});

testPropertyCross.service('loadService', function ($http, buildingsRequest) {
    this.getBuilds = function (city, type_deal, page) {
        return $http(buildingsRequest.getBuildingsRequest(city, type_deal, page));
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