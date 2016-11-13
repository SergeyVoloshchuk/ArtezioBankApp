(function () {
    'use strict';
    angular.module('app.helpers')
        .service('dataService', DataService);
    DataService.$inject = ['$http'];

    function DataService($http) {
        var service = {
            getData: getData
        };
        return service;

        function getData(path) {
            return $http.get(path).then(function (res) {
                return res.data;
            })
        }



    }
})();
