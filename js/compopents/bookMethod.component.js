(function() {
    'use strict';
    angular.module('app.components').component('bookMethod', {
        templateUrl: '../templates/bookMethod.template.html',
        bindings: {
            method: '<'
        },
        controller: function(bookService) {
            var vm = this;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
 
            var itemStr = "method";
            activate();

            function activate() {

                 vm.methods = bookService.activateBook(itemStr,  vm.method.methods);

            }

            function deleteItem(id ) {
                 vm.methods = bookService.deleteItem(id,  vm.methods, itemStr);
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(text, index) {
                 vm.methods = bookService.updateItem(text, index,  vm.methods , itemStr);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

            function add(text) {
                 vm.methods = bookService.add(text , vm.methods , itemStr);
            }
           
        }
    })
})();