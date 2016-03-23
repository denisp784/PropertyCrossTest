testPropertyCross.factory('buildingsRequest', function () {
    var request = {};
    return function(city, typeDeal, page){
        this.city = city || '';
        this.typeDeal = typeDeal || 'buy';
        this.page = page || '1';
        request = {
            url: "http://api.nestoria.co.uk/api",
            method: "JSONP",
            params: {
                country: 'uk',
                pretty: '1',
                action: 'search_listings',
                encoding: 'json',
                listing_type: this.typeDeal,
                page: this.page,
                place_name: this.city,
                callback: 'JSON_CALLBACK'
            }
        };
        return request;
    }
});

testPropertyCross.service('loadService', function ($http, buildingsRequest) {
    this.getBuildings = function (city, typeDeal, page) {
        return $http(new buildingsRequest(city, typeDeal, page));
    }
})

testPropertyCross.service('historyService', function () {

    var storageHistoryPath = 'historyData';

    this.saveHistory = function (historyData){
        localStorage[storageHistoryPath] = JSON.stringify(historyData);
    }

    this.getHistory = function () {
        return JSON.parse(localStorage[storageHistoryPath] || '{}');
    }
});

testPropertyCross.service('buildingService', function () {

    var storageBuildingPath = 'buildingData';

    this.saveData = function (buildingData){
        sessionStorage[storageBuildingPath] = JSON.stringify(buildingData);
    }

    this.getData = function () {
        return JSON.parse(sessionStorage[storageBuildingPath] || '{}');
    }
});