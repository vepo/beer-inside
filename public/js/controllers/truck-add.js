(function () {
  angular.module('beerMonitor').controller('AddTuck', [
    '$location',
    'beerService',
    'truckService',
    function ($location, beerService, truckService) {
      let vm = this;
      vm.beers = [];
      vm.data = {
        containers: [{}]
      }
      vm.addContainer = function () {
        vm.data.containers.push({});
      };
      vm.removeContainer = function (index) {
        vm.data.containers.splice(index, 1);
      };
      vm.save = function () {
        truckService.create(vm.data).then(() => $location.path('/truck'));
      };
      beerService.list().then(resp => vm.beers = resp.data);
    }
  ]);
})();