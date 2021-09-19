(function (angular) {
    "use strict";

    function constructor($mdDialog, locals, $mdMedia) {
        var vm = this;
        vm.confirm = confirm;
        vm.$mdMedia = $mdMedia;
        vm.localizationObj = locals.localizationObj;
        vm.market = locals.market;

        vm.checkConfirm = function() {
            if (vm.confirm) {
                $mdDialog.hide(vm.confirm);
            }
        }
    }

    constructor.$inject = ['$mdDialog', "locals", "$mdMedia"];
    angular.module("slpc.app-process-charges-v2").controller('slpcAppProcessChargesInfo5ModalController', constructor);
})(window.angular);