var app = angular.module('myApp', ['ngRoute']);
app.controller('myCtrl', function($scope) {
    var self = this;
    
    self.callers = [
        {
            id: "203-907-7424",
            name: "Chris Lim",
            action: "called",
            mood: 12
        },
        {
            id: "973-203-4657",
            name: "Morgue Town",
            action: "hung up",
            mood: 96
        },
        {
            id: "561-543-2344",
            name: "Kev Roof",
            action: "update",
            mood: 34
        },
        {
            id: "561-543-2344",
            name: "Kev Roof",
            action: "update",
            mood: 78
        },
        {
            id: "561-543-2344",
            name: "Kev Roof",
            action: "update",
            mood: 66
        },
        {
            id: "561-543-2344",
            name: "Kev Roof",
            action: "update",
            mood: 44
        }
    ];
});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/details', {
        templateUrl: '/public/view/details.html',
        controller: 'detailsCtrl'
    });
}]);