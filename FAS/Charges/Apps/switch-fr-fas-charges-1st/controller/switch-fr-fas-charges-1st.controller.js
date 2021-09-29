(function (angular, appSuite) {
    "use strict";


    function constructor($q, $scope, $http, $mdMedia, shellInfrastructure, workflowService, WorkflowConfig, $state, policyformService, $location, SLPCConfig, $mdDialog, slpcSlpcConfigUtilService, slpcConfigWorkflowService) {

        var vm = this;
        var language = $location.search().language;
        vm.formData = {};
        vm.$mdMedia = $mdMedia;
        vm.headerTitle = SLPCConfig.AppProcessActivityToPolicyholderMap[$location.search().ActivityId];
        vm.market = $location.search().market;
        vm.ActivityId = $location.search().ActivityId;
        var noProfileMsg = "No Profile";
        vm.IsFASFirstAdditionalInfoExpanded = true;
        vm.formData.IsFASFirstAdditionalInfoExpanded = true;
        // var entityObj = {
        //     activityId: "AppProcessPolicyHolderDetailsVOne",
        //     workflowInstanceId: $location.search().workflowInstanceId,
        //     itemId: null,
        //     entityName: null,
        //     fields: ["PHRSuitabilitySection", "NumberOfFAS"]
        // };

        var entityObj = {
            
            fields: [
                "PHRSuitabilitySection",
                 "NumberOfFAS"
            ]
        };

        vm.checkboxFlag = null;
        vm.additionalInfos = {
            "First": ["FASFirstIsinInclude", "FASFirstIsinExclude", "FASFirstISINNumber", "FASFirstISINName", "FASFirstISINPercentage", "IsFASFirstAdditionalInfoExpanded"],
            "Second": ["FASFirstIsinInclude2", "FASFirstIsinExclude2", "FASFirstISINNumber2", "FASFirstISINName2", "FASFirstISINPercentage2", "IsFASFirstAdditionalInfoExpanded2"],
            "Third": ["FASFirstIsinInclude3", "FASFirstIsinExclude3", "FASFirstISINNumber3", "FASFirstISINName3", "FASFirstISINPercentage3", "IsFASFirstAdditionalInfoExpanded3"],
            "Fourth": ["FASFirstIsinInclude4", "FASFirstIsinExclude4", "FASFirstISINNumber4", "FASFirstISINName4", "FASFirstISINPercentage4", "IsFASFirstAdditionalInfoExpanded4"],
            "Fifth": ["FASFirstIsinInclude5", "FASFirstIsinExclude5", "FASFirstISINNumber5", "FASFirstISINName5", "FASFirstISINPercentage5", "IsFASFirstAdditionalInfoExpanded5"]
        };

        var modelTree = {
            "SpecialisedIsFillingFee#value=true": {
                "PAOneOrMoreSpecialisedTransactionFee": NaN,
            },
            "SpecialisedSpecificInstruction#value=true": {
                "PAOneOrMoreSpecialisedInsuranceSpecificInstruction": ""
            },
            "IsFixedIncomeBondSpecialised#value=true": {
                "PCBondMinPercentageSpecialised": NaN,
                "PCBondMaxPercentageSpecialised": NaN
            },
            "IsEquitiesEquitiesSpecialised#value=true": {
                "PCEquitiesMinPercentageSpecialised": NaN,
                "PCEquitiesMaxPercentageSpecialised": NaN
            },
            "IsInvestmenetFundBondsSpecialised#value=true": {
                "PCBondsFundMinPercentageSpecialised": NaN,
                "PCBondsFundMaxPercentageSpecialised": NaN
            },
            "IsInvestmenetFundEquitiesSpecialised#value=true": {
                "PCEquityFundMinPercentageSpecialised": NaN,
                "PCEquityFundMaxPercentageSpecialised": NaN
            },
            "IsInvestmenetFundMoneyMarketSpecialised#value=true": {
                "PCMoneyMarketFundMinPercentageSpecialised": NaN,
                "PCMoneyMarketFundMaxPercentageSpecialised": NaN
            },
            "IsAlternativeHedgeFundsSpecialised#value=true": {
                "PCHedgeFundMinPercentageSpecialised": NaN,
                "PCHedgeFundMaxPercentageSpecialised": NaN
            },
            "IsAlternativeCommoditySpecialised#value=true": {
                "PCCommodityFundMinPercentageSpecialised": NaN,
                "PCCommodityFundMaxPercentageSpecialised": NaN
            },
            "IsAlternativePrivateSpecialised#value=true": {
                "PCPrivateEquityFundMinPercentageSpecialised": NaN,
                "PCPrivateEquityFundMaxPercentageSpecialised": NaN
            },
            "IsAlternativeRealEstateSpecialised#value=true": {
                "PCRealStateFundMinPercentageSpecialised": NaN,
                "PCRealStateFundMaxPercentageSpecialised": NaN
            },
            "IsOtherAssetInfrastructureSpecialised#value=true": {
                "PCCashMinPercentageSpecialised": NaN,
                "PCCashMaxPercentageSpecialised": NaN
            }
        }

        vm.addMoreAdditionalInfo = function () {
            if (vm.IsFASFirstAdditionalInfoExpanded) {
                if (vm.IsFASFirstAdditionalInfoExpanded2) {
                    if (vm.IsFASFirstAdditionalInfoExpanded3) {
                        if (vm.IsFASFirstAdditionalInfoExpanded4) {
                            if (vm.IsFASFirstAdditionalInfoExpanded5) { } else {
                                vm.formData.IsFASFirstAdditionalInfoExpanded5 = true;
                                vm.IsFASFirstAdditionalInfoExpanded5 = true;
                            }
                        } else {
                            vm.formData.IsFASFirstAdditionalInfoExpanded4 = true;
                            vm.IsFASFirstAdditionalInfoExpanded4 = true;
                        }
                    }
                    else {
                        vm.formData.IsFASFirstAdditionalInfoExpanded3 = true;
                        vm.IsFASFirstAdditionalInfoExpanded3 = true;
                    }
                } else {
                    vm.formData.IsFASFirstAdditionalInfoExpanded2 = true;
                    vm.IsFASFirstAdditionalInfoExpanded2 = true;
                }
            }
        }


        vm.removeAdditionalInfo = function () {
            if (vm.IsFASFirstAdditionalInfoExpanded5) {
                vm.IsFASFirstAdditionalInfoExpanded5 = false;
                vm.formData.FASFirstIsinInclude5 = false;
                vm.formData.FASFirstIsinExclude5 = false;
                vm.formData.FASFirstISINNumber5 = "";
                vm.formData.FASFirstISINName5 = "";
                vm.formData.FASFirstISINPercentage5 = "";
                vm.formData.IsFASFirstAdditionalInfoExpanded5 = false;
            } else if (vm.IsFASFirstAdditionalInfoExpanded4) {
                vm.IsFASFirstAdditionalInfoExpanded4 = false;
                vm.formData.FASFirstIsinInclude4 = false;
                vm.formData.FASFirstIsinExclude4 = false;
                vm.formData.FASFirstISINNumber4 = "";
                vm.formData.FASFirstISINName4 = "";
                vm.formData.FASFirstISINPercentage4 = "";
                vm.formData.IsFASFirstAdditionalInfoExpanded4 = false;
            } else if (vm.IsFASFirstAdditionalInfoExpanded3) {
                vm.IsFASFirstAdditionalInfoExpanded3 = false;
                vm.formData.FASFirstIsinInclude3 = false;
                vm.formData.FASFirstIsinExclude3 = false;
                vm.formData.FASFirstISINNumber3 = "";
                vm.formData.FASFirstISINName3 = "";
                vm.formData.FASFirstISINPercentage3 = "";
                vm.formData.IsFASFirstAdditionalInfoExpanded3 = false;
            } else if (vm.IsFASFirstAdditionalInfoExpanded2) {
                vm.IsFASFirstAdditionalInfoExpanded2 = false;
                vm.formData.FASFirstIsinInclude2 = false;
                vm.formData.FASFirstIsinExclude2 = false;
                vm.formData.FASFirstISINNumber2 = "";
                vm.formData.FASFirstISINName2 = "";
                vm.formData.FASFirstISINPercentage2 = "";
                vm.formData.IsFASFirstAdditionalInfoExpanded2 = false;
            }
        }

        vm.revertncludeExclude = function (value) {
            if (value === 'FASFirstIsinExclude') {
                vm.formData.FASFirstIsinInclude = false;
            }
            if (value === 'FASFirstIsinInclude') {
                vm.formData.FASFirstIsinExclude = false;
            }

            if (value === 'FASFirstIsinExclude2') {
                vm.formData.FASFirstIsinInclude2 = false;
            }
            if (value === 'FASFirstIsinInclude2') {
                vm.formData.FASFirstIsinExclude2 = false;
            }

            if (value === 'FASFirstIsinExclude3') {
                vm.formData.FASFirstIsinInclude3 = false;
            }
            if (value === 'FASFirstIsinInclude3') {
                vm.formData.FASFirstIsinExclude3 = false;
            }
            if (value === 'FASFirstIsinExclude4') {
                vm.formData.FASFirstIsinInclude4 = false;
            }
            if (value === 'FASFirstIsinInclude4') {
                vm.formData.FASFirstIsinExclude4 = false;
            }
            if (value === 'FASFirstIsinExclude5') {
                vm.formData.FASFirstIsinInclude5 = false;
            }
            if (value === 'FASFirstIsinInclude5') {
                vm.formData.FASFirstIsinExclude5 = false;
            }
        }

        vm.showInfo12Modal = function ($event) {
            showInfo12Modal($event);
        }

        var showInfo12Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/app-process-specialised-vtwo/view/app-process-specialised-vtwo.info12.modal.view.html",
                targetEvent: $event,
                controller: "slpcAppProcessSpecialisedInfo12ModalVtwoController",
                controllerAs: "vm",
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    localizationObj: vm.localizationObj
                }
            }).then(function (answer) {

            }, function () {
            });
        }


        function onInitFormData() {
            vm.formData.IsFASFirstAdditionalInfoExpanded = vm.formData.IsFASFirstAdditionalInfoExpanded || false;
            vm.formData.IsFASFirstAdditionalInfoExpanded2 = vm.formData.IsFASFirstAdditionalInfoExpanded2 || false;
            vm.formData.IsFASFirstAdditionalInfoExpanded3 = vm.formData.IsFASFirstAdditionalInfoExpanded3 || false;
            vm.formData.IsFASFirstAdditionalInfoExpanded4 = vm.formData.IsFASFirstAdditionalInfoExpanded4 || false;
            vm.formData.IsFASFirstAdditionalInfoExpanded5 = vm.formData.IsFASFirstAdditionalInfoExpanded5 || false;

            vm.formData.FASFirstIsinInclude = vm.formData.FASFirstIsinInclude || false;
            vm.formData.FASFirstIsinInclude2 = vm.formData.FASFirstIsinInclude2 || false;
            vm.formData.FASFirstIsinInclude3 = vm.formData.FASFirstIsinInclude3 || false;
            vm.formData.FASFirstIsinInclude4 = vm.formData.FASFirstIsinInclude4 || false;
            vm.formData.FASFirstIsinInclude5 = vm.formData.FASFirstIsinInclude5 || false;

            vm.formData.FASFirstIsinExclude = vm.formData.FASFirstIsinExclude || false;
            vm.formData.FASFirstIsinExclude2 = vm.formData.FASFirstIsinExclude2 || false;
            vm.formData.FASFirstIsinExclude3 = vm.formData.FASFirstIsinExclude3 || false;
            vm.formData.FASFirstIsinExclude4 = vm.formData.FASFirstIsinExclude4 || false;
            vm.formData.FASFirstIsinExclude5 = vm.formData.FASFirstIsinExclude5 || false;

            vm.IsFASFirstAdditionalInfoExpanded = vm.formData.IsFASFirstAdditionalInfoExpanded || false;
            vm.IsFASFirstAdditionalInfoExpanded2 = vm.formData.IsFASFirstAdditionalInfoExpanded2 || false;
            vm.IsFASFirstAdditionalInfoExpanded3 = vm.formData.IsFASFirstAdditionalInfoExpanded3 || false;
            vm.IsFASFirstAdditionalInfoExpanded4 = vm.formData.IsFASFirstAdditionalInfoExpanded4 || false;
            vm.IsFASFirstAdditionalInfoExpanded5 = vm.formData.IsFASFirstAdditionalInfoExpanded5 || false;

        }

        function executeWorkflowForm(data) {
            if (data) {
                vm.formData = JSON.parse(data.RequestPayload);
                    delete vm.formData.slpcworkflowId;
                onInitFormData();
                if (vm.formData.SpecialisedSpecificInstruction) {
                    vm.SpecialisedSpecificInstruction = 'YES';
                } else {
                    vm.SpecialisedSpecificInstruction = 'NO';
                }
            } else {
                $scope.appProcessSpecialised.$submitted = true;
                if (!$scope.appProcessSpecialised.$invalid && vm.checkboxMandatory()) {
                    if (vm.SpecialisedSpecificInstruction === 'YES') {
                        vm.formData.SpecialisedSpecificInstruction = true;
                    }
                    else if (vm.SpecialisedSpecificInstruction === 'NO') {
                        vm.formData.SpecialisedSpecificInstruction = false;
                    }
                    slpcSlpcConfigUtilService.cleanupModel(vm.formData, modelTree);
                    if (((vm.ActivityId === 'AppProcessSpecialised4VOne' || vm.ActivityId === 'AppProcessSpecialised4VTwo') || ((vm.ActivityId === 'AppProcessSpecialised3VOne' || vm.ActivityId === 'AppProcessSpecialised3VTwo') && vm.numberOfFAS == 3) || ((vm.ActivityId === 'AppProcessSpecialised2VOne' || vm.ActivityId === 'AppProcessSpecialised2VTwo') && vm.numberOfFAS == 2) || ((vm.ActivityId === 'AppProcessSpecialisedVOne' || vm.ActivityId === 'AppProcessSpecialisedVTwo') && vm.numberOfFAS == 1)) && !vm.isFormReadonly) {
                        showAdditionalNotes().then(function () {
                            vm.formData.RequestPayload = angular.copy(vm.formData);
                            vm.formData.RequestPayload.slpcworkflowId= $state.params.slpcworkflowId;
                            workflowService.eventBroadcast(WorkflowConfig.registerCallBackFromChild, _.clone(vm.formData));
                        });
                    }
                    else {
                        vm.formData.RequestPayload = angular.copy(vm.formData);
                        vm.formData.RequestPayload.slpcworkflowId= $state.params.slpcworkflowId;
                        workflowService.eventBroadcast(WorkflowConfig.registerCallBackFromChild, _.clone(vm.formData));
                    }
                }
            }
        }

        var showCommonModal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/app-process-specialised-vtwo/view/app-process-specialised-vtwo.common.modal.view.html",
                targetEvent: $event,
                controller: "slpcAppProcessSpecialisedCommonModalVtwoController",
                controllerAs: "vm",
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    localizationObj: vm.localizationObj,
                    messageKey: $event
                }
            })
        }

        function showAdditionalNotes() {
            return $q(function (resolve, reject) {
                $mdDialog.show({
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/app-process-specialised-vtwo/view/app-process-specialised-vtwo.additional-notes.modal.view.html",
                    controller: "slpcAppProcessSpecialisedAdditionalNotesModalVtwoController",
                    controllerAs: "vm",
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    locals: {
                        localizationObj: vm.localizationObj
                    }
                }).then(function (answer) {
                    vm.formData.PCadditional = answer;
                    resolve();
                }, function () {
                    reject();
                });
            });
        }

        function showInvestorInfo() {
            return $q(function (resolve, reject) {
                $mdDialog.show({
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/app-process-specialised-vtwo/view/app-process-specialised-vtwo.investor.modal.view.html",
                    controller: "slpcAppProcessSpecialisedInvestorModalVtwoController",
                    controllerAs: "vm",
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    locals: {
                        localizationObj: vm.localizationObj
                    }
                }).then(function (answer) {
                    resolve();
                }, function () {
                    reject();
                });
            });
        }

        var showInfoModal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/app-process-specialised-vtwo/view/app-process-specialised-vtwo.info.modal.view.html",
                targetEvent: $event,
                controller: "slpcAppProcessSpecialisedInfoModalVtwoController",
                controllerAs: "vm",
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    localizationObj: vm.localizationObj
                }
            }).then(function (answer) {
                vm.formData.PCThePolicyholder = true;
            }, function () {
            });
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
                vm.ohetrCountriesValue = vm.localizationObj.APP_PROCESS_SPECIALISED_VTWO.COUNTRY_LIST.OTHER;
            });

            //For Get Entity Data

            // getData.activityData(entityObj.activityId, entityObj.workflowInstanceId).then(function (response) {
            //     if (response.DataContext) {
            //         var contextValue = response.DataContext[0].Value;
            //         entityObj.itemId = contextValue.ItemId;
            //         entityObj.entityName = contextValue.EntityName;

            //         getData.entityData(entityObj.itemId, entityObj.fields, entityObj.entityName).then(function (responseData) {
            //             vm.numberOfFAS = responseData.NumberOfFAS;
            //             vm.ActivityIdNo = _.toNumber(vm.ActivityId[vm.ActivityId.length - 1])  || 1;
            //             if (responseData[entityObj.fields[0]]) {
            //                 vm.riskAsInvestor = responseData[entityObj.fields[0]].replace('_', ' ');
            //             } else {
            //                 vm.riskAsInvestor = noProfileMsg;
            //             }
            //         });
            //     } else {
            //         vm.riskAsInvestor = noProfileMsg;
            //     }
            // });


            var workflowInstanceId = $location.search().workflowInstanceId;
            slpcConfigWorkflowService.getEntityDataByWorkflowInstanceId(workflowInstanceId, entityObj.fields).then(function (responseFieldsData) {
              
                if(responseFieldsData){

                    if (responseFieldsData.DataContext) {
                        var contextValue = responseFieldsData.DataContext[0].Value;
                        entityObj.itemId = contextValue.ItemId;
                        entityObj.entityName = contextValue.EntityName;
    
                        
                            vm.numberOfFAS = responseFieldsData.NumberOfFAS;
                            vm.ActivityIdNo = _.toNumber(vm.ActivityId[vm.ActivityId.length - 1])  || 1;
                            if (responseFieldsData[entityObj.fields[0]]) {
                                vm.riskAsInvestor = responseFieldsData[entityObj.fields[0]].replace('_', ' ');
                            } else {
                                vm.riskAsInvestor = noProfileMsg;
                            }
                        
                    } else {
                        vm.riskAsInvestor = noProfileMsg;
                    }
                        
                }
                
                
            });

            vm.changeIncludeExclude = function (value) {
                if (value === 'FASFirstIsinExclude') {
                    vm.formData.FASFirstIsinInclude = false;
                }
                if (value === 'FASFirstIsinInclude') {
                    vm.formData.FASFirstIsinExclude = false;
                }

                if (value === 'FASFirstIsinExclude2') {
                    vm.formData.FASFirstIsinInclude2 = false;
                }
                if (value === 'FASFirstIsinInclude2') {
                    vm.formData.FASFirstIsinExclude2 = false;
                }

                if (value === 'FASFirstIsinExclude3') {
                    vm.formData.FASFirstIsinInclude3 = false;
                }
                if (value === 'FASFirstIsinInclude3') {
                    vm.formData.FASFirstIsinExclude3 = false;
                }
                if (value === 'FASFirstIsinExclude4') {
                    vm.formData.FASFirstIsinInclude4 = false;
                }
                if (value === 'FASFirstIsinInclude4') {
                    vm.formData.FASFirstIsinExclude4 = false;
                }
                if (value === 'FASFirstIsinExclude5') {
                    vm.formData.FASFirstIsinInclude5 = false;
                }
                if (value === 'FASFirstIsinInclude5') {
                    vm.formData.FASFirstIsinExclude5 = false;
                }
                
            }
        }

        function getCountryList() {
            policyformService.getCountryList(language).then(function (responseCountries) {
                vm.countries = _.map(responseCountries.responseCountryList, "Name");
            });
        }
        function getOtherCountryNationalityList() {
            policyformService.getCountryList(language, vm.countriesOfResidence, vm.nationalitiesWithLang).then(function (responseCountries) {
                vm.countriesOfResidence = responseCountries.otherCountry;
                vm.otherCountriesOfResidence = _.map(responseCountries.responseCountryList, "Name");
                vm.otherCountriesOfResidence = vm.otherCountriesOfResidence.filter(function (el) {
                    return !vm.countriesOfResidence.includes(el);
                });
                vm.otherNationalities = _.map(responseCountries.responseCountryList, "Name");
                vm.otherNationalities = vm.otherNationalities.filter(function (el) {
                    return !_.map(SLPCConfig.AppProcessNationality, "Name").includes(el);
                });
            });
        }

        function getNationalities() {
            vm.nationalitiesWithLang = _.transform(SLPCConfig.AppProcessNationality, function (result, item) {
                result.push(
                    {
                        Name: item.Name,
                        LangKey: item.LangKey
                    }
                );
            }, []);
        }

        function checkMinMax(assetCategory) {
            vm['min' + assetCategory] = vm.formData['PC' + assetCategory + 'MinPercentageSpecialised'] ? vm.formData['PC' + assetCategory + 'MinPercentageSpecialised'] : 0;
            vm['max' + assetCategory] = vm.formData['PC' + assetCategory + 'MaxPercentageSpecialised'] ? vm.formData['PC' + assetCategory + 'MaxPercentageSpecialised'] : 100;
        }

        // vm.checkboxMandatory = function () {
        //     return vm.formData.IsFixedIncomeBondSpecialised || vm.formData.IsEquitiesEquitiesSpecialised || vm.formData.IsInvestmenetFundBondsSpecialised || vm.formData.IsInvestmenetFundEquitiesSpecialised || vm.formData.IsInvestmenetFundMoneyMarketSpecialised || vm.formData.IsAlternativeHedgeFundsSpecialised || vm.formData.IsAlternativeCommoditySpecialised || vm.formData.IsAlternativePrivateSpecialised || vm.formData.IsAlternativeRealEstateSpecialised || vm.formData.IsOtherAssetInfrastructureSpecialised;
        // }

        vm.checkboxMandatory = function () {
            if(vm.formData.FASPhTable == "DEFINED"){
                return (!vm.formData.IsFixedIncomeBondSpecialised || !vm.formData.IsEquitiesEquitiesSpecialised || !vm.formData.IsInvestmenetFundBondsSpecialised || !vm.formData.IsInvestmenetFundEquitiesSpecialised || !vm.formData.IsInvestmenetFundMoneyMarketSpecialised || !vm.formData.IsAlternativeHedgeFundsSpecialised || !vm.formData.IsAlternativeCommoditySpecialised || !vm.formData.IsAlternativePrivateSpecialised || !vm.formData.IsAlternativeRealEstateSpecialised || !vm.formData.IsOtherAssetInfrastructureSpecialised) || false
        }
        else{
            return (vm.formData.IsFixedIncomeBondSpecialised || vm.formData.IsEquitiesEquitiesSpecialised || vm.formData.IsInvestmenetFundBondsSpecialised || vm.formData.IsInvestmenetFundEquitiesSpecialised || vm.formData.IsInvestmenetFundMoneyMarketSpecialised || vm.formData.IsAlternativeHedgeFundsSpecialised || vm.formData.IsAlternativeCommoditySpecialised || vm.formData.IsAlternativePrivateSpecialised || vm.formData.IsAlternativeRealEstateSpecialised || vm.formData.IsOtherAssetInfrastructureSpecialised) || false
        }
       
        }

        vm.$onInit = function () {
            onInitFormData();
            vm.countriesOfResidence = SLPCConfig.AppProcessAllocationCountryOfResidenceCustodianBank;
            getCountryList();
            getNationalities();
            getOtherCountryNationalityList();
            workflowService.eventRegister(WorkflowConfig.eventForDataTransition, getCommonData, 'app-process-specialised-vtwo');
            workflowService.eventRegister(WorkflowConfig.registerWorkflowExecuteCommand, executeWorkflowForm, 'app-process-specialised-vtwo');
        };

        vm.showCommonModal = showCommonModal;
        vm.showAdditionalNotes = showAdditionalNotes;
        vm.showInvestorInfo = showInvestorInfo;
        vm.showInfoModal = showInfoModal;
        vm.checkMinMax = checkMinMax;
    }

    constructor.$inject = ["$q", "$scope", "$http", "$mdMedia", "shellInfrastructure", "workflowService", "WorkflowConfig", "$state", "policyformService", "$location", "SLPCConfig", "$mdDialog", "slpcSlpcConfigUtilService", "slpcConfigWorkflowService"];
    angular.module("slpc.app-process-specialised-vtwo").controller('slpcAppProcessSpecialisedVtwoController', constructor);
})(window.angular, window.appSuite);