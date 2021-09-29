(function (angular) {
    "use strict";

    function constructor($mdDialog, locals, $mdMedia) {
        var vm = this;
        vm.confirm = confirm;
        vm.$mdMedia = $mdMedia;
        vm.localizationObj = locals.localizationObj;

        vm.checkConfirm = function () {
            if (vm.confirm) {
                $mdDialog.hide(vm.confirm);
            }
        }
    }

    constructor.$inject = ['$mdDialog', "locals", "$mdMedia"];
    angular.module("slpc.switch-fr-fas-charges-1st").controller('slpcSwitchFrFasCharges1stInfoModalController', constructor);
})(window.angular);