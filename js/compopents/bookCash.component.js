(function() {
    'use strict';
    angular.module('app.components').component('bookCash', {
        templateUrl: '../templates/bookCash.template.html',
        bindings: {
            code: '<'
        },
        controller: function(bookService) {
            var vm = this;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            var itemStr = "codes";
            activate();

            function activate() {

                vm.codes = bookService.activateBook(itemStr, vm.code.codes);

            }

            function deleteItem(id ) {
                vm.codes = bookService.deleteItem(id, vm.codes, itemStr);
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(text, index) {
                vm.codes = bookService.updateItem(text, index, vm.codes , itemStr);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

            function add(text) {
                vm.codes = bookService.add(text ,vm.codes , itemStr);
            }

        }
    })
})();