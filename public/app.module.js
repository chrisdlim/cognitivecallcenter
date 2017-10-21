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
        controller: "detailsCtrl"
    });
});

app.controller('homeCtrl', ['$scope', 'SocketService', '$http' function($scope, SocketService, $http) {
    var self = this;
    self.ss = SocketService;

    self.ss.register($scope, (data) => {
      // console.log(data);
    });
    var url = "";

    $http.get(url)
      .then(function(response){
        //process list of data
      });

    self.callers = [
        {
            id: "203-907-7424",
            name: "Chris Lim",
            action: "in-progress",
            mood: 12,
            transcript: "I love monica I love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monica"
        },
        {
            id: "973-203-4657",
            name: "Morgue Town",
            action: "hung-up",
            mood: 96,
            transcript: "Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! "
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
            action: "in-progress",
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
            action: "hung-up",
            mood: 44
        }
    ];

}]);

app.controller('detailsCtrl', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
  var caller   = $location.search();
  var self = this;

  self.caller = caller;

  $scope.connectCall = function(){
    console.log("Connecting with: " + caller.id);
  }
}]);
