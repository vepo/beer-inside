(function () {
  angular.module('beerMonitor').service('beerService', [
    '$http',
    function ($http) {
      return {
        list: function () {
          return $http.get('/api/beer/');
        }
      };
    }
  ]);
})();