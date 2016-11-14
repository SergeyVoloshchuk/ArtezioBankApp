(function () {
    'use strict';


    angular
        .module('ui.router')
        .config(RoutingConfig);

    function RoutingConfig($stateProvider) {
        var login = {
            name: 'login',
            url: '/login',
            abstaract: true,
            views: {
                login: {
                    template: '<ui-view>',
                }
            }
        }
        var stateContent = {
            name: 'content',
            url: '/content',
            abstaract: true,
            views: {
                '': {
                    template: '<ui-view>'
                }
            }
        }
        var state = {
            name: 'content.hello',
            url: '/hello',
            component: 'hello',
            resolve: {
                person: function (dataService) {
                    return dataService.getData("../js/json/first.json");
                }
            }

        }
        var loginState = {
            name: 'login.logging',
            url: '/enterLogin',
            component: 'login'
                // resolve: {
                // person: function (dataService) {
                //    return dataService.getData("../js/json/first.json");
                //  }
                //}
        }
        $stateProvider.state(login);
        $stateProvider.state(loginState);
        $stateProvider.state(stateContent);
        $stateProvider.state(state);
    };

})();
