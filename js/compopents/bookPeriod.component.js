(function() {
    'use strict';
    angular.module('app.components').component('bookPeriod', {
        templateUrl: '../templates/bookPeriod.template.html',
        bindings: {
            period: '<'
        },
        controller: function(storageUpdater) {
            var vm = this;
            vm.periods = vm.period.period;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            activate();

            function activate() {
                console.log("bookPeriod activate");

                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("period") === null) {
                    storageUpdater.updateItem("period", vm.period.period);
                    vm.periods = storageUpdater.getItem("period");

                } else {
                    vm.periods = storageUpdater.getItem("period");
                }
            }

            function deleteItem(id) {
                vm.periods.splice(id, 1);
                //
                storageUpdater.updateItem("period", vm.periods);
                vm.periods = storageUpdater.getItem("period");
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(item, text, index) {
                item.name = vm.newName;
                vm.periods.splice(index, 1, item)
                storageUpdater.updateItem("period", vm.periods);
                vm.periods = storageUpdater.getItem("period");
                console.log(vm.services);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }
            function add() {
                var item = {};
                item.id = vm.periods[vm.periods.length - 1].id + 1;
                item.name = vm.newText;
                item.$$hashKey = vm.periods[vm.periods.length - 1].$$hashKey + 1;
                vm.periods.push(item);
                vm.newText = "";
                storageUpdater.updateItem("period", vm.periods);
                vm.periods = storageUpdater.getItem("period");
            }
        }
    })
})();