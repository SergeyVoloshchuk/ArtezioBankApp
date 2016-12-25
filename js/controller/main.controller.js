(function() {
    'use strict';

    angular.module('app').controller('MainController', MainController);
    MainController.$inject = ['dataService', 'loginService'];

    function MainController(dataService, loginService) {
        var vm = this;
        vm.submit = submit;
        vm.logout = logout;
        activate();

        function activate() {
            console.log('Main Controller activated');
        }

        function logout() {

            vm.isLogin = false;
            localStorage.removeItem("role");
            localStorage.removeItem("isLogin");
        }

        function submit() {

            dataService.getData("../js/json/persons.json").then(function(res) {
                var persons = res;
                vm.person = loginService.getPerson(persons,vm.login);
                console.log(vm.person);
                return vm.person;
            }).then(function(res) {
                var flag = loginService.check(vm.login, vm.password, res);
                if (flag === true) {
                    vm.isLogin = localStorage.getItem("isLogin");
                } else {
                    vm.login = "";
                    vm.password = "";
                }

            });

        }

    }


})();