(function() {
    'use strict';
    angular.module('app.helpers')
        .service('bookService', BookService);
    BookService.$inject = ['storageUpdater'];

    function BookService(storageUpdater) {
        var service = {
            activateBook: activateBook,
            deleteItem: deleteItem,
            updateItem: updateItem,
            add: add

        };
        return service;


        function activateBook(itemStr, bookObjStart) {
            //сохраняем в локальное хранилище если там ничего нет
            var items = [];
            if (localStorage.getItem(itemStr) === null) {
                storageUpdater.updateItem(itemStr, bookObjStart);
                items = storageUpdater.getItem(itemStr);
                return items;

            } else {
                items = storageUpdater.getItem(itemStr);
                return items;
            }
        }

        function deleteItem(id, bookObj, itemStr) {
            bookObj.splice(id, 1);
            storageUpdater.updateItem(itemStr, bookObj);
            bookObj = storageUpdater.getItem(itemStr);
            return bookObj;
        }

        function updateItem(text, index, bookObj, itemStr) {

            bookObj[index].name = text;
            storageUpdater.updateItem(itemStr, bookObj);
            bookObj = storageUpdater.getItem(itemStr);
            return bookObj;
        }


        function add(text, bookObj, itemStr) {
            var item = {};
            var str = JSON.stringify(bookObj[bookObj.length - 1]);
            item = JSON.parse(str);
            delete item.$$hashKey;
            item.name = text;
            item.id = item.id + 1;
            bookObj.push(item);
            storageUpdater.updateItem(itemStr, bookObj);
            bookObj = storageUpdater.getItem(itemStr);
            return bookObj;
        }



    }
})();