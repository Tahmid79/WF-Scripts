(function (angular, appSuite) {
    "use strict";

    function constructor($q, $scope, $http, $mdMedia, shellInfrastructure, workflowService, WorkflowConfig, $state, $mdDialog, $location, policyformService, SLPCConfig, slpcSlpcConfigUtilService, slpcConfigWorkflowService) {

        var vm = this;
        vm.formData = {};
        vm.currency = [];
        vm.$mdMedia = $mdMedia;
        vm.percentFieldFilled = false;
        vm.IsFirstAdditionalInfoExpanded = true;
        vm.formData.IsFirstAdditionalInfoExpanded = true;
        vm.market = $location.search().market;
        vm.activityId = $location.search().ActivityId;
        vm.workflowName = $location.search().WorkFlowName;

        var assetCategories = ['Bond', 'Equities', 'BondsFund', 'EquityFund', 'MoneyMarketFund', 'HedgeFund', 'CommodityFund', 'PrivateEquityFund', 'RealStateFund', 'Cash'];

        vm.additionalInfos = {
            "First": ["PCFirstIsinInclude", "PCFirstIsinExclude", "PCFirstISINNumber", "PCFirstISINName", "PCFirstISINPercentage", "IsFirstAdditionalInfoExpanded"],
            "Second": ["PCFirstIsinInclude2", "PCFirstIsinExclude2", "PCFirstISINNumber2", "PCFirstISINName2", "PCFirstISINPercentage2", "IsFirstAdditionalInfoExpanded2"],
            "Third": ["PCFirstIsinInclude3", "PCFirstIsinExclude3", "PCFirstISINNumber3", "PCFirstISINName3", "PCFirstISINPercentage3", "IsFirstAdditionalInfoExpanded3"],
            "Fourth": ["PCFirstIsinInclude4", "PCFirstIsinExclude4", "PCFirstISINNumber4", "PCFirstISINName4", "PCFirstISINPercentage4", "IsFirstAdditionalInfoExpanded4"],
            "Fifth": ["PCFirstIsinInclude5", "PCFirstIsinExclude5", "PCFirstISINNumber5", "PCFirstISINName5", "PCFirstISINPercentage5", "IsFirstAdditionalInfoExpanded5"]
        };

        vm.minBond = 0;
        vm.maxBond = 100;
        vm.minEquities = 0;
        vm.maxEquities = 100;
        vm.minBondsFund = 0;
        vm.maxBondsFund = 100;
        vm.minEquityFund = 0;
        vm.maxEquityFund = 100;
        vm.minMoneyMarketFund = 0;
        vm.maxMoneyMarketFund = 100;
        vm.minHedgeFund = 0;
        vm.maxHedgeFund = 100;
        vm.minCommodityFund = 0;
        vm.maxCommodityFund = 100;
        vm.minPrivateEquityFund = 0;
        vm.maxPrivateEquityFund = 100;
        vm.minRealStateFund = 0;
        vm.maxRealStateFund = 100;
        vm.minCash = 0;
        vm.maxCash = 100;
        vm.showAddButton = true;
        vm.showRemoveButton = false;
        vm.checkboxFlag = null;

        var percentMinFields = [
            "PCBondMinPercentage",
            "PCEquitiesMinPercentage",
            "PCBondsFundMinPercentage",
            "PCEquityFundMinPercentage",
            "PCMoneyMarketFundMinPercentage",
            "PCHedgeFundMinPercentage",
            "PCCommodityFundMinPercentage",
            "PCPrivateEquityFundMinPercentage",
            "PCRealStateFundMinPercentage",
            "PCCashMinPercentage"
        ];

        var percentMaxFields = [
            "PCBondMaxPercentage",
            "PCEquitiesMaxPercentage",
            "PCBondsFundMaxPercentage",
            "PCEquityFundMaxPercentage",
            "PCMoneyMarketFundMaxPercentage",
            "PCHedgeFundMaxPercentage",
            "PCCommodityFundMaxPercentage",
            "PCPrivateEquityFundMaxPercentage",
            "PCRealStateFundMaxPercentage",
            "PCCashMaxPercentage"
        ];

        var modelTree = {
            "IsInvestmentManagement#value=true": {
                "PCFinancialManagementChargePercentage": NaN,
            },
            "IsCustodyCharges#value=true": {
                "PCCustodyChargePercentage": NaN,
            },
            "IsAllFees#value=true": {
                "PCAllInFee": "",
            },
            "ChargesSpecificInstruction#value=YES": {
                "PCSpecificInstruction": ""
            },
            "IsFixedIncomeBond#value=true": {
                "PCBondMinPercentage": NaN,
                "PCBondMaxPercentage": NaN
            },
            "IsEquitiesEquities#value=true": {
                "PCEquitiesMinPercentage": NaN,
                "PCEquitiesMaxPercentage": NaN
            },
            "IsInvestmenetFundBonds#value=true": {
                "PCBondsFundMinPercentage": NaN,
                "PCBondsFundMaxPercentage": NaN
            },
            "IsInvestmenetFundEquities#value=true": {
                "PCEquityFundMinPercentage": NaN,
                "PCEquityFundMaxPercentage": NaN
            },
            "IsInvestmenetFundMoneyMarket#value=true": {
                "PCMoneyMarketFundMinPercentage": NaN,
                "PCMoneyMarketFundMaxPercentage": NaN
            },
            "IsAlternativeHedgeFunds#value=true": {
                "PCHedgeFundMinPercentage": NaN,
                "PCHedgeFundMaxPercentage": NaN
            },
            "IsAlternativeCommodity#value=true": {
                "PCCommodityFundMinPercentage": NaN,
                "PCCommodityFundMaxPercentage": NaN
            },
            "IsAlternativePrivate#value=true": {
                "PCPrivateEquityFundMinPercentage": NaN,
                "PCPrivateEquityFundMaxPercentage": NaN
            },
            "IsAlternativeRealEstate#value=true": {
                "PCRealStateFundMinPercentage": NaN,
                "PCRealStateFundMaxPercentage": NaN
            },
            "IsCashCurrent#value=true": {
                "PCCashMinPercentage": NaN,
                "PCCashMaxPercentage": NaN
            },
            "AddAnotherDedicatedFund#value=NO": {
                "PCDoesTheInvestment": ""
            },
            "PCSelfManagementPolicyHolderMail#value=true": {
                "PCSelfManagementPolicyHolderMail1stAddress": false,
                "PCSelfManagementPolicyHolderMailCorrespondenceAddress": false,
                "PCSelfManagementPolicyHolderMailFollowingAddress#value=true#default=false": {
                    "PCSelfManagementPolicyHolderMailFollowingAddressValue": ""
                }
            },
            "PCSelfManagementPolicyHolderEmail#value=true": {
                "PCSelfManagementPolicyHolderEmailValue": ""
            },
            "PCSelfManagementPolicyHolderTelephone#value=true": {
                "PCSelfManagementPolicyHolderTelephoneValue": ""
            },
            "PCSelfManagementPolicyHolderFax#value=true": {
                "PCSelfManagementPolicyHolderFaxValue": ""
            },
            "PCSelfManagementDifferentInvestmentStrategy#value=true": {
                "IsDifferentInvestmentFixedIncomeBond#value=true#default=false": {
                    "PCSelfManagementBondMinPercentage": -1,
                    "PCSelfManagementBondMaxPercentage": -1
                },
                "IsDifferentInvestmentEquities#value=true#default=false": {
                    "PCSelfManagementEquitiesMinPercentage": -1,
                    "PCSelfManagementEquitiesMaxPercentage": -1
                },
                "IsDifferentInvestmentInvestmentFundsBond#value=true#default=false": {
                    "PCSelfManagementBondsFundMinPercentage": -1,
                    "PCSelfManagementBondsFundMaxPercentage": -1
                },
                "IsDifferentInvestmentInvestmentFundsEquity#value=true#default=false": {
                    "PCSelfManagementEquityFundMinPercentage": -1,
                    "PCSelfManagementEquityFundMaxPercentage": -1
                },
                "IsDifferentInvestmentInvestmentFundsMoney#value=true#default=false": {
                    "PCSelfManagementMoneyMarketFundMinPercentage": -1,
                    "PCSelfManagementMoneyMarketFundMaxPercentage": -1
                },
                "IsDifferentInvestmentAlternateHedge#value=true#default=false": {
                    "PCSelfManagementHedgeFundMinPercentage": -1,
                    "PCSelfManagementHedgeFundMaxPercentage": -1
                },
                "IsDifferentInvestmentAlternateCommodity#value=true#default=false": {
                    "PCSelfManagementCommodityFundMinPercentage": -1,
                    "PCSelfManagementCommodityFundMaxPercentage": -1
                },
                "IsDifferentInvestmentAlternatePrivate#value=true#default=false": {
                    "PCSelfManagementPrivateEquityFundMinPercentage": -1,
                    "PCSelfManagementPrivateEquityFundMaxPercentage": -1
                },
                "IsDifferentInvestmentAlternateReal#value=true#default=false": {
                    "PCSelfManagementRealStateFundMinPercentage": -1,
                    "PCSelfManagementRealStateFundMaxPercentage": -1
                },
                "IsDifferentInvestmentOther": false,
                "IsDifferentInvestmentCash#value=true#default=false": {
                    "PCSelfManagementCashMinPercentage": -1,
                    "PCSelfManagementCashMaxPercentage": -1
                }
            },
            "PCSelfManagementContactPersonFirstNameNotApplicable#value=false": {
                "PCSelfManagementContactPersonFirstName": ""
            },
            "PCSelfManagementContactPersonMobileNotApplicable#value=false": {
                "PCSelfManagementContactPersonMobile": ""
            },
            "PCSelfManagementContactPersonEmailNotApplicable#value=false": {
                "PCSelfManagementContactPersonEmail": ""
            },
            "PCSelfManagementContactPersonFaxNotApplicable#value=false": {
                "PCSelfManagementContactPersonFax": ""
            }
        }

        vm.addMoreAdditionalInfo = function () {
            if (vm.IsFirstAdditionalInfoExpanded) {
                if (vm.IsFirstAdditionalInfoExpanded2) {
                    if (vm.IsFirstAdditionalInfoExpanded3) {
                        if (vm.IsFirstAdditionalInfoExpanded4) {
                            if (vm.IsFirstAdditionalInfoExpanded5) { } else {
                                vm.formData.IsFirstAdditionalInfoExpanded5 = true;
                                vm.IsFirstAdditionalInfoExpanded5 = true;
                            }
                        } else {
                            vm.formData.IsFirstAdditionalInfoExpanded4 = true;
                            vm.IsFirstAdditionalInfoExpanded4 = true;
                        }
                    }
                    else {
                        vm.formData.IsFirstAdditionalInfoExpanded3 = true;
                        vm.IsFirstAdditionalInfoExpanded3 = true;
                    }
                } else {
                    vm.formData.IsFirstAdditionalInfoExpanded2 = true;
                    vm.IsFirstAdditionalInfoExpanded2 = true;
                }
            }
        }

        vm.removeAdditionalInfo = function () {
            if (vm.IsFirstAdditionalInfoExpanded5) {
                vm.IsFirstAdditionalInfoExpanded5 = false;
                vm.formData.PCFirstIsinInclude5 = false;
                vm.formData.PCFirstIsinExclude5 = false;
                vm.formData.PCFirstISINNumber5 = "";
                vm.formData.PCFirstISINName5 = "";
                vm.formData.PCFirstISINPercentage5 = "";
                vm.formData.IsFirstAdditionalInfoExpanded5 = false;
            } else if (vm.IsFirstAdditionalInfoExpanded4) {
                vm.IsFirstAdditionalInfoExpanded4 = false;
                vm.formData.PCFirstIsinInclude4 = false;
                vm.formData.PCFirstIsinExclude4 = false;
                vm.formData.PCFirstISINNumber4 = "";
                vm.formData.PCFirstISINName4 = "";
                vm.formData.PCFirstISINPercentage4 = "";
                vm.formData.IsFirstAdditionalInfoExpanded4 = false;
            } else if (vm.IsFirstAdditionalInfoExpanded3) {
                vm.IsFirstAdditionalInfoExpanded3 = false;
                vm.formData.PCFirstIsinInclude3 = false;
                vm.formData.PCFirstIsinExclude3 = false;
                vm.formData.PCFirstISINNumber3 = "";
                vm.formData.PCFirstISINName3 = "";
                vm.formData.PCFirstISINPercentage3 = "";
                vm.formData.IsFirstAdditionalInfoExpanded3 = false;
            } else if (vm.IsFirstAdditionalInfoExpanded2) {
                vm.IsFirstAdditionalInfoExpanded2 = false;
                vm.formData.PCFirstIsinInclude2 = false;
                vm.formData.PCFirstIsinExclude2 = false;
                vm.formData.PCFirstISINNumber2 = "";
                vm.formData.PCFirstISINName2 = "";
                vm.formData.PCFirstISINPercentage2 = "";
                vm.formData.IsFirstAdditionalInfoExpanded2 = false;
            }
        }

        function onInitFormData() {
            vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable = vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable || false;
            vm.formData.PCSelfManagementContactPersonMobileNotApplicable = vm.formData.PCSelfManagementContactPersonMobileNotApplicable || false;
            vm.formData.PCSelfManagementContactPersonEmailNotApplicable = vm.formData.PCSelfManagementContactPersonEmailNotApplicable || false;
            vm.formData.PCSelfManagementContactPersonFaxNotApplicable = vm.formData.PCSelfManagementContactPersonFaxNotApplicable || false;
            vm.formData.IsSelfTelephoneAvailable = vm.formData.IsSelfTelephoneAvailable || false;

            vm.IsFirstAdditionalInfoExpanded2 = vm.formData["IsFirstAdditionalInfoExpanded2"] || false;
            vm.IsFirstAdditionalInfoExpanded3 = vm.formData["IsFirstAdditionalInfoExpanded3"] || false;
            vm.IsFirstAdditionalInfoExpanded4 = vm.formData["IsFirstAdditionalInfoExpanded4"] || false;
            vm.IsFirstAdditionalInfoExpanded5 = vm.formData["IsFirstAdditionalInfoExpanded5"] || false;
        }

        function doubleDefualtValue() {
            var doublePropertyArray = [
                "PCSelfManagementBondMinPercentage",
                "PCSelfManagementBondMaxPercentage",
                "PCSelfManagementEquitiesMinPercentage",
                "PCSelfManagementEquitiesMaxPercentage",
                "PCSelfManagementBondsFundMinPercentage",
                "PCSelfManagementBondsFundMaxPercentage",
                "PCSelfManagementEquityFundMinPercentage",
                "PCSelfManagementEquityFundMaxPercentage",
                "PCSelfManagementMoneyMarketFundMinPercentage",
                "PCSelfManagementMoneyMarketFundMaxPercentage",
                "PCSelfManagementHedgeFundMinPercentage",
                "PCSelfManagementHedgeFundMaxPercentage",
                "PCSelfManagementCommodityFundMinPercentage",
                "PCSelfManagementCommodityFundMaxPercentage",
                "PCSelfManagementPrivateEquityFundMinPercentage",
                "PCSelfManagementPrivateEquityFundMaxPercentage",
                "PCSelfManagementRealStateFundMinPercentage",
                "PCSelfManagementRealStateFundMaxPercentage",
                "PCSelfManagementCashMinPercentage",
                "PCSelfManagementCashMaxPercentage"
            ];
            _.forEach(doublePropertyArray, function (property) {
                if (vm.formData[property] === -1) {
                    vm.formData[property] = NaN;
                }
            });
        }

        function checkMinMax(assetCategory) {
            vm['min' + assetCategory] = vm.formData['PC' + assetCategory + 'MinPercentage'] ? vm.formData['PC' + assetCategory + 'MinPercentage'] : 0;
            vm['max' + assetCategory] = vm.formData['PC' + assetCategory + 'MaxPercentage'] ? vm.formData['PC' + assetCategory + 'MaxPercentage'] : 100;
        }

        if (vm.workflowName === 'Additional Premium'){
        var entityObj = {
            activityId: "AdditionalPremiumIdentityOfThePolicyholder",
            workflowInstanceId: $location.search().workflowInstanceId,
            itemId: null,
            entityName: null,
            fields: [
                "PHRSuitabilitySection",
                "PASelfManagementPolicyHolder",
                "NumberOfDedicatedFund",
            ]
        };
    }

    if (vm.workflowName === 'Switch'){
        var entityObj = {
            activityId: "SwitchIdentityOfThePolicyHolder",
            workflowInstanceId: $location.search().workflowInstanceId,
            itemId: null,
            entityName: null,
            fields: [
                "NumberOfDedicatedFund",
            ]
        };
    }

        var noProfileMsg = "No Profile";

        function executeWorkflowForm(data) {           
            if (data) {
                vm.formData = JSON.parse(data.Entities[0].JsonString);
                doubleDefualtValue();
                onInitFormData();
                assetCategories.forEach(function (assetCategory) {
                    checkMinMax(assetCategory);
                });
            } else {
                $scope.appProcessCharges.$submitted = true;
                checkPercentageField();
                if (!$scope.appProcessCharges.$invalid && vm.checkboxMandatory()) {
                    slpcSlpcConfigUtilService.cleanupModel(vm.formData, modelTree);
                    if (vm.numberOfDedicatedFund == 1 && !vm.isFormReadonly) {
                        asyncShowModal().then(function () {
                            vm.formData.RequestPayload = { itemId: $state.params.slpcworkflowId }
                            vm.formData["Tags"] = ["Is-A-AppProcessCharges"];
                            workflowService.eventBroadcast(WorkflowConfig.registerCallBackFromChild, _.clone(vm.formData));
                        });
                    } else {
                        vm.formData.RequestPayload = { itemId: $state.params.slpcworkflowId }
                        vm.formData["Tags"] = ["Is-A-AppProcessCharges"];
                        workflowService.eventBroadcast(WorkflowConfig.registerCallBackFromChild, _.clone(vm.formData));
                    }
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
            });

            // if (vm.workflowName === 'Additional Premium')
            
            //  { 
                
            //      entityObj.activityId = 'AdditionalPremiumIdentityOfThePolicyholder';
            //      }
            //      else if(vm.workflowName === 'Switch'){
                    
            //      entityObj.activityId = 'SwitchIdentityOfThePolicyHolder';

            //      }

            getData.activityData(entityObj.activityId, entityObj.workflowInstanceId).then(function (response) {               
                if (response.DataContext) {
                    var contextValue = response.DataContext[0].Value;
                    entityObj.itemId = contextValue.ItemId;
                    entityObj.entityName = contextValue.EntityName;
                    getData.entityData(entityObj.itemId, entityObj.fields, entityObj.entityName).then(function (responseData) {
                        
                        vm.numberOfDedicatedFund = responseData.NumberOfDedicatedFund;
                        
                        if (vm.numberOfDedicatedFund && vm.numberOfDedicatedFund > 1) {
                            vm.formData.AddAnotherDedicatedFund = "YES";
                        } else {
                            vm.formData.AddAnotherDedicatedFund = "NO";
                        }
                        if (responseData.PASelfManagementPolicyHolder) {
                            vm.showDeclarationSelfManagementPolicyHolder = true;
                        }
                        if (responseData[entityObj.fields[0]]) {
                            vm.riskAsInvestor = responseData[entityObj.fields[0]].replace('_', ' ');
                        } else {
                            vm.riskAsInvestor = noProfileMsg;
                        }
                    });
                } else {
                    vm.riskAsInvestor = noProfileMsg;
                }
            });



            slpcConfigWorkflowService.getEntityDataByWorkflowInstanceId(entityObj.workflowInstanceId, entityObj.fields).then(function (responseFieldsData) {
                vm.workflowName = responseFieldsData.WorkflowName;
                if (responseFieldsData[entityObj.fields[0]]) {
                    vm.riskAsInvestor = responseFieldsData[entityObj.fields[0]].replace('_', ' ');
                } else {
                    vm.riskAsInvestor = noProfileMsg;
                }
            });


        }

        function getOtherCountryNationalityList() {
            var language = $location.search().language;
            policyformService.getCountryList(language, vm.countriesOfResidence).then(function (responseCountries) {
                vm.countriesOfResidence = responseCountries.otherCountry;
                // other country of residence
                vm.otherCountriesOfResidence = _.map(responseCountries.responseCountryList, "Name");
                vm.otherCountriesOfResidence = vm.otherCountriesOfResidence.filter(function (el) {
                    return !vm.countriesOfResidence.includes(el);
                });
            });
        }

        function getCountryList() {
            policyformService.getCountryName().then(function (response) {
                vm.countryList = response;
            });
        }

        function checkPercentageField() {
            var counter = 0;
            for (var i = 0; i < 10; i++) {
                if (vm.formData[percentMinFields[i]] || vm.formData[percentMinFields[i]] === 0) {
                    if (vm.formData[percentMaxFields[i]]) {
                        counter++;
                    }
                }
            }
            if (counter > 0) {
                vm.percentFieldFilled = true;
            }
        }

        var showInfoModal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfoModalController",
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

        vm.showInfoModal = function ($event) {
            showInfoModal($event);
        }

        var showInfo2Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info2.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo2ModalController",
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

        vm.showInfo2Modal = function ($event) {
            showInfo2Modal($event);
        }

        var showInfo3Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info3.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo3ModalController",
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

        vm.showInfo3Modal = function ($event) {
            showInfo3Modal($event);
        }

        var showInfo4Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info4.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo4ModalController",
                controllerAs: "vm",
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    localizationObj: vm.localizationObj,
                    market: vm.market
                }
            }).then(function (answer) {
                vm.formData.PCThePolicyholder = true;
            }, function () {
            });
        }

        vm.showInfo4Modal = function ($event) {
            if (vm.formData.PCDoesTheInvestment === 'NO') {
                showInfo4Modal($event);
            }
        }


        vm.showInfo6Modal = function ($event) {
            showInfo6Modal($event);
        }

        var showInfo6Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info6.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo6ModalController",
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

        vm.showInfo12Modal = function ($event) {
            showInfo12Modal($event);
        }

        var showInfo12Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info12.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo12ModalController",
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

        // vm.showAsyncInfo13Modal = function ($event) {
        //     showAsyncInfo13Modal($event);
        // }


        var showAsyncInfo13Modal = function () {
            return $q(function (resolve, reject) {
                $mdDialog.show({
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info13.modal.view.html",
                    controller: "slpcSwitchCharges1stInfo13ModalController",
                    controllerAs: "vm",
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    locals: {
                        localizationObj: vm.localizationObj,
                        market: vm.market
                    }
                }).then(function (answer) {
                    resolve();
                }, function () {
                    reject();
                });
            });
        }

        vm.showInfo7Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info7.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo7ModalController",
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

        vm.showInfo8Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info8.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo8ModalController",
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

        vm.showInfo9Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info9.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo9ModalController",
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

        vm.showInfo10Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info10.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo10ModalController",
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

        vm.showInfo11Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info11.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchCharges1stInfo11ModalController",
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

        function asyncShowModal() {
            return $q(function (resolve, reject) {
                $mdDialog.show({
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info5.modal.view.html",
                    controller: "slpcSwitchCharges1stInfo5ModalController",
                    controllerAs: "vm",
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    locals: {
                        localizationObj: vm.localizationObj,
                        market: vm.market
                    }
                }).then(function (answer) {
                    vm.formData.PCadditional = answer;
                    resolve();
                }, function () {
                    reject();
                });
            });
        }
        /**
         * Modal shows after "Does the investment strategy 
         * fit the policyholder profile?"
         * Radiobutton is clicked no
         */

        function ShowModalInvestmentStrategy() {
            return $q(function (resolve, reject) {
                $mdDialog.show({
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-1st/view/switch-fr-charges-1st.info14.modal.view.html",
                    controller: "slpcSwitchCharges1stInfo14ModalController",
                    controllerAs: "vm",
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    locals: {
                        localizationObj: vm.localizationObj,
                    }
                }).then(function (answer) {
                    vm.formData.isInvestmentStrategyFit = answer;
                    resolve();
                }, function () {
                    reject();
                });
            });
        }

        function resetFirstAdditionalInstructions() {
            vm.formData.PCFirstISINNumber = '';
            vm.formData.PCFirstISINName = '';
            vm.formData.PCFirstISINPercentage = '';
            vm.formData.PCFirstISINNumberAddAnother = '';
            resetSecondAdditionalInstructions()
        }

        function resetSecondAdditionalInstructions() {
            vm.formData.PCFirstIsinInclude2 = false;
            vm.formData.PCFirstIsinExclude2 = false;
            vm.formData.PCFirstISINNumber2 = '';
            vm.formData.PCFirstISINName2 = '';
            vm.formData.PCFirstISINPercentage2 = '';
            vm.formData.PCFirstISINNumberAddAnother2 = '';
            resetThirdAdditionalInstructions();
        }

        function resetThirdAdditionalInstructions() {
            vm.formData.PCFirstIsinInclude3 = false;
            vm.formData.PCFirstIsinExclude3 = false;
            vm.formData.PCFirstISINNumber3 = '';
            vm.formData.PCFirstISINName3 = '';
            vm.formData.PCFirstISINPercentage3 = '';
        }

        function updateSelfInvestmentStrategy(key) {

            var checkBoxs = ['PCSelfManagementSameInvestmentStrategy', 'PCSelfManagementDifferentInvestmentStrategy', 'PCSelfManagementUploadInvestmentStrategy'];
            for (var i = 0; i < checkBoxs.length; i++) {
                if (checkBoxs[i] !== key) {
                    vm.formData[checkBoxs[i]] = false;
                }
            }
        }

        function updateSelfInvestmentAdvice(key) {
            var options = [
                'PCSelfManagementPolicyHolderMail',
                'PCSelfManagementPolicyHolderEmail',
                'PCSelfManagementPolicyHolderTelephone',
                'PCSelfManagementPolicyHolderFax'
            ];
            _.forEach(options, function (option) {
                if (option != key) {
                    vm.formData[option] = false;
                }
            });

            // if( vm.formData.PCSelfManagementPolicyHolderMail == false || vm.formData.PCSelfManagementPolicyHolderEmail == false || vm.formData.PCSelfManagementPolicyHolderTelephone == false ||  vm.formData.PCSelfManagementPolicyHolderFax == false ){
            if (vm.formData[key] == false) {
                showAsyncInfo13Modal().then(function () {
                    vm.formData.RequestPayload = { itemId: $state.params.slpcworkflowId }
                    vm.formData.Tags = ["Is-A-AppProcessCharges"];
                });
            }

            //}

        }

        function updateSelfInvestmentAdviceEmail(key) {
            var options = [
                'PCSelfManagementPolicyHolderMail1stAddress',
                'PCSelfManagementPolicyHolderMailCorrespondenceAddress',
                'PCSelfManagementPolicyHolderMailFollowingAddress'
            ];
            _.forEach(options, function (option) {
                if (option != key) {
                    vm.formData[option] = false;
                }
            });
        }

        vm.isDualLanguage = function () {
            var markets = ['Sweden', 'Finland'];
            return markets.indexOf(vm.market) > -1;
        }

        vm.changeIncludeExclude = function (value) {
            if (value === 'PCFirstIsinExclude') {
                vm.formData.PCFirstIsinInclude = false;
            }
            if (value === 'PCFirstIsinInclude') {
                vm.formData.PCFirstIsinExclude = false;
            }

            if (value === 'PCFirstIsinExclude2') {
                vm.formData.PCFirstIsinInclude2 = false;
            }
            if (value === 'PCFirstIsinInclude2') {
                vm.formData.PCFirstIsinExclude2 = false;
            }

            if (value === 'PCFirstIsinExclude3') {
                vm.formData.PCFirstIsinInclude3 = false;
            }
            if (value === 'PCFirstIsinInclude3') {
                vm.formData.PCFirstIsinExclude3 = false;
            }
            if (value === 'PCFirstIsinExclude4') {
                vm.formData.PCFirstIsinInclude4 = false;
            }
            if (value === 'PCFirstIsinInclude4') {
                vm.formData.PCFirstIsinExclude4 = false;
            }
            if (value === 'PCFirstIsinExclude5') {
                vm.formData.PCFirstIsinInclude5 = false;
            }
            if (value === 'PCFirstIsinInclude5') {
                vm.formData.PCFirstIsinExclude5 = false;
            }
        }

        function resetPCDoesTheInvestment() {
            vm.formData.PCDoesTheInvestment = '';
        }


        // vm.checkboxMandatory = function () {
        //     return (vm.formData.IsFixedIncomeBond || vm.formData.IsEquitiesEquities || vm.formData.IsInvestmenetFundBonds || vm.formData.IsInvestmenetFundEquities || vm.formData.IsInvestmenetFundMoneyMarket || vm.formData.IsAlternativeHedgeFunds || vm.formData.IsAlternativeCommodity || vm.formData.IsAlternativePrivate || vm.formData.IsAlternativeRealEstate || vm.formData.IsOtherAssetInfrastructure || vm.formData.IsCashCurrent) || false
        // }

        vm.checkboxMandatory = function () {
            if(vm.formData.PhTable == "DEFINED"){
                return (!vm.formData.IsFixedIncomeBond || !vm.formData.IsEquitiesEquities || !vm.formData.IsInvestmenetFundBonds || !vm.formData.IsInvestmenetFundEquities || !vm.formData.IsInvestmenetFundMoneyMarket || !vm.formData.IsAlternativeHedgeFunds || !vm.formData.IsAlternativeCommodity || !vm.formData.IsAlternativePrivate || !vm.formData.IsAlternativeRealEstate || !vm.formData.IsOtherAssetInfrastructure || !vm.formData.IsCashCurrent) || false
        }
        else{
            return (vm.formData.IsFixedIncomeBond || vm.formData.IsEquitiesEquities || vm.formData.IsInvestmenetFundBonds || vm.formData.IsInvestmenetFundEquities || vm.formData.IsInvestmenetFundMoneyMarket || vm.formData.IsAlternativeHedgeFunds || vm.formData.IsAlternativeCommodity || vm.formData.IsAlternativePrivate || vm.formData.IsAlternativeRealEstate || vm.formData.IsOtherAssetInfrastructure || vm.formData.IsCashCurrent) || false
        }
       
        }

        vm.$onInit = function () {
            vm.formData.AddAnotherDedicatedFund = "";
            vm.formData.PCSelfManagementPolicyHolderMail = false;
            vm.formData.PCSelfManagementPolicyHolderEmail = false;
            vm.formData.PCSelfManagementPolicyHolderTelephone = false;
            vm.formData.PCSelfManagementPolicyHolderFax = false;
            onInitFormData();
            getOtherCountryNationalityList();
            getCountryList();
            workflowService.eventRegister(WorkflowConfig.eventForDataTransition, getCommonData, 'switch-fr-charges-1st');
            workflowService.eventRegister(WorkflowConfig.registerWorkflowExecuteCommand, executeWorkflowForm, 'switch-fr-charges-1st');
            vm.countriesOfResidence = SLPCConfig.AppProcessCountryOfResidenceCustodianBank;
        };

        vm.resetFirstAdditionalInstructions = resetFirstAdditionalInstructions;
        vm.resetSecondAdditionalInstructions = resetSecondAdditionalInstructions;
        vm.resetThirdAdditionalInstructions = resetThirdAdditionalInstructions;
        vm.updateSelfInvestmentStrategy = updateSelfInvestmentStrategy;
        vm.asyncShowModal = asyncShowModal;
        vm.checkMinMax = checkMinMax;
        vm.ShowModalInvestmentStrategy = ShowModalInvestmentStrategy;
        vm.updateSelfInvestmentAdvice = updateSelfInvestmentAdvice;
        vm.updateSelfInvestmentAdviceEmail = updateSelfInvestmentAdviceEmail;
        vm.resetPCDoesTheInvestment = resetPCDoesTheInvestment;
    }

    constructor.$inject = ["$q", "$scope", "$http", "$mdMedia", "shellInfrastructure", "workflowService", "WorkflowConfig", "$state", "$mdDialog", "$location", "policyformService", "SLPCConfig", "slpcSlpcConfigUtilService", "slpcConfigWorkflowService"];
    angular.module("slpc.switch-fr-charges-1st").controller('slpcAppProcessChargesV2Controller', constructor);
})(window.angular, window.appSuite);