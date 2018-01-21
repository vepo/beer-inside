(function () {
  angular.module('beerMonitor').service('truckService', [
    '$http',
    function ($http) {
      return {
        list: function () {
          return $http.get('/api/truck/');
        },
        create: function (truck) {
          return $http.post('/api/truck', truck);
        },
        delete: function (id) {
          return $http.delete('/api/truck/' + id);
        }
      };
    }
  ]);
})();