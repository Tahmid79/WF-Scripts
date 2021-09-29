(function (angular) {
    "use strict";

    function constructor($mdDialog, $location, locals, $mdMedia) {
        var vm = this;
        vm.confirm = confirm;
        vm.$mdMedia = $mdMedia;
        vm.localizationObj = locals.localizationObj;
        vm.market = $location.search().market;

        vm.checkConfirm = function () {
            if (vm.confirm) {
                $mdDialog.hide(vm.confirm);
            }
        }
    }

    constructor.$inject = ['$mdDialog', "$location", "locals", "$mdMedia"];
    angular.module("slpc.switch-fr-fas-charges-1st").controller('slpcSwitchFrFasCharges1stAdditionalNotesModalController', constructor);
})(window.angular);