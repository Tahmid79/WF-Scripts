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
            "PCBondMinPercentage3rd",
            "PCEquitiesMinPercentage3rd",
            "PCBondsFundMinPercentage3rd",
            "PCEquityFundMinPercentage3rd",
            "PCMoneyMarketFundMinPercentage3rd",
            "PCHedgeFundMinPercentage3rd",
            "PCCommodityFundMinPercentage3rd",
            "PCPrivateEquityFundMinPercentage3rd",
            "PCRealStateFundMinPercentage3rd",
            "PCCashMinPercentage3rd"
        ];

        var percentMaxFields = [
            "PCBondMaxPercentage3rd",
            "PCEquitiesMaxPercentage3rd",
            "PCBondsFundMaxPercentage3rd",
            "PCEquityFundMaxPercentage3rd",
            "PCMoneyMarketFundMaxPercentage3rd",
            "PCHedgeFundMaxPercentage3rd",
            "PCCommodityFundMaxPercentage3rd",
            "PCPrivateEquityFundMaxPercentage3rd",
            "PCRealStateFundMaxPercentage3rd",
            "PCCashMaxPercentage3rd"
        ];

        var modelTree = {
            "IsInvestmentManagement3rd#value=true": {
                "PCFinancialManagementChargePercentage3rd": NaN,
            },
            "IsCustodyCharges3rd#value=true": {
                "PCCustodyChargePercentage3rd": NaN,
            },
            "IsAllFees3rd#value=true": {
                "PCAllInFee3rd": "",
            },
            "ChargesSpecificInstruction3rd#value=YES": {
                "PCSpecificInstruction3rd": ""
            },
            "IsFixedIncomeBond3rd#value=true": {
                "PCBondMinPercentage3rd": NaN,
                "PCBondMaxPercentage3rd": NaN
            },
            "IsEquitiesEquities3rd#value=true": {
                "PCEquitiesMinPercentage3rd": NaN,
                "PCEquitiesMaxPercentage3rd": NaN
            },
            "IsInvestmenetFundBonds3rd#value=true": {
                "PCBondsFundMinPercentage3rd": NaN,
                "PCBondsFundMaxPercentage3rd": NaN
            },
            "IsInvestmenetFundEquities3rd#value=true": {
                "PCEquityFundMinPercentage3rd": NaN,
                "PCEquityFundMaxPercentage3rd": NaN
            },
            "IsInvestmenetFundMoneyMarket3rd#value=true": {
                "PCMoneyMarketFundMinPercentage3rd": NaN,
                "PCMoneyMarketFundMaxPercentage3rd": NaN
            },
            "IsAlternativeHedgeFunds3rd#value=true": {
                "PCHedgeFundMinPercentage3rd": NaN,
                "PCHedgeFundMaxPercentage3rd": NaN
            },
            "IsAlternativeCommodity3rd#value=true": {
                "PCCommodityFundMinPercentage3rd": NaN,
                "PCCommodityFundMaxPercentage3rd": NaN
            },
            "IsAlternativePrivate3rd#value=true": {
                "PCPrivateEquityFundMinPercentage3rd": NaN,
                "PCPrivateEquityFundMaxPercentage3rd": NaN
            },
            "IsAlternativeRealEstate3rd#value=true": {
                "PCRealStateFundMinPercentage3rd": NaN,
                "PCRealStateFundMaxPercentage3rd": NaN
            },
            "IsCashCurrent3rd#value=true": {
                "PCCashMinPercentage3rd": NaN,
                "PCCashMaxPercentage3rd": NaN
            },
            "AddAnotherDedicatedFund3rd#value=NO": {
                "PCDoesTheInvestment3rd": ""
            },
            "PCSelfManagementPolicyHolderMail3rd#value=true": {
                "PCSelfManagementPolicyHolderMail1stAddress3rd": false,
                "PCSelfManagementPolicyHolderMailCorrespondenceAddress3rd": false,
                "PCSelfManagementPolicyHolderMailFollowingAddress3rd#value=true#default=false": {
                    "PCSelfManagementPolicyHolderMailFollowingAddressValue3rd": ""
                }
            },
            "PCSelfManagementPolicyHolderEmail3rd#value=true": {
                "PCSelfManagementPolicyHolderEmailValue3rd": ""
            },
            "PCSelfManagementPolicyHolderTelephone3rd#value=true": {
                "PCSelfManagementPolicyHolderTelephoneValue3rd": ""
            },
            "PCSelfManagementPolicyHolderFax3rd#value=true": {
                "PCSelfManagementPolicyHolderFaxValue3rd": ""
            },
            "PCSelfManagementDifferentInvestmentStrategy3rd#value=true": {
                "IsDifferentInvestmentFixedIncomeBond3rd#value=true#default=false": {
                    "PCSelfManagementBondMinPercentage3rd": -1,
                    "PCSelfManagementBondMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentEquities3rd#value=true#default=false": {
                    "PCSelfManagementEquitiesMinPercentage3rd": -1,
                    "PCSelfManagementEquitiesMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentInvestmentFundsBond3rd#value=true#default=false": {
                    "PCSelfManagementBondsFundMinPercentage3rd": -1,
                    "PCSelfManagementBondsFundMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentInvestmentFundsEquity3rd#value=true#default=false": {
                    "PCSelfManagementEquityFundMinPercentage3rd": -1,
                    "PCSelfManagementEquityFundMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentInvestmentFundsMoney3rd#value=true#default=false": {
                    "PCSelfManagementMoneyMarketFundMinPercentage3rd": -1,
                    "PCSelfManagementMoneyMarketFundMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentAlternateHedge3rd#value=true#default=false": {
                    "PCSelfManagementHedgeFundMinPercentage3rd": -1,
                    "PCSelfManagementHedgeFundMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentAlternateCommodity3rd#value=true#default=false": {
                    "PCSelfManagementCommodityFundMinPercentage3rd": -1,
                    "PCSelfManagementCommodityFundMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentAlternatePrivate3rd#value=true#default=false": {
                    "PCSelfManagementPrivateEquityFundMinPercentage3rd": -1,
                    "PCSelfManagementPrivateEquityFundMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentAlternateReal3rd#value=true#default=false": {
                    "PCSelfManagementRealStateFundMinPercentage3rd": -1,
                    "PCSelfManagementRealStateFundMaxPercentage3rd": -1
                },
                "IsDifferentInvestmentOther3rd": false,
                "IsDifferentInvestmentCash3rd#value=true#default=false": {
                    "PCSelfManagementCashMinPercentage3rd": -1,
                    "PCSelfManagementCashMaxPercentage3rd": -1
                }
            },
            "PCSelfManagementContactPersonFirstNameNotApplicable3rd#value=false": {
                "PCSelfManagementContactPersonFirstName3rd": ""
            },
            "PCSelfManagementContactPersonMobileNotApplicable3rd#value=false": {
                "PCSelfManagementContactPersonMobile3rd": ""
            },
            "PCSelfManagementContactPersonEmailNotApplicable3rd#value=false": {
                "PCSelfManagementContactPersonEmail3rd": ""
            },
            "PCSelfManagementContactPersonFaxNotApplicable3rd#value=false": {
                "PCSelfManagementContactPersonFax3rd": ""
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
            vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable3rd = vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable3rd || false;
            vm.formData.PCSelfManagementContactPersonMobileNotApplicable3rd = vm.formData.PCSelfManagementContactPersonMobileNotApplicable3rd || false;
            vm.formData.PCSelfManagementContactPersonEmailNotApplicable3rd = vm.formData.PCSelfManagementContactPersonEmailNotApplicable3rd || false;
            vm.formData.PCSelfManagementContactPersonFaxNotApplicable3rd = vm.formData.PCSelfManagementContactPersonFaxNotApplicable3rd || false;
            vm.formData.IsSelfTelephoneAvailable3rd = vm.formData.IsSelfTelephoneAvailable3rd || false;

            vm.IsFirstAdditionalInfoExpanded2 = vm.formData["IsFirstAdditionalInfoExpanded2"] || false;
            vm.IsFirstAdditionalInfoExpanded3 = vm.formData["IsFirstAdditionalInfoExpanded3"] || false;
            vm.IsFirstAdditionalInfoExpanded4 = vm.formData["IsFirstAdditionalInfoExpanded4"] || false;
            vm.IsFirstAdditionalInfoExpanded5 = vm.formData["IsFirstAdditionalInfoExpanded5"] || false;
        }

        function doubleDefualtValue() {
            var doublePropertyArray = [
                "PCSelfManagementBondMinPercentage3rd",
                "PCSelfManagementBondMaxPercentage3rd",
                "PCSelfManagementEquitiesMinPercentage3rd",
                "PCSelfManagementEquitiesMaxPercentage3rd",
                "PCSelfManagementBondsFundMinPercentage3rd",
                "PCSelfManagementBondsFundMaxPercentage3rd",
                "PCSelfManagementEquityFundMinPercentage3rd",
                "PCSelfManagementEquityFundMaxPercentage3rd",
                "PCSelfManagementMoneyMarketFundMinPercentage3rd",
                "PCSelfManagementMoneyMarketFundMaxPercentage3rd",
                "PCSelfManagementHedgeFundMinPercentage3rd",
                "PCSelfManagementHedgeFundMaxPercentage3rd",
                "PCSelfManagementCommodityFundMinPercentage3rd",
                "PCSelfManagementCommodityFundMaxPercentage3rd",
                "PCSelfManagementPrivateEquityFundMinPercentage3rd",
                "PCSelfManagementPrivateEquityFundMaxPercentage3rd",
                "PCSelfManagementRealStateFundMinPercentage3rd",
                "PCSelfManagementRealStateFundMaxPercentage3rd",
                "PCSelfManagementCashMinPercentage3rd",
                "PCSelfManagementCashMaxPercentage3rd"
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
                            vm.formData.AddAnotherDedicatedFund3rd = "YES";
                        } else {
                            vm.formData.AddAnotherDedicatedFund3rd = "NO";
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfoModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info2.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo2ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info3.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo3ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info4.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo4ModalController",
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
            if (vm.formData.PCDoesTheInvestment3rd === 'NO') {
                showInfo4Modal($event);
            }
        }


        vm.showInfo6Modal = function ($event) {
            showInfo6Modal($event);
        }

        var showInfo6Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info6.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo6ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info12.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo12ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info13.modal.view.html",
                    controller: "slpcSwitchFrCharges3rdInfo13ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info7.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo7ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info8.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo8ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info9.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo9ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info10.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo10ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info11.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges3rdInfo11ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info5.modal.view.html",
                    controller: "slpcSwitchFrCharges3rdInfo5ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-3rd/view/switch-fr-charges-3rd.info14.modal.view.html",
                    controller: "slpcSwitchFrCharges3rdInfo14ModalController",
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

            var checkBoxs = ['PCSelfManagementSameInvestmentStrategy3rd', 'PCSelfManagementDifferentInvestmentStrategy3rd', 'PCSelfManagementUploadInvestmentStrategy3rd'];
            for (var i = 0; i < checkBoxs.length; i++) {
                if (checkBoxs[i] !== key) {
                    vm.formData[checkBoxs[i]] = false;
                }
            }
        }

        function updateSelfInvestmentAdvice(key) {
            var options = [
                'PCSelfManagementPolicyHolderMail3rd',
                'PCSelfManagementPolicyHolderEmail3rd',
                'PCSelfManagementPolicyHolderTelephone3rd',
                'PCSelfManagementPolicyHolderFax3rd'
            ];
            _.forEach(options, function (option) {
                if (option != key) {
                    vm.formData[option] = false;
                }
            });

            // if( vm.formData.PCSelfManagementPolicyHolderMail3rd == false || vm.formData.PCSelfManagementPolicyHolderEmail3rd == false || vm.formData.PCSelfManagementPolicyHolderTelephone3rd == false ||  vm.formData.PCSelfManagementPolicyHolderFax3rd == false ){
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
                'PCSelfManagementPolicyHolderMail1stAddress3rd',
                'PCSelfManagementPolicyHolderMailCorrespondenceAddress3rd',
                'PCSelfManagementPolicyHolderMailFollowingAddress3rd'
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
            vm.formData.PCDoesTheInvestment3rd = '';
        }


        // vm.checkboxMandatory = function () {
        //     return (vm.formData.IsFixedIncomeBond3rd || vm.formData.IsEquitiesEquities3rd || vm.formData.IsInvestmenetFundBonds3rd || vm.formData.IsInvestmenetFundEquities3rd || vm.formData.IsInvestmenetFundMoneyMarket3rd || vm.formData.IsAlternativeHedgeFunds3rd || vm.formData.IsAlternativeCommodity3rd || vm.formData.IsAlternativePrivate3rd || vm.formData.IsAlternativeRealEstate3rd || vm.formData.IsOtherAssetInfrastructure3rd || vm.formData.IsCashCurrent3rd) || false
        // }

        vm.checkboxMandatory = function () {
            if(vm.formData.PhTable3rd == "DEFINED"){
                return (!vm.formData.IsFixedIncomeBond3rd || !vm.formData.IsEquitiesEquities3rd || !vm.formData.IsInvestmenetFundBonds3rd || !vm.formData.IsInvestmenetFundEquities3rd || !vm.formData.IsInvestmenetFundMoneyMarket3rd || !vm.formData.IsAlternativeHedgeFunds3rd || !vm.formData.IsAlternativeCommodity3rd || !vm.formData.IsAlternativePrivate3rd || !vm.formData.IsAlternativeRealEstate3rd || !vm.formData.IsOtherAssetInfrastructure3rd || !vm.formData.IsCashCurrent3rd) || false
        }
        else{
            return (vm.formData.IsFixedIncomeBond3rd || vm.formData.IsEquitiesEquities3rd || vm.formData.IsInvestmenetFundBonds3rd || vm.formData.IsInvestmenetFundEquities3rd || vm.formData.IsInvestmenetFundMoneyMarket3rd || vm.formData.IsAlternativeHedgeFunds3rd || vm.formData.IsAlternativeCommodity3rd || vm.formData.IsAlternativePrivate3rd || vm.formData.IsAlternativeRealEstate3rd || vm.formData.IsOtherAssetInfrastructure3rd || vm.formData.IsCashCurrent3rd) || false
        }

        }

        vm.$onInit = function () {
            vm.formData.AddAnotherDedicatedFund3rd = "";
            vm.formData.PCSelfManagementPolicyHolderMail3rd = false;
            vm.formData.PCSelfManagementPolicyHolderEmail3rd = false;
            vm.formData.PCSelfManagementPolicyHolderTelephone3rd = false;
            vm.formData.PCSelfManagementPolicyHolderFax3rd = false;
            onInitFormData();
            getOtherCountryNationalityList();
            getCountryList();
            workflowService.eventRegister(WorkflowConfig.eventForDataTransition, getCommonData, 'switch-fr-charges-3rd');
            workflowService.eventRegister(WorkflowConfig.registerWorkflowExecuteCommand, executeWorkflowForm, 'switch-fr-charges-3rd');
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
    angular.module("slpc.switch-fr-charges-3rd").controller('slpcSwitchFrCharges3rdController', constructor);
})(window.angular, window.appSuite);