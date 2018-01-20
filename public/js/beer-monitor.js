(function () {
  let app = angular.module('beerMonitor', ['ngRoute']);
  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "main.html"
      })
      .when("/truck", {
        controller: 'TruckList',
        templateUrl: "/controllers/truck-list.html"
      });
    $locationProvider.html5Mode(true);
  }]);
  app.component('beerMonitorHeader', {
    templateUrl: "beer-monitor-header.html"
  });
})();