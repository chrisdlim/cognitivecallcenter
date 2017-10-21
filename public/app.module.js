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

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/view/home.html"
    })
     .when("/details", {
        templateUrl : "/view/details.html",
        controller: "detailsCtrl",
        paramExample: 'exampleB'
    });
});

app.controller('homeCtrl', ['$scope', 'SocketService', function($scope, SocketService) {
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
            name: "Kev Roofie",
            action: "update",
            mood: 34
        },
        {
            id: "561-543-2344",
            name: "Kevin's mom",
            action: "update",
            mood: 78
        },
        {
            id: "561-543-2344",
            name: "Morgan's Kate",
            action: "update",
            mood: 66
        },
        {
            id: "561-543-2344",
            name: "Monica the love of my life",
            action: "update",
            mood: 44
        }
    ];
}]);

app.controller('detailsCtrl', ['$scope', '$route', function ($scope, $route) {
    var paramValue = $route.current.$$route.paramExample;
    console.log(paramValue);
}]);
