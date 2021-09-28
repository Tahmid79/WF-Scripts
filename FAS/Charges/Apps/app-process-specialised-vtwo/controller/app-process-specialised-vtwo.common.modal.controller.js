(function (angular) {
    "use strict";

    function constructor($mdDialog, locals, $mdMedia) {
        var vm = this;
        vm.confirm = confirm;
        vm.$mdMedia = $mdMedia;
        vm.localizationObj = locals.localizationObj;
        vm.CommonMessage = locals.messageKey;

        vm.close = function(){
            $mdDialog.hide();
        }
    }

    constructor.$inject = ['$mdDialog', "locals", "$mdMedia"];
    angular.module("slpc.app-process-specialised-vtwo").controller('slpcAppProcessSpecialisedCommonModalVtwoController', constructor);
})(window.angular);