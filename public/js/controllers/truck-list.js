(function () {
  angular.module('beerMonitor').controller('TruckList', ['truckService', function (truckService) {
    let vm = this;
    console.log(truckService.get());
  }]);
})();