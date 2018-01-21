(function () {
  angular.module('beerMonitor').directive('container', function () {
    return {
      restrict: 'E',
      scope: {
        container: '='
      },
      template: '<div><b>Code:</b>{{ container.code }}</div><div ng-if="container.temperature!= undefined"><b>Temperature:</b> {{ container.temperature }}</div><div>Temperature not updated!</div><div><b>Acceptable range:</b> Min: {{ container.minTemperature }}&#8451; Max: {{ container.maxTemperature }}&#8451;</div><h3>Beers</h3><div ng-repeat="beer in container.beers" ng-class="{ hot: beer.maxTemperature < container.temperature, cold: beer.minTemperature > container.temperature}"><div>{{ beer.name }} Min: {{ beer.minTemperature }}&#8451; Max: {{ beer.maxTemperature }}&#8451;</div></div>'
    };
  });
})();