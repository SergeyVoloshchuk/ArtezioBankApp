(function() {
    'use strict';
    angular.module('app.components').component('app', {
        templateUrl: '../templates/app.template.html',
        bindings: {
            types: '<',
            services: '<'
        },
        controller: function() {
            console.log("app component");
            var vm = this;
            vm.createApp = createApp;
            vm.typeApps = vm.types.types;
            vm.services = vm.services.services;
            vm.addItem = addItem;

            vm.listIncasObj = ["gtf","dfsfdsf"];

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

            function getNumberApp(){
                //logic
                return "2-0000000";
            }

            function addItem(){
                vm.listIncasObj.push(vm.city);
            }
        }
    })
})();