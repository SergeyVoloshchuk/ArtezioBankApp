(function() {
    'use strict';
    angular.module('app.components').component('bookMethod', {
        templateUrl: '../templates/bookMethod.template.html',
        bindings: {
            method: '<'
        },
        controller: function(storageUpdater) {
            var vm = this;
            vm.methods = vm.method.methods;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            activate();

            function activate() {
                console.log("bookMethod activate");

                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("method") === null) {
                    storageUpdater.updateItem("method", vm.method.methods);
                    vm.methods = storageUpdater.getItem("method");

                } else {
                    vm.methods = storageUpdater.getItem("method");
                }
            }

            function deleteItem(id) {
                vm.methods.splice(id, 1);
                //
                storageUpdater.updateItem("method", vm.methods);
                vm.methods = storageUpdater.getItem("method");
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(item, text, index) {
                item.name = vm.newName;
                vm.methods.splice(index, 1, item)
                storageUpdater.updateItem("method", vm.methods);
                vm.methods = storageUpdater.getItem("method");
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }
            function add() {
                var item = {};
                item.id = vm.methods[vm.methods.length - 1].id + 1;
                item.name = vm.newText;
                item.$$hashKey = vm.methods[vm.methods.length - 1].$$hashKey + 1;
                vm.methods.push(item);
                vm.newText = "";
                storageUpdater.updateItem("method", vm.methods);
                vm.methods = storageUpdater.getItem("method");
            }
        }
    })
})();