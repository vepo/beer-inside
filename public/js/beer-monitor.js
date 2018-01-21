(function () {
  let app = angular.module('beerMonitor', ['ngRoute', 'checklist-model']);
  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "main.html"
      })
      .when("/container", {
        controllerAs: 'ctrl',
        controller: 'ContainerList',
        templateUrl: "/controllers/container-list.html"
      })
      .when("/truck", {
        controllerAs: 'ctrl',
        controller: 'TruckList',
        templateUrl: "/controllers/truck-list.html"
      })
      .when("/truck/new", {
        controllerAs: 'ctrl',
        controller: 'AddTuck',
        templateUrl: "/controllers/truck-add.html"
      });
    $locationProvider.html5Mode(true);
  }]);
  app.component('beerMonitorHeader', {
    templateUrl: "beer-monitor-header.html"
  });
})();