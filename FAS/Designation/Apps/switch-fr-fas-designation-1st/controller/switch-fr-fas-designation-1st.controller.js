(function (angular, appSuite) {
    "use strict";

    function constructor($scope, $http, $mdMedia, $location, SLPCConfig, shellInfrastructure, workflowService, WorkflowConfig, $state, policyformService, $mdDialog, shellView, slpcConfigWorkflowService) {

        var vm = this;
        shellView.appendViewHelper(vm);
        vm.formData = {};
        var initValueOb = {};
        vm.currency = [];
        vm.$mdMedia = $mdMedia;
        vm.ActivityId = $location.search().ActivityId;
        vm.ActivityIdNo = vm.ActivityId.search(/\d+/) > 0 ? vm.ActivityId[vm.ActivityId.length - 1] : "";
        vm.market = $location.search().market;

        var entityObj = {
            activityId: "AppProcessInvestmentOfContractVTwo",
            workflowInstanceId: $location.search().workflowInstanceId,
            itemId: null,
            entityName: null,
            fields: [
                "FirstFASPercentValue",
                "FirstFASAmountValue",
                "SecondFASPercentValue",
                "SecondFASAmountValue",
                "ThirdFASPercentValue",
                "ThirdFASAmountValue",
                "FourthFASPercentValue",
                "FourthFASAmountValue"
            ]
        };

        function executeWorkflowForm(data) {
            if (data) {
                vm.formData = JSON.parse(data.RequestPayload);
                    delete vm.formData.slpcworkflowId;
                onInitFormData();
                //vm.formData = _.merge(initValueOb,JSON.parse(data.RequestPayload));
            } else {
                $scope.appProcessAllocationFas.$submitted = true;
                if (!$scope.appProcessAllocationFas.$invalid) {
                    vm.formData.RequestPayload = angular.copy(vm.formData);
                    vm.formData.RequestPayload.slpcworkflowId= $state.params.slpcworkflowId;
                    workflowService.eventBroadcast(WorkflowConfig.registerCallBackFromChild, _.clone(vm.formData));
                }
            }
        }

        function getCommonData(getData) {
            getData.commonData().then(function (responseCommonData) {
                if (responseCommonData) {

                }
            });
            getData.processStatus().then(function (responseStatus) {
                vm.isFormReadonly = responseStatus;
            });
            getData.commonLanguage().then(function (responseLanguage) {
                vm.localizationObj = responseLanguage.data;
                vm.ohetrCountriesValue = vm.localizationObj.SWITCH_FR_FAS_DESIGNATION_1ST.COUNTRY_LIST.OTHER;
                findFASNumber();
            });
            var workflowInstanceId = $location.search().workflowInstanceId;
            slpcConfigWorkflowService.getEntityDataByWorkflowInstanceId(workflowInstanceId, entityObj.fields).then(function (responseFieldsData) {
                var appProcessInvestmentOfContract = responseFieldsData;
                if (vm.ActivityIdNo === '') {
                    vm.FASFundPercentValue = appProcessInvestmentOfContract.FirstFASPercentValue;
                    vm.FASFundAmountValue = appProcessInvestmentOfContract.FirstFASAmountValue;
                }
                else if (vm.ActivityId === 'AppProcessAllocationFAS2VTwo') {
                    vm.FASFundPercentValue = appProcessInvestmentOfContract.SecondFASPercentValue;
                    vm.FASFundAmountValue = appProcessInvestmentOfContract.SecondFASAmountValue;
                }
                else if (vm.ActivityId === 'AppProcessAllocationFAS3VTwo') {
                    vm.FASFundPercentValue = appProcessInvestmentOfContract.ThirdFASPercentValue;
                    vm.FASFundAmountValue = appProcessInvestmentOfContract.ThirdFASAmountValue;
                }
                else if (vm.ActivityId === 'AppProcessAllocationFAS4VTwo') {
                    vm.FASFundPercentValue = appProcessInvestmentOfContract.FourthFASPercentValue;
                    vm.FASFundAmountValue = appProcessInvestmentOfContract.FourthFASAmountValue;
                }
            });
        }

        function findFASNumber() {
            if (vm.ActivityIdNo === "2") vm.fas = vm.localizationObj.SWITCH_FR_FAS_DESIGNATION_1ST.APP_PROCESS_ALLOCATION.FAS_2;
            else if (vm.ActivityIdNo === "3") vm.fas = vm.localizationObj.SWITCH_FR_FAS_DESIGNATION_1ST.APP_PROCESS_ALLOCATION.FAS_3;
            else if (vm.ActivityIdNo === "4") vm.fas = vm.localizationObj.SWITCH_FR_FAS_DESIGNATION_1ST.APP_PROCESS_ALLOCATION.FAS_4;
        }

        function getOtherCountryNationalityList() {
            policyformService.getCountryList(true, vm.countriesOfResidence).then(function (responseCountries) {
                vm.countriesOfResidence = responseCountries.otherCountry;
                vm.otherCountriesOfResidence = _.map(responseCountries.responseCountryList, "Name");
                vm.otherCountriesOfResidence = vm.otherCountriesOfResidence.filter(function (el) {
                    return !vm.countriesOfResidence.includes(el);
                });
            });
        }

        function onInitFormData() {
            vm.formData.PAOneOrMoreSpecialisedInsuranceFirstnameNotApplicable = vm.formData.PAOneOrMoreSpecialisedInsuranceFirstnameNotApplicable || false;
            vm.formData.PAOneOrMoreSpecialisedInsuranceMobileNotApplicable = vm.formData.PAOneOrMoreSpecialisedInsuranceMobileNotApplicable || false;
            vm.formData.PAOneOrMoreSpecialisedInsuranceEmailNotApplicable = vm.formData.PAOneOrMoreSpecialisedInsuranceEmailNotApplicable || false;
            vm.formData.PAOneOrMoreSpecialisedInsuranceFaxNotApplicable = vm.formData.PAOneOrMoreSpecialisedInsuranceFaxNotApplicable || false;
            vm.formData.IsFasTelephoneAvailable = vm.formData.IsFasTelephoneAvailable || false;
        }

        vm.$onInit = function () {
            onInitFormData();
            workflowService.eventRegister(WorkflowConfig.eventForDataTransition, getCommonData, 'switch-fr-fas-designation-1st');
            workflowService.eventRegister(WorkflowConfig.registerWorkflowExecuteCommand, executeWorkflowForm, 'switch-fr-fas-designation-1st');

            vm.countriesOfResidence = SLPCConfig.AppProcessAllocationCountryOfResidenceCustodianBank;
            getOtherCountryNationalityList();
        };
    }

    constructor.$inject = ["$scope", "$http", "$mdMedia", "$location", "SLPCConfig", "shellInfrastructure", "workflowService", "WorkflowConfig", "$state", "policyformService", "$mdDialog", "shellView", "slpcConfigWorkflowService"];
    angular.module("slpc.switch-fr-fas-designation-1st").controller('slpcSwitchFrFASDesignation1stController', constructor);
})(window.angular, window.appSuite);