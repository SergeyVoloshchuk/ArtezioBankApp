(function() {
    'use strict';
    angular.module('app.components').component('bookService', {
        templateUrl: '../templates/bookService.template.html',
        bindings: {
            service: '<'
        },
        controller: function(bookService) {

            var vm = this;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            var itemStr = "services";
            activate();

            function activate() {
                vm.services = bookService.activateBook(itemStr, vm.service.services);

            }

            function deleteItem(id ) {
                vm.services = bookService.deleteItem(id, vm.services, itemStr);
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(text, index) {
                vm.services = bookService.updateItem(text, index, vm.services , itemStr);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

            function add(text) {
                vm.services = bookService.add(text ,vm.services , itemStr);
            }
        }
    })
})();