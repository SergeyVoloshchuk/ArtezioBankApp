(function () {
    'use strict';
    angular.module('app.components').component('login', {
        templateUrl: '../templates/login.html',
        //  bindings: {
        // person: '<'
        // },

        controller: function () {
            console.log("login component");
            var vm = this;
        }
    })
})();
