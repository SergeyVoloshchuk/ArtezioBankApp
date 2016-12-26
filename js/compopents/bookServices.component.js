(function() {
    'use strict';
    angular.module('app.components').component('bookService', {
        templateUrl: '../templates/bookService.template.html',
        bindings: {
            service: '<'
        },
        controller: function(storageUpdater) {
            console.log("bookService component");
            var vm = this;
            vm.services = vm.service.services;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            activate();

            function activate() {
                console.log("bookService activate");

                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("services") === null) {
                    storageUpdater.updateItem("services", vm.service.services);
                    vm.services = storageUpdater.getItem("services");

                } else {
                    vm.services = storageUpdater.getItem("services");
                }
            }

            function deleteItem(id) {
                vm.services.splice(id, 1);
                //
                storageUpdater.updateItem("services", vm.services);
                vm.services = storageUpdater.getItem("services");
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(item, text, index) {
                item.name = vm.newName;
                vm.services.splice(index, 1, item)
                storageUpdater.updateItem("services", vm.services);
                vm.services = storageUpdater.getItem("services");
                console.log(vm.services);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }
            function add() {
                var item = {};
                item.id = vm.services[vm.services.length - 1].id + 1;
                item.name = vm.newText;
                item.$$hashKey = vm.services[vm.services.length - 1].$$hashKey + 1;
                vm.services.push(item);
                vm.newText = "";
                storageUpdater.updateItem("services", vm.services);
                vm.services = storageUpdater.getItem("services");
            }
        }
    })
})();