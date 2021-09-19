(function (angular) {
    "use strict";

    function constructor($mdDialog, locals, $mdMedia) {
        var vm = this;
        vm.confirm = confirm;
        vm.$mdMedia = $mdMedia;
        vm.localizationObj = locals.localizationObj;

        vm.close = function(){
            $mdDialog.hide(true);
        }   
    }

    constructor.$inject = ['$mdDialog', "locals", "$mdMedia"];
    angular.module("slpc.app-process-charges-v2").controller('slpcAppProcessChargesInfoModalController', constructor);
})(window.angular);