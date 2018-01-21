(function () {
  angular.module('beerMonitor').controller('TruckList', ['$location', '$interval', 'truckService', function ($location, $interval, truckService) {
    let vm = this;

    vm.trucks = [];
    vm.addNew = function () {
      $location.path('/truck/new');
    };

    vm.removeTruck = function (index) {
      truckService.delete(vm.trucks[index].id).then(() => vm.trucks.splice(index, 1));
    };

    updateAll();

    $interval(updateAll, 1000);

    function updateAll() {
      truckService.list().then(function (resp) {
        vm.trucks = resp.data;
      }, function (resp) {
        vm.trucks = 'ERROR';
      });
    }
  }]);
})();