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

              //  var a = storageUpdater.getItem("person");
              //  console.log(a);
            }

        }

        function logout() {

            vm.isLogin = false;
            localStorage.removeItem("person");
            localStorage.removeItem("isLogin");
        }

        function submit() {

            dataService.getData("../js/json/persons.json").then(function(res) {
                var persons = res;
                vm.person = loginService.getPerson(persons, vm.login);
                return vm.person;
            }).then(function(res) {
                var flag = loginService.check(vm.login, vm.password, res);
                if (flag === true) {
                    vm.isLogin = localStorage.getItem("isLogin");
                    vm.role = vm.person.role;
                } else {
                    vm.login = "";
                    vm.password = "";
                }

            });

        }

    }


})();