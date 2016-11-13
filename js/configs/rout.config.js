(function () {
    'use strict';


    angular
        .module('ui.router')
        .config(RoutingConfig);

    function RoutingConfig($stateProvider) {

        var state = {
            name: 'hello',
            url: '/hello',
            component: 'hello',
            resolve: {
                person: function (dataService) {
                    console.log(dataService.getData("../js/json/first.json").data);

                    return dataService.getData("../js/json/first.json");
                }
            }

        }

        $stateProvider.state(state);
    };

})();
