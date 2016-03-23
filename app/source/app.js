var testPropertyCross = angular.module('testPropertyCross', ['ngRoute']);
testPropertyCross.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/buildings', {
        templateUrl: 'results/results.html'}).
    when('/find', {
        templateUrl: 'find/find.html'}).
    when('/details', {
        templateUrl: 'details/details.html',
        controller: 'detailsController'}).
    otherwise({
        redirectTo: '/find'
    });
}]);