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

    $scope.remove = function (contactId) {
        console.log('Contact ID : ' + contactId);
        $http.delete('/contactlist/' + contactId).success(function (response) {
            refresh();
        });
    };

    $scope.edit = function (contactId) {
        console.log('edit Contact ID : ' + contactId);
        $http.get('/contactlist/' + contactId).success(function (response) {
            $scope.contact = response;
        });
    };

    $scope.update = function () {
        console.log('Update : ', $scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
            refresh();
        });
    };

    $scope.deselect = function () {
        $scope.contact = "";

    };

}]);