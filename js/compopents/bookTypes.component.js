(function() {
    'use strict';
    angular.module('app.components').component('bookTypes', {
        templateUrl: '../templates/bookTypes.template.html',
        bindings: {
            type: '<'
        },
        controller: function(storageUpdater) {

            var vm = this;
            vm.types = vm.type.types;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            activate();

            function activate() {
                console.log("bookTypes activate");
                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("types") === null) {
                    storageUpdater.updateItem("types", vm.type.types);
                    vm.types = storageUpdater.getItem("types");

                } else {
                    vm.types = storageUpdater.getItem("types");
                }
            }

            function deleteItem(id) {
                vm.types.splice(id, 1);
                storageUpdater.updateItem("types", vm.types); //обновляем хранилище
                vm.types = storageUpdater.getItem("types"); //получаем новые данные
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(item, text, index) {
                item.name = vm.newName;
                vm.types.splice(index, 1, item)
                storageUpdater.updateItem("types", vm.types); //обновляем хранилище
                vm.types = storageUpdater.getItem("types"); //получаем новые данные
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

        }
    })
})();