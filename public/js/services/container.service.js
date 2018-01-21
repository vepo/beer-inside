(function () {
  angular.module('beerMonitor').service('containerService', [
    '$http',
    function ($http) {
      return {
        list: function () {
          return $http.get('/api/container/');
        },
        updateTemperature: function (code, temperature) {
          return $http.put('/api/container/' + code, {
            temperature: temperature
          });
        }
      };
    }
  ]);
})();