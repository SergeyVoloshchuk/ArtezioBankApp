(function () {
    'use strict';
    angular.module('app.components').component('hello', {
        template: '<h3>{{$ctrl.greeting}} solar sytem!</h3> <br> {{$ctrl.person.name}}',
        bindings: {
            person: '<'
        },

        controller: function () {
            console.log("i work!");
            var vm = this;
            vm.greeting = 'hello';
            vm.person.name = "Такие вот дела...";

        }
    })
})();
