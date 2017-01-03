(function() {
    'use strict';
    angular.module('app.components').component('bookBank', {
        templateUrl: '../templates/bookBank.template.html',
        bindings: {
            bank: '<'
        },
        controller: function(bookService) {
            var vm = this;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            var itemStr = "banks";
            activate();

            function activate() {

                vm.banks = bookService.activateBook(itemStr, vm.bank.banks);

            }

            function deleteItem(id ) {
                vm.banks = bookService.deleteItem(id, vm.banks, itemStr);
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(text, index) {
                vm.banks = bookService.updateItem(text, index, vm.banks , itemStr);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

            function add(text) {
                vm.banks = bookService.add(text ,vm.banks , itemStr);
            }
        }
    })
})();