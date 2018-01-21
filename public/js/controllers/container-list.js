(function () {
  angular.module('beerMonitor').controller('ContainerList', ['containerService', function (containerService) {
    let vm = this;
    vm.containers = [];
    vm.update = function (container) {
      containerService.updateTemperature(container.code, container.temperature).then(() => updateAll());
    };

    function updateAll() {
      containerService.list().then(resp => vm.containers = resp.data);
    }
    updateAll();
  }]);
})();