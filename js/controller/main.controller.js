(function() {
    'use strict';

    angular.module('app').controller('MainController', MainController);
    MainController.$inject = ['dataService', 'loginService','storageUpdater','$location'];

    function MainController(dataService, loginService, storageUpdater,$location) {
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

           //тестовое заполнение данными только если там нет данных
           if(localStorage.getItem("collectApps") === null || localStorage.getItem("collectApps") === "[]"){
            dataService.getData("../js/json/apps.json").then(function(res) {
                storageUpdater.updateItem("collectApps", res.massApps );
                storageUpdater.getItem("collectApps");
            });
           } 

        }

        function logout() {

            vm.isLogin = false;
            localStorage.removeItem("person");
            localStorage.removeItem("isLogin");
            activate();
            $location.path("/");

        }

        function submit() {
            dataService.getData("../js/json/persons.json").then(function(res) {
                var persons = res;
                var person = loginService.getPerson(persons, vm.login);
                return person;
            }).then(function(res) {
                vm.loginErrorFlag = false;
                var flag = loginService.check(vm.login, vm.password, res);
                if (flag === true) {
                    vm.isLogin = localStorage.getItem("isLogin");
                    vm.person = JSON.parse(localStorage.getItem("person"));
                } else {
                    vm.login = "";
                    vm.password = "";
                    vm.loginErrorFlag = true;
                }

            });

        }









        

    }


})();