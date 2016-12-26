(function() {
    'use strict';
    angular.module('app.components').component('bookBank', {
        templateUrl: '../templates/bookBank.template.html',
        bindings: {
            bank: '<'
        },
        controller: function(storageUpdater) {
            var vm = this;
            vm.banks = vm.bank.banks;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;

            vm.add = add;
            activate();

            function activate() {
                console.log("bookPeriod activate");

                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("banks") === null) {
                    storageUpdater.updateItem("banks", vm.bank.banks);
                    vm.banks = storageUpdater.getItem("banks");

                } else {
                    vm.banks = storageUpdater.getItem("banks");
                }
            }

            function deleteItem(id) {
                vm.banks.splice(id, 1);
                //
                storageUpdater.updateItem("banks", vm.banks);
                vm.banks = storageUpdater.getItem("banks");
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(item, text, index) {
                item.name = vm.newName;
                vm.banks.splice(index, 1, item)
                storageUpdater.updateItem("banks", vm.banks);
                vm.banks = storageUpdater.getItem("banks");
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

            function add() {
                var item = {};
                item.id = vm.banks[vm.banks.length - 1].id + 1;
                item.name = vm.newText;
                item.$$hashKey = vm.banks[vm.banks.length - 1].$$hashKey + 1;
                vm.banks.push(item);
                vm.newText = "";
                storageUpdater.updateItem("banks", vm.banks);
                vm.banks = storageUpdater.getItem("banks");
            }
        }
    })
})();