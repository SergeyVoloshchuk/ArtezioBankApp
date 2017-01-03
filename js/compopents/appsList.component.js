(function() {
    'use strict';
    angular.module('app.components').component('appsList', {
        templateUrl: '../templates/appsList.template.html',
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
            vm.deleteSubItem = deleteSubItem;
            vm.copyItem = copyItem;
            vm.goUpdateSubItem = goUpdateSubItem;
            vm.backForItem = backForItem;
            vm.updateSubItem = updateSubItem;
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

                    if (person.role === 1) {
                        vm.collectApps = collectAppsAll;
                    } else {


                        for (var i = 0; i < collectAppsAll.length; i++) {
                            if (collectAppsAll[i].idPerson === person.id && person.role !== 1) {

                                vm.collectApps.push(collectAppsAll[i]);

                            }

                        }

                        if (vm.collectApps.length < 1) {
                            vm.nullTable = true;
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
                vm.listIncasObj = vm.collectApps[index].collectionObjs;

                vm.indexForItem = index;

            }

            function updateItem() {
                var id = vm.indexForItem;

                vm.collectApps[id].fioAndOrg = vm.fioAndOrg;
                vm.collectApps[id].typeInp = vm.typeInp;
                vm.collectApps[id].otherText = vm.other;
                vm.collectApps[id].bankIt = vm.bankIt;
                vm.collectApps[id].inn = vm.inn;
                vm.collectApps[id].kpp = vm.kpp;
                vm.collectApps[id].fullNameOrg = vm.fullNameOrg;
                vm.collectApps[id].phoneForm = vm.phoneForm;
                vm.collectApps[id].numberItem = vm.numberItem;
                vm.collectApps[id].bik = vm.bik;
                vm.collectApps[id].numberCorrect = vm.numberCorrect;
                vm.collectApps[id].numberSwift = vm.numberSwift;
                vm.collectApps[id].otherRec = vm.otherRec;
                vm.collectApps[id].collectionObjs = vm.listIncasObj;
                storageUpdater.updateItem("collectApps", vm.collectApps);
                vm.collectApps = storageUpdater.getItem("collectApps");

                back();
                backForItem();
                vm.itemSucces = false;
            }


            function back() {
                vm.inpFlag = false;
            }

            function backForItem() {
                vm.flagForUpdate = false;
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

            function deleteSubItem(id) {
                vm.listIncasObj.splice(id, 1);
            }

            function copyItem(index) {
                var str = JSON.stringify(vm.listIncasObj[index]);
                var item = JSON.parse(str);
                item.$$hashKey = vm.listIncasObj[vm.listIncasObj.length - 1].$$hashKey + 1;
                vm.listIncasObj.push(item);
            }

            function goUpdateSubItem(index) {
                vm.flagForUpdate = true;
                vm.itemSucces = false;

                vm.timeGetCash = vm.listIncasObj[index].timeGetCash;
                vm.cashType = vm.listIncasObj[index].cashType;
                vm.periodServ = vm.listIncasObj[index].periodServ;
                vm.day = vm.listIncasObj[index].day;
                vm.cashLen = vm.listIncasObj[index].cashLen;
                vm.mainPepCont = vm.listIncasObj[index].mainPepCont;
                vm.workdayFirst = vm.listIncasObj[index].workdayFirst;
                vm.workdaySecond = vm.listIncasObj[index].workdaySecond;
                vm.saturdayFirst = vm.listIncasObj[index].saturdayFirst;
                vm.saturdaySecond = vm.listIncasObj[index].saturdaySecond;
                vm.sundayFirst = vm.listIncasObj[index].sundayFirst;
                vm.sundaySecond = vm.listIncasObj[index].sundaySecond;
                vm.typeCity = vm.listIncasObj[index].typeCity;
                vm.typeAdress = vm.listIncasObj[index].typeAdress;
                vm.nameCityPoint = vm.listIncasObj[index].nameCityPoint;
                vm.street = vm.listIncasObj[index].street;
                vm.numberHouse = vm.listIncasObj[index].numberHouse;
                vm.corpusHouse = vm.listIncasObj[index].corpusHouse;
                vm.servIt = vm.listIncasObj[index].servIt;
                vm.dateWork = vm.listIncasObj[index].dateWork;
                vm.indexItem = index;


            }

            function updateSubItem() {
                var index = vm.indexItem;

                vm.listIncasObj[index].timeGetCash = vm.timeGetCash;
                vm.listIncasObj[index].cashType = vm.cashType;
                vm.listIncasObj[index].periodServ = vm.periodServ;
                vm.listIncasObj[index].day = vm.day;
                vm.listIncasObj[index].cashLen = vm.cashLen;
                vm.listIncasObj[index].mainPepCont = vm.mainPepCont;
                vm.listIncasObj[index].workdayFirst = vm.workdayFirst;
                vm.listIncasObj[index].workdaySecond = vm.workdaySecond;
                vm.listIncasObj[index].saturdayFirst = vm.saturdayFirst;
                vm.listIncasObj[index].saturdaySecond = vm.saturdaySecond;
                vm.listIncasObj[index].sundayFirst = vm.sundayFirst;
                vm.listIncasObj[index].sundaySecond = vm.sundaySecond;
                vm.listIncasObj[index].typeCity = vm.typeCity;
                vm.listIncasObj[index].typeAdress = vm.typeAdress;
                vm.listIncasObj[index].nameCityPoint = vm.nameCityPoint;
                vm.listIncasObj[index].street = vm.street;
                vm.listIncasObj[index].numberHouse = vm.numberHouse;
                vm.listIncasObj[index].corpusHouse = vm.corpusHouse;
                vm.listIncasObj[index].servIt = vm.servIt;
                vm.listIncasObj[index].dateWork = vm.dateWork;

                vm.itemSucces = true;
                backForItem();

            }

        }

    })
})();