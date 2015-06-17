/**
 * Created by k1 on 6/17/15.
 */
var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

    console.log('Hello Controller World from AppCtrl !!!');

    var refresh = function () {
        $http.get('/contactlist').success(function (response) {
            console.log("I got the data i requested !!!");
            $scope.contactlist = response;
            $scope.contact = "";
        });

    };

    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function (response) {
            console.log(response);

            refresh();
        });
    };

}]);