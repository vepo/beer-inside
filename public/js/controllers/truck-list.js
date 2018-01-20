(function () {
  angular.module('beerMonitor').controller('TruckList', ['$location', 'truckService', function ($location, truckService) {
    let vm = this;

    vm.trucks = [];
    vm.addNew = function () {
      $location.path('/truck/new');
    };

    truckService.list().then(function (resp) {
      vm.trucks = resp.data;
    }, function (resp) {
      vm.trucks = 'ERROR';
    });
  }]);
})();