(function() {
    'use strict';
    angular.module('app.components').component('app', {
        templateUrl: '../templates/app.template.html',
        bindings: {
            types: '<',
            service: '<',
            period: '<',
            method: '<',
            code: '<',
            bank: '<'
        },
        controller: function(storageUpdater) {
            console.log("app component");
            var vm = this;

            vm.createApp = createApp;
            vm.typeApps = vm.types.types;
            vm.services = vm.service.services;
            vm.addItem = addItem;
            vm.periods = vm.period.period;
            vm.codes = vm.code.codes;
            vm.methods = vm.method.methods;
            vm.banks = vm.bank.banks;


            activate();

            function activate() {
                console.log("bookService activate");

                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("services") === null ||
                    localStorage.getItem("types") === null ||
                    localStorage.getItem("period") === null ||
                    localStorage.getItem("method") === null ||
                    localStorage.getItem("codes") === null ||
                    localStorage.getItem("banks") === null) {

                    storageUpdater.updateItem("services", vm.service.services);
                    vm.services = storageUpdater.getItem("services");

                    storageUpdater.updateItem("types", vm.types.types);
                    vm.typeApps = storageUpdater.getItem("types");

                    storageUpdater.updateItem("period", vm.period.period);
                    vm.periods = storageUpdater.getItem("period");

                    storageUpdater.updateItem("method", vm.method.methods);
                    vm.methods = storageUpdater.getItem("method");

                    storageUpdater.updateItem("codes", vm.code.codes);
                    vm.codes = storageUpdater.getItem("codes");

                    storageUpdater.updateItem("banks", vm.bank.banks);
                    vm.banks = storageUpdater.getItem("banks");

                } else {

                    vm.services = storageUpdater.getItem("services");
                    vm.typeApps = storageUpdater.getItem("types");
                    vm.periods = storageUpdater.getItem("period");
                    vm.methods = storageUpdater.getItem("method");
                    vm.codes = storageUpdater.getItem("codes");
                    vm.banks = storageUpdater.getItem("banks");
                }
            }



            vm.listIncasObj = ["gtf", "dfsfdsf"];

            function createApp() {
                console.log("APP CREATE");
                var dateFormat = getDataFormat();

                //Формат поля соответствует маске «2-YYYYYYY», где YYYYYYY системный номер записи.

            }

            function getDataFormat() {
                var date = new Date();
                var currDate = date.getDate();
                var currMonth = date.getMonth() + 1;
                var currYear = date.getFullYear();
                var timeHours = date.getHours();
                var timeMinutes = date.getMinutes()

                return currDate + "." + currMonth + "." + currYear + " " + timeHours + ":" + timeMinutes;
            }

            function getNumberApp() {
                //logic
                return "2-0000000";
            }

            function addItem() {
                vm.listIncasObj.push(vm.city);
            }
        }
    })
})();