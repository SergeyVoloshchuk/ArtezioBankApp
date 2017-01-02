(function() {
    'use strict';
    angular.module('app.helpers')
        .service('loginService', LoginService);
    LoginService.$inject = ['storageUpdater'];
    function LoginService(storageUpdater) {
        var service = {
            check: check,
            getPerson: getPerson
        };
        return service;


        function check(login, pass, user) {
            if(login ===undefined || pass === undefined || user === undefined){
                return false;
            }
            if (login === user.login && pass === user.password) {
                localStorage.setItem("isLogin", true);
                storageUpdater.updateItem("person",user);
                return true;
            }
            else {
                return false;
            }

        }

        function getPerson(persons, login) {
            for (var i in persons.persons) {
                if (login === persons.persons[i].login) {
                    return persons.persons[i];
                }


            }

        }



    }
})();