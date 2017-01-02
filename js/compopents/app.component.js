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

            var vm = this;

            vm.createApp = createApp;
            vm.typeApps = vm.types.types;
            vm.services = vm.service.services;
            vm.addItem = addItem;
            vm.periods = vm.period.period;
            vm.codes = vm.code.codes;
            vm.methods = vm.method.methods;
            vm.banks = vm.bank.banks;
            vm.validTime = validTime;
            vm.periodCheck = periodCheck;
            vm.deleteItem = deleteItem;
            vm.copyItem = copyItem;

            activate();

            function activate() {
                console.log("app component");
                vm.listIncasObj = [];
                vm.listApps = [];
                //сохраняем в локальное хранилище если там ничего нет
                if (localStorage.getItem("services") === null ||
                    localStorage.getItem("types") === null ||
                    localStorage.getItem("period") === null ||
                    localStorage.getItem("method") === null ||
                    localStorage.getItem("codes") === null ||
                    localStorage.getItem("banks") === null ||
                    localStorage.getItem("collectItems") === null ||
                    localStorage.getItem("collectApps") === null) {

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

                    storageUpdater.updateItem("collectItems", vm.listIncasObj);
                    vm.listIncasObj = storageUpdater.getItem("collectItems");

                    storageUpdater.updateItem("collectApps", vm.listApps);
                    vm.listApps = storageUpdater.getItem("collectApps");

                } else {

                    vm.services = storageUpdater.getItem("services");
                    vm.typeApps = storageUpdater.getItem("types");
                    vm.periods = storageUpdater.getItem("period");
                    vm.methods = storageUpdater.getItem("method");
                    vm.codes = storageUpdater.getItem("codes");
                    vm.banks = storageUpdater.getItem("banks");
                    vm.listIncasObj = storageUpdater.getItem("collectItems");
                    vm.listApps = storageUpdater.getItem("collectApps");

                }
            }




            function createApp() {
                console.log("APP CREATE");
                var dateFormat = getDataFormat();
                var id = 1;
                var number;
                var person = storageUpdater.getItem("person");
                var idPerson = person.id;

                var itemApp = new CollectionApp(vm.appform.typeInp.$modelValue, vm.appform.fioAndOrg.$modelValue, vm.appform.otherText.$modelValue, vm.appform.bankIt.$modelValue,
                    vm.appform.inn.$modelValue, vm.appform.kpp.$modelValue, vm.appform.fullNameOrg.$modelValue,
                    vm.appform.phoneForm.$modelValue, vm.appform.numberItem.$modelValue, vm.appform.bik.$modelValue,
                    vm.appform.numberCorrect.$modelValue, vm.appform.numberSwift.$modelValue, vm.appform.otherRec.$modelValue,
                    vm.listIncasObj, id, idPerson, dateFormat, number);

                if (vm.listApps.length === 0) {

                    itemApp.id = 1;
                    itemApp.number = "2-0000001";


                } else {

                    var str = vm.listApps[vm.listApps.length - 1].number;
                    str = String(str);
                    str = str.substring(2);
                    var pos;
                    var ch = 0;
                    var newStr = "2-";
                    for (var i = 0; i < str.length; i++) {
                        if (str[i] !== "0") {
                            pos = i;
                            ch++;
                            break;
                        }
                        newStr += "0";

                    }
                    str = str.substring(pos);
                    number = +str;
                    number = number + 1;
                    newStr += number;
                    itemApp.number = newStr;

                   // itemApp.$$hashKey = vm.listApps[vm.listApps.length - 1].$$hashKey + 1;
                    itemApp.id = vm.listApps[vm.listApps.length - 1].id + 1;


                }



                vm.listApps.push(itemApp);

                //очистка полей и перевод формы в невалидное состояние
                vm.appform.$invalid = true;
                for (var prop in vm.appform) {

                    if (vm[prop] !== undefined) {

                        vm[prop] = null;
                        vm.appform[prop].$pristine = true;
                    }
                }

                vm.appSucces = true;
                storageUpdater.updateItem("collectApps", vm.listApps);
                vm.listApps = storageUpdater.getItem("collectApps");
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


            function addItem() {
                var id;
                var person = storageUpdater.getItem("person");
                var idPerson = person.id;
                var itemCollect = new CollectionObj(vm.objForm.timeGetCash.$modelValue,
                    vm.objForm.cashType.$modelValue, vm.objForm.periodServ.$modelValue,
                    vm.objForm.day.$modelValue, vm.objForm.cashLen.$modelValue,
                    vm.objForm.mainPepCont.$modelValue, vm.objForm.workdayFirst.$modelValue,
                    vm.objForm.workdaySecond.$modelValue,
                    vm.objForm.saturdayFirst.$modelValue, vm.objForm.saturdaySecond.$modelValue,
                    vm.objForm.sundayFirst.$modelValue, vm.objForm.sundaySecond.$modelValue,
                    vm.objForm.typeCity.$modelValue,
                    vm.objForm.typeAdress.$modelValue, vm.objForm.nameCityPoint.$modelValue,
                    vm.objForm.street.$modelValue, vm.objForm.numberHouse.$modelValue,
                    vm.objForm.corpusHouse.$modelValue, vm.objForm.servIt.$modelValue,
                    id, idPerson);

                if (vm.listIncasObj.length === 0) {

                    itemCollect.id = 1;

                } else {
                    if (vm.listIncasObj[vm.listIncasObj.length - 1].id + 1 > 50) {
                        console.log("Превышен пердел");
                        return;
                    }
                   // itemCollect.$$hashKey = vm.listIncasObj[vm.listIncasObj.length - 1].$$hashKey + 1;

                    itemCollect.id = vm.listIncasObj[vm.listIncasObj.length - 1].id + 1;
                }


                vm.listIncasObj.push(itemCollect);


                //очистка полей и перевод формы в невалидное состояние
                vm.objForm.$invalid = true;
                for (var prop in vm.objForm) {

                    if (vm[prop] !== undefined) {

                        vm[prop] = null;
                        vm.objForm[prop].$pristine = true;
                    }
                }

                vm.itemSucces = true;

                storageUpdater.updateItem("collectItems", vm.listIncasObj);
                vm.listIncasObj = storageUpdater.getItem("collectItems");



            }

            function deleteItem(id) {
                vm.listIncasObj.splice(id, 1);
                //
                storageUpdater.updateItem("collectItems", vm.listIncasObj);
                vm.listIncasObj = storageUpdater.getItem("collectItems");
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

            function copyItem(index) {
                //копируем
                var str = JSON.stringify(vm.listIncasObj[index]);
                var item = JSON.parse(str);
                item.$$hashKey = vm.listIncasObj[vm.listIncasObj.length - 1].$$hashKey + 1;
                vm.listIncasObj.push(item);
                storageUpdater.updateItem("collectItems", vm.listIncasObj);
                vm.listIncasObj = storageUpdater.getItem("collectItems");

            }

            function resetForm(formModel) {
                angular.copy({}, formModel);
            }




        }

    })
})();