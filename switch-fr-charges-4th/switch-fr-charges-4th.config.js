(function(angular) {
    'use strict';

    var module = angular.module('slpc.app-process-charges-v2', ['pascalprecht.translate']);

    function config() {}

    config.$inject = [];
    module.config(config);

    function run($translate, $translatePartialLoader) {
        //$translatePartialLoader.addPart('app/workflows/slpc/app-process-charges-v2/i18n');
    }
    run.$inject = ['$translate', '$translatePartialLoader'];
    module.run(run);
})(window.angular);