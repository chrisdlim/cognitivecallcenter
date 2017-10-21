var app = angular.module('myApp', ['ngRoute']);

app.service('SocketService', function SocketService() {
  var self = this;
  self.socket = io.connect('/');
  self.register = function($scope, cb) {
    self.socket.on('call', function(data) {
      $scope.$apply(function() {
        cb(data);
      });
    });
  };
});

app.controller('myCtrl', ['$scope', 'SocketService', function($scope, SocketService) {
    var self = this;
    self.ss = SocketService;

    self.ss.register($scope, (data) => {
      console.log(data);
    });

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
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/details', {
        templateUrl: '/public/view/details.html',
        controller: 'detailsCtrl'
    });
}]);
