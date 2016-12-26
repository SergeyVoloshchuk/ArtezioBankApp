(function() {
    'use strict';
    angular.module('app.components').component('bookCash', {
        templateUrl: '../templates/bookCash.template.html',
        bindings: {
            code: '<'
        },
        controller: function(storageUpdater) {
            var vm = this;
            vm.codes = vm.code.codes;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            activate();

            function activate() {
                console.log("bookPeriod activate");

                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("codes") === null) {
                    storageUpdater.updateItem("codes", vm.code.codes);
                    vm.codes = storageUpdater.getItem("codes");

                } else {
                    vm.codes = storageUpdater.getItem("codes");
                }
            }

            function deleteItem(id) {
                vm.codes.splice(id, 1);
                //
                storageUpdater.updateItem("codes", vm.codes);
                vm.codes = storageUpdater.getItem("codes");
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(item, text, index) {
                item.name = vm.newName;
                vm.codes.splice(index, 1, item)
                storageUpdater.updateItem("codes", vm.codes);
                vm.codes = storageUpdater.getItem("codes");
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }
            function add() {
                var item = {};
                item.id = vm.codes[vm.codes.length - 1].id + 1;
                item.name = vm.newText;
                item.$$hashKey = vm.codes[vm.codes.length - 1].$$hashKey + 1;
                vm.codes.push(item);
                vm.newText = "";
                storageUpdater.updateItem("codes", vm.codes);
                vm.codes = storageUpdater.getItem("codes");
            }
        }
    })
})();