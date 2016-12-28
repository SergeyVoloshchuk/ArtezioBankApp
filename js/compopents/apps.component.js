(function() {
    'use strict';
    angular.module('app.components').component('apps', {
        templateUrl: '../templates/apps.template.html',
        bindings: {
            types: '<',
            service: '<',
            period: '<',
            method: '<',
            code: '<',
            bank: '<'
        },

        controller: function(storageUpdater) {
            var vm = this;
            //  vm.collectApps = [] ;
            vm.typeApps = vm.types.types;
            vm.services = vm.service.services;
            vm.periods = vm.period.period;
            vm.codes = vm.code.codes;
            vm.methods = vm.method.methods;
            vm.banks = vm.bank.banks;
            vm.validTime = validTime;
            vm.periodCheck = periodCheck;

            vm.deleteItem = deleteItem;
            vm.goUpdateItem = goUpdateItem;
            vm.updateItem = updateItem;
            vm.back = back;
            activate();

            function activate() {
                console.log("collectApps activate");

                // если там ничего нет
                if (localStorage.getItem("collectApps") === null || localStorage.getItem("collectApps") === "[]") {

                    vm.nullTable = true;

                } else {
                    vm.collectApps = [];
                    var collectAppsAll = storageUpdater.getItem("collectApps");
                    vm.nullTable = false;

                    //выводить будем только те, которые создал пользователь(исключение админ.)
                    var person = storageUpdater.getItem("person");
                    for (var i = 0; i < collectAppsAll.length; i++) {
                        if (collectAppsAll[i].idPerson === person.id && person.role !== 1) {

                            vm.collectApps[i] = collectAppsAll[i];

                        }
                        if (person.role === 1) {
                            vm.collectApps = collectAppsAll;
                        }
                    }

                }
            }

            function deleteItem(id) {
                vm.collectApps.splice(id, 1);
                //
                storageUpdater.updateItem("collectApps", vm.collectApps);
                vm.collectApps = storageUpdater.getItem("collectApps");
                activate();
            }

            function goUpdateItem(index) {
                vm.inpFlag = true;
                vm.id = vm.collectApps[index].id;
                vm.fioAndOrg = vm.collectApps[index].fioAndOrg;
                vm.typeInp = vm.collectApps[index].typeInp;
                vm.otherText = vm.collectApps[index].otherText;
                vm.bankIt = vm.collectApps[index].bankIt;
                vm.inn = vm.collectApps[index].inn;
                vm.kpp = vm.collectApps[index].kpp;
                vm.fullNameOrg = vm.collectApps[index].fullNameOrg;
                vm.phoneForm = vm.collectApps[index].phoneForm;
                vm.numberItem = vm.collectApps[index].numberItem;
                vm.bik = vm.collectApps[index].bik;
                vm.numberCorrect = vm.collectApps[index].numberCorrect;
                vm.numberSwift = vm.collectApps[index].numberSwift;
                vm.otherRec = vm.collectApps[index].otherRec;

            }

            function updateItem(item, text, index) {
                item.name = vm.newName;
                vm.periods.splice(index, 1, item)
                storageUpdater.updateItem("period", vm.periods);
                vm.periods = storageUpdater.getItem("period");
                console.log(vm.services);
                vm.inpFlag = false;
            }

            function back() {
                vm.inpFlag = false;
            }

                //валидация рабочих дней
            function validTime(val) {
                if (val === undefined || val === '') {
                    return false;
                } else {
                    return true;
                }
            }

            function periodCheck(val) {
                if (val === "День недели") {
                    return true;
                } else {
                    return false;
                }
            }

        }
    })
})();