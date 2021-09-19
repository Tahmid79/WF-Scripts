(function(angular) {
    'use strict';

    var module = angular.module('slpc.switch-fr-charges-4th', ['pascalprecht.translate']);

    function config() {}

    config.$inject = [];
    module.config(config);

    function run($translate, $translatePartialLoader) {
        //$translatePartialLoader.addPart('app/workflows/slpc/switch-fr-charges-4th/i18n');
    }
    run.$inject = ['$translate', '$translatePartialLoader'];
    module.run(run);
})(window.angular);