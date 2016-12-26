(function() {
    'use strict';

    angular.module('app').controller('MainController', MainController);
    MainController.$inject = ['dataService', 'loginService'];

    function MainController(dataService, loginService, storageUpdater) {
        var vm = this;
        vm.submit = submit;
        vm.logout = logout;
        activate();

        function activate() {
            console.log('Main Controller activated');
            if (localStorage.getItem("isLogin") !== null) {
                vm.isLogin = localStorage.getItem("isLogin");
                vm.person = JSON.parse(localStorage.getItem("person"));
            }

        }

        function logout() {

            vm.isLogin = false;
            localStorage.removeItem("person");
            localStorage.removeItem("isLogin");
            vm.person = null;
        }

        function submit() {

            dataService.getData("../js/json/persons.json").then(function(res) {
                var persons = res;
                var person = loginService.getPerson(persons, vm.login);
                return person;
            }).then(function(res) {
                var flag = loginService.check(vm.login, vm.password, res);
                if (flag === true) {
                    vm.isLogin = localStorage.getItem("isLogin");
                    vm.person = JSON.parse(localStorage.getItem("person"));
                } else {
                    vm.login = "";
                    vm.password = "";
                }

            });

        }

    }


})();