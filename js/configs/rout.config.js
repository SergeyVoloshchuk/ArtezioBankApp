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
                service: function(dataService) {
                    return dataService.getData("../js/json/services.json");
                },
                period: function(dataService) {
                    return dataService.getData("../js/json/period.json");
                },
                 code: function(dataService) {
                    return dataService.getData("../js/json/codesCash.json");
                },
                method: function(dataService) {
                    return dataService.getData("../js/json/method.json");
                },
                  bank: function(dataService) {
                    return dataService.getData("../js/json/bank.json");
                }
            }

        }
        var bookTypeState = {
            name: 'data.booktype',
            url: '/book/1',
            component: 'bookTypes',
            resolve: {
                type: function(dataService) {
                    return dataService.getData("../js/json/types.json");
                }
            }

        }
        var bookServiceState = {
            name: 'data.bookservice',
            url: '/book/2',
            component: 'bookService',
            resolve: {

                service: function(dataService) {
                    return dataService.getData("../js/json/services.json");
                }
            }
        }

        var bookPeriodState = {
            name: 'data.bookperiod',
            url: '/book/3',
            component: 'bookPeriod',
            resolve: {

                period: function(dataService) {
                    return dataService.getData("../js/json/period.json");
                }
            }
        }

        var bookCashState = {
            name: 'data.bookcash',
            url: '/book/4',
            component: 'bookCash',
            resolve: {

                code: function(dataService) {
                    return dataService.getData("../js/json/codesCash.json");
                }
            }
        }

        var mainState = {
            name: 'data.main',
            url: '/',
            templateUrl: "../templates/main.template.html"
        }
        var bookMethodState = {
            name: 'data.bookmethod',
            url: '/book/5',
            component: 'bookMethod',
            resolve: {

                method: function(dataService) {
                    return dataService.getData("../js/json/method.json");
                }
            }
        }

        var bookBankState = {
            name: 'data.bookbank',
            url: '/book/6',
            component: 'bookBank',
            resolve: {

                bank: function(dataService) {
                    return dataService.getData("../js/json/bank.json");
                }
            }
        }



        $stateProvider.state(stateContent);
        $stateProvider.state(mainState);
        $stateProvider.state(appState);
        $stateProvider.state(bookTypeState);
        $stateProvider.state(bookServiceState);
        $stateProvider.state(bookPeriodState);
        $stateProvider.state(bookCashState);
        $stateProvider.state(bookMethodState);
        $stateProvider.state(bookBankState);
    };

})();