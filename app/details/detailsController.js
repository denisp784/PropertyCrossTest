testPropertyCross.controller('detailsController',['$scope', 'buildingService', function ($scope, buildingService) {
    $scope.building = buildingService.getData();
    $scope.imgUrl = $scope.building.img_url;
    $scope.bedroom_number = $scope.building.bedroom_number;
}]);