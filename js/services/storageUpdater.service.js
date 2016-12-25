(function() {
    'use strict';
    angular.module('app.helpers')
        .service('storageUpdater', StorageUpdater);

    function StorageUpdater() {
        var service = {
            updateItem: updateItem,
            getItem: getItem
        };
        return service;

        function updateItem(key, obj) {

            if (localStorage.getItem(key) === null) {
                var str = JSON.stringify(obj);
                localStorage.setItem(key, str);
                return;
            } else {
                localStorage.removeItem(key);
                var str = JSON.stringify(obj);
                localStorage.setItem(key, str);
                return;
            }
        }

        function getItem(key) {
            var items = JSON.parse(localStorage.getItem(key)); //берём значения
            return items;
        }



    }
})();