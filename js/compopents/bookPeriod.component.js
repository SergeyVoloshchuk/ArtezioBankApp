(function() {
    'use strict';
    angular.module('app.components').component('bookPeriod', {
        templateUrl: '../templates/bookPeriod.template.html',
        bindings: {
            period: '<'
        },
        controller: function(bookService) {
            var vm = this;
            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            vm.add = add;
            var itemStr = "period";
            activate();

            function activate() {
                vm.periods = bookService.activateBook(itemStr, vm.period.period);

            }

            function deleteItem(id) {
                vm.periods = bookService.deleteItem(id, vm.periods, itemStr);
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.index = index;
            }

            function updateItem(text, index) {
                vm.periods = bookService.updateItem(text, index, vm.periods, itemStr);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

            function add(text) {
                vm.periods = bookService.add(text, vm.periods, itemStr);
            }
        }
    })
})();