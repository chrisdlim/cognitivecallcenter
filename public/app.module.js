var app = angular.module('myApp', ['ngRoute']);

app.service('QueryService', ['$http', function QueryService($http) {
  var self = this;
  self.callers = [];
  self._fetched = false;
  self.naughties = function(cb) {
    if(self._fetched) {
      return cb(self.callers);
    }
    $http({
      method: 'GET',
      url: '/logs/naughty'
    }).then(function(data) {
      self.callers = data.data;
      self._fetched = true;
      cb(data);
    }, function errorCallback(response) {
      console.error(response);
    });
  };
}]);

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

app.controller('homeCtrl', ['QueryService', function(qs) {
    var self = this;
    self.qs = qs;

    console.log(qs);

    self.qs.naughties(function(data) {
        self.callers = self.qs.callers;
    });

    // self.callers = [
    //     {
    //         id: "203-907-7424",
    //         name: "Chris Lim",
    //         action: "in-progress",
    //         mood: 12,
    //         transcript: "I love monica I love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monicaI love monica"
    //     },
    //     {
    //         id: "973-203-4657",
    //         name: "Morgue Town",
    //         action: "hung-up",
    //         mood: 96,
    //         transcript: "Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! Kate doesn't like me! "
    //     },
    //     {
    //         id: "561-543-2344",
    //         name: "Kev Roofie",
    //         action: "update",
    //         mood: 34
    //     },
    //     {
    //         id: "561-543-2344",
    //         name: "Kevin's mom",
    //         action: "in-progress",
    //         mood: 78
    //     },
    //     {
    //         id: "561-543-2344",
    //         name: "Morgan's Kate",
    //         action: "update",
    //         mood: 66
    //     },
    //     {
    //         id: "561-543-2344",
    //         name: "Monica the love of my life",
    //         action: "hung-up",
    //         mood: 44
    //     }
    // ];

}]);

app.controller('detailsCtrl', ['$scope', '$route', '$routeParams', '$location', 'QueryService', function ($scope, $route, $routeParams, $location, qs) {
  var index = parseInt($location.search().id);
  var self = this;

  self.qs = qs;

  self.qs.naughties(function(data) {
      self.callers = self.qs.callers;
      self.caller = self.callers[index];
  });

  $scope.connectCall = function(){
    console.log("Connecting with: " + caller.id);
  }
}]);
