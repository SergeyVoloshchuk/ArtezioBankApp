(function() {
    'use strict';
    angular.module('app.helpers')
        .service('loginService', LoginService);

    function LoginService() {
        var service = {
            check: check,
            getPerson: getPerson
        };
        return service;


        function check(login, pass, user) {

            if (login === user.login && pass === user.password) {
                localStorage.setItem("isLogin", true);
                localStorage.setItem("role", user.role);
                return true;
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