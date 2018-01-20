(function () {
  angular.module('beerMonitor').service('truckService', function () {
    return {
      get: function () {
        return {
          name: 'yeag'
        };
      }
    };
  });
})();