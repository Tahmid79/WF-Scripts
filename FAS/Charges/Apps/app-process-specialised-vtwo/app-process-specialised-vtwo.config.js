(function (angular) { 
    'use strict';

    var module = angular.module('slpc.app-process-specialised-vtwo', ['pascalprecht.translate']);

    function config() {}

    config.$inject = [];
    module.config(config);
    
    function run($translate, $translatePartialLoader) {
    }
    run.$inject = ['$translate','$translatePartialLoader'];
    module.run(run);
})(window.angular);
