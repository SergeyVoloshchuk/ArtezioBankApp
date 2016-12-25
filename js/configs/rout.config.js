(function() {
    'use strict';


    angular
        .module('ui.router')
        .config(RoutingConfig);

    function RoutingConfig($stateProvider) {
        var stateContent = {
            name: 'data',
            url: '',
            abstaract: true,
            views: {
                '': {
                    template: '<ui-view>'
                }
            }
        }
        var appState = {
                name: 'data.app',
                url: '/app',
                component: 'app',
                resolve: {
                    types: function(dataService) {
                        return dataService.getData("../js/json/types.json");
                    },
                    services: function(dataService) {
                        return dataService.getData("../js/json/services.json");
                    }
                }

            }
              var bookTypeState = {
                name: 'data.book',
                url: '/book/1',
                component: 'app'
               /* resolve: {
                    types: function(dataService) {
                        return dataService.getData("../js/json/types.json");
                    },
                    services: function(dataService) {
                        return dataService.getData("../js/json/services.json");
                    }
                }
*/
            }
              var bookServiceState = {
                name: 'data.book',
                url: '/book/2',
                component: 'app',
             /*   resolve: {
                    types: function(dataService) {
                        return dataService.getData("../js/json/types.json");
                    },
                    services: function(dataService) {
                        return dataService.getData("../js/json/services.json");
                    }
                }
*/
            }



        $stateProvider.state(stateContent);
        $stateProvider.state(appState);
        $stateProvider.state(bookTypeState);
        $stateProvider.state(bookServiceState);
    };

})();