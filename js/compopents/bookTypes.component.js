(function() {
    'use strict';
    angular.module('app.components').component('bookTypes', {
        templateUrl: '../templates/bookTypes.template.html',
        bindings: {
            type: '<'
        },
        controller: function(bookService) {

            var vm = this;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;

            var itemStr = "types";
            activate();

            function activate() {
                vm.types = bookService.activateBook(itemStr, vm.type.types);

            }

            function deleteItem(id) {
                vm.types = bookService.deleteItem(id, vm.types, itemStr);
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(text, index) {
                vm.types = bookService.updateItem(text, index, vm.types, itemStr);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

            function add(text) {
                vm.types = bookService.add(text, vm.types, itemStr);
            }

        }
    })
})();