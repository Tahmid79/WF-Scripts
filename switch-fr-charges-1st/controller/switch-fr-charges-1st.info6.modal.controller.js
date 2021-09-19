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
    angular.module("slpc.switch-fr-charges-1st").controller('slpcSwitchCharges1stInfo6ModalController', constructor);
})(window.angular);