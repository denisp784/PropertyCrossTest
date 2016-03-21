var testPropertyCross = angular.module('testPropertyCross', ['ngRoute']);

testPropertyCross.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/builds', {
        templateUrl: 'views/builds.html',
        controller: 'ResultController'}).
    when('/find', {
        templateUrl: 'views/find.html',
        controller: 'FindController'}).
    otherwise({
        redirectTo: '/find'
    });
}]);