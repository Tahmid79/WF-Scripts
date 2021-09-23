(function(angular) {
    'use strict';

    var module = angular.module('slpc.app-process-allocation-fas-vtwo', ['pascalprecht.translate']);

    function config() {}

    config.$inject = [];
    module.config(config);

    function run($translate, $translatePartialLoader) {
        //$translatePartialLoader.addPart('app/workflows/slpc/app-process-allocation-fas-vtwo/i18n');
    }
    run.$inject = ['$translate', '$translatePartialLoader'];
    module.run(run);
})(window.angular);