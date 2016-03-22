var testPropertyCross = angular.module('testPropertyCross', ['ngRoute']);
testPropertyCross.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/buildings', {
        templateUrl: 'views/buildings.html',
        controller: 'ResultController'}).
    when('/find', {
        templateUrl: 'views/find.html',
        controller: 'FindController'}).
    when('/error', {
        templateUrl: 'views/error.html'}).
    otherwise({
        redirectTo: '/find'
    });
}]);