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
            "PCBondMinPercentage2nd",
            "PCEquitiesMinPercentage2nd",
            "PCBondsFundMinPercentage2nd",
            "PCEquityFundMinPercentage2nd",
            "PCMoneyMarketFundMinPercentage2nd",
            "PCHedgeFundMinPercentage2nd",
            "PCCommodityFundMinPercentage2nd",
            "PCPrivateEquityFundMinPercentage2nd",
            "PCRealStateFundMinPercentage2nd",
            "PCCashMinPercentage2nd"
        ];

        var percentMaxFields = [
            "PCBondMaxPercentage2nd",
            "PCEquitiesMaxPercentage2nd",
            "PCBondsFundMaxPercentage2nd",
            "PCEquityFundMaxPercentage2nd",
            "PCMoneyMarketFundMaxPercentage2nd",
            "PCHedgeFundMaxPercentage2nd",
            "PCCommodityFundMaxPercentage2nd",
            "PCPrivateEquityFundMaxPercentage2nd",
            "PCRealStateFundMaxPercentage2nd",
            "PCCashMaxPercentage2nd"
        ];

        var modelTree = {
            "IsInvestmentManagement2nd#value=true": {
                "PCFinancialManagementChargePercentage2nd": NaN,
            },
            "IsCustodyCharges2nd#value=true": {
                "PCCustodyChargePercentage2nd": NaN,
            },
            "IsAllFees2nd#value=true": {
                "PCAllInFee2nd": "",
            },
            "ChargesSpecificInstruction2nd#value=YES": {
                "PCSpecificInstruction2nd": ""
            },
            "IsFixedIncomeBond2nd#value=true": {
                "PCBondMinPercentage2nd": NaN,
                "PCBondMaxPercentage2nd": NaN
            },
            "IsEquitiesEquities2nd#value=true": {
                "PCEquitiesMinPercentage2nd": NaN,
                "PCEquitiesMaxPercentage2nd": NaN
            },
            "IsInvestmenetFundBonds2nd#value=true": {
                "PCBondsFundMinPercentage2nd": NaN,
                "PCBondsFundMaxPercentage2nd": NaN
            },
            "IsInvestmenetFundEquities2nd#value=true": {
                "PCEquityFundMinPercentage2nd": NaN,
                "PCEquityFundMaxPercentage2nd": NaN
            },
            "IsInvestmenetFundMoneyMarket2nd#value=true": {
                "PCMoneyMarketFundMinPercentage2nd": NaN,
                "PCMoneyMarketFundMaxPercentage2nd": NaN
            },
            "IsAlternativeHedgeFunds2nd#value=true": {
                "PCHedgeFundMinPercentage2nd": NaN,
                "PCHedgeFundMaxPercentage2nd": NaN
            },
            "IsAlternativeCommodity2nd#value=true": {
                "PCCommodityFundMinPercentage2nd": NaN,
                "PCCommodityFundMaxPercentage2nd": NaN
            },
            "IsAlternativePrivate2nd#value=true": {
                "PCPrivateEquityFundMinPercentage2nd": NaN,
                "PCPrivateEquityFundMaxPercentage2nd": NaN
            },
            "IsAlternativeRealEstate2nd#value=true": {
                "PCRealStateFundMinPercentage2nd": NaN,
                "PCRealStateFundMaxPercentage2nd": NaN
            },
            "IsCashCurrent2nd#value=true": {
                "PCCashMinPercentage2nd": NaN,
                "PCCashMaxPercentage2nd": NaN
            },
            "AddAnotherDedicatedFund2nd#value=NO": {
                "PCDoesTheInvestment2nd": ""
            },
            "PCSelfManagementPolicyHolderMail2nd#value=true": {
                "PCSelfManagementPolicyHolderMail1stAddress2nd": false,
                "PCSelfManagementPolicyHolderMailCorrespondenceAddress2nd": false,
                "PCSelfManagementPolicyHolderMailFollowingAddress2nd#value=true#default=false": {
                    "PCSelfManagementPolicyHolderMailFollowingAddressValue2nd": ""
                }
            },
            "PCSelfManagementPolicyHolderEmail2nd#value=true": {
                "PCSelfManagementPolicyHolderEmailValue2nd": ""
            },
            "PCSelfManagementPolicyHolderTelephone2nd#value=true": {
                "PCSelfManagementPolicyHolderTelephoneValue2nd": ""
            },
            "PCSelfManagementPolicyHolderFax2nd#value=true": {
                "PCSelfManagementPolicyHolderFaxValue2nd": ""
            },
            "PCSelfManagementDifferentInvestmentStrategy2nd#value=true": {
                "IsDifferentInvestmentFixedIncomeBond2nd#value=true#default=false": {
                    "PCSelfManagementBondMinPercentage2nd": -1,
                    "PCSelfManagementBondMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentEquities2nd#value=true#default=false": {
                    "PCSelfManagementEquitiesMinPercentage2nd": -1,
                    "PCSelfManagementEquitiesMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentInvestmentFundsBond2nd#value=true#default=false": {
                    "PCSelfManagementBondsFundMinPercentage2nd": -1,
                    "PCSelfManagementBondsFundMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentInvestmentFundsEquity2nd#value=true#default=false": {
                    "PCSelfManagementEquityFundMinPercentage2nd": -1,
                    "PCSelfManagementEquityFundMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentInvestmentFundsMoney2nd#value=true#default=false": {
                    "PCSelfManagementMoneyMarketFundMinPercentage2nd": -1,
                    "PCSelfManagementMoneyMarketFundMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentAlternateHedge2nd#value=true#default=false": {
                    "PCSelfManagementHedgeFundMinPercentage2nd": -1,
                    "PCSelfManagementHedgeFundMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentAlternateCommodity2nd#value=true#default=false": {
                    "PCSelfManagementCommodityFundMinPercentage2nd": -1,
                    "PCSelfManagementCommodityFundMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentAlternatePrivate2nd#value=true#default=false": {
                    "PCSelfManagementPrivateEquityFundMinPercentage2nd": -1,
                    "PCSelfManagementPrivateEquityFundMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentAlternateReal2nd#value=true#default=false": {
                    "PCSelfManagementRealStateFundMinPercentage2nd": -1,
                    "PCSelfManagementRealStateFundMaxPercentage2nd": -1
                },
                "IsDifferentInvestmentOther2nd": false,
                "IsDifferentInvestmentCash2nd#value=true#default=false": {
                    "PCSelfManagementCashMinPercentage2nd": -1,
                    "PCSelfManagementCashMaxPercentage2nd": -1
                }
            },
            "PCSelfManagementContactPersonFirstNameNotApplicable2nd#value=false": {
                "PCSelfManagementContactPersonFirstName2nd": ""
            },
            "PCSelfManagementContactPersonMobileNotApplicable2nd#value=false": {
                "PCSelfManagementContactPersonMobile2nd": ""
            },
            "PCSelfManagementContactPersonEmailNotApplicable2nd#value=false": {
                "PCSelfManagementContactPersonEmail2nd": ""
            },
            "PCSelfManagementContactPersonFaxNotApplicable2nd#value=false": {
                "PCSelfManagementContactPersonFax2nd": ""
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
            vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable2nd = vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable2nd || false;
            vm.formData.PCSelfManagementContactPersonMobileNotApplicable2nd = vm.formData.PCSelfManagementContactPersonMobileNotApplicable2nd || false;
            vm.formData.PCSelfManagementContactPersonEmailNotApplicable2nd = vm.formData.PCSelfManagementContactPersonEmailNotApplicable2nd || false;
            vm.formData.PCSelfManagementContactPersonFaxNotApplicable2nd = vm.formData.PCSelfManagementContactPersonFaxNotApplicable2nd || false;
            vm.formData.IsSelfTelephoneAvailable2nd = vm.formData.IsSelfTelephoneAvailable2nd || false;

            vm.IsFirstAdditionalInfoExpanded2 = vm.formData["IsFirstAdditionalInfoExpanded2"] || false;
            vm.IsFirstAdditionalInfoExpanded3 = vm.formData["IsFirstAdditionalInfoExpanded3"] || false;
            vm.IsFirstAdditionalInfoExpanded4 = vm.formData["IsFirstAdditionalInfoExpanded4"] || false;
            vm.IsFirstAdditionalInfoExpanded5 = vm.formData["IsFirstAdditionalInfoExpanded5"] || false;
        }

        function doubleDefualtValue() {
            var doublePropertyArray = [
                "PCSelfManagementBondMinPercentage2nd",
                "PCSelfManagementBondMaxPercentage2nd",
                "PCSelfManagementEquitiesMinPercentage2nd",
                "PCSelfManagementEquitiesMaxPercentage2nd",
                "PCSelfManagementBondsFundMinPercentage2nd",
                "PCSelfManagementBondsFundMaxPercentage2nd",
                "PCSelfManagementEquityFundMinPercentage2nd",
                "PCSelfManagementEquityFundMaxPercentage2nd",
                "PCSelfManagementMoneyMarketFundMinPercentage2nd",
                "PCSelfManagementMoneyMarketFundMaxPercentage2nd",
                "PCSelfManagementHedgeFundMinPercentage2nd",
                "PCSelfManagementHedgeFundMaxPercentage2nd",
                "PCSelfManagementCommodityFundMinPercentage2nd",
                "PCSelfManagementCommodityFundMaxPercentage2nd",
                "PCSelfManagementPrivateEquityFundMinPercentage2nd",
                "PCSelfManagementPrivateEquityFundMaxPercentage2nd",
                "PCSelfManagementRealStateFundMinPercentage2nd",
                "PCSelfManagementRealStateFundMaxPercentage2nd",
                "PCSelfManagementCashMinPercentage2nd",
                "PCSelfManagementCashMaxPercentage2nd"
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
                            vm.formData.AddAnotherDedicatedFund2nd = "YES";
                        } else {
                            vm.formData.AddAnotherDedicatedFund2nd = "NO";
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfoModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info2.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo2ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info3.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo3ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info4.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo4ModalController",
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
            if (vm.formData.PCDoesTheInvestment2nd === 'NO') {
                showInfo4Modal($event);
            }
        }


        vm.showInfo6Modal = function ($event) {
            showInfo6Modal($event);
        }

        var showInfo6Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info6.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo6ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info12.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo12ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info13.modal.view.html",
                    controller: "slpcSwitchFrCharges2ndInfo13ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info7.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo7ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info8.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo8ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info9.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo9ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info10.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo10ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info11.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges2ndInfo11ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info5.modal.view.html",
                    controller: "slpcSwitchFrCharges2ndInfo5ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-2nd/view/switch-fr-charges-2nd.info14.modal.view.html",
                    controller: "slpcSwitchFrCharges2ndInfo14ModalController",
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

            var checkBoxs = ['PCSelfManagementSameInvestmentStrategy2nd', 'PCSelfManagementDifferentInvestmentStrategy2nd', 'PCSelfManagementUploadInvestmentStrategy2nd'];
            for (var i = 0; i < checkBoxs.length; i++) {
                if (checkBoxs[i] !== key) {
                    vm.formData[checkBoxs[i]] = false;
                }
            }
        }

        function updateSelfInvestmentAdvice(key) {
            var options = [
                'PCSelfManagementPolicyHolderMail2nd',
                'PCSelfManagementPolicyHolderEmail2nd',
                'PCSelfManagementPolicyHolderTelephone2nd',
                'PCSelfManagementPolicyHolderFax2nd'
            ];
            _.forEach(options, function (option) {
                if (option != key) {
                    vm.formData[option] = false;
                }
            });

            // if( vm.formData.PCSelfManagementPolicyHolderMail2nd == false || vm.formData.PCSelfManagementPolicyHolderEmail2nd == false || vm.formData.PCSelfManagementPolicyHolderTelephone2nd == false ||  vm.formData.PCSelfManagementPolicyHolderFax2nd == false ){
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
                'PCSelfManagementPolicyHolderMail1stAddress2nd',
                'PCSelfManagementPolicyHolderMailCorrespondenceAddress2nd',
                'PCSelfManagementPolicyHolderMailFollowingAddress2nd'
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
            vm.formData.PCDoesTheInvestment2nd = '';
        }


        // vm.checkboxMandatory = function () {
        //     return (vm.formData.IsFixedIncomeBond2nd || vm.formData.IsEquitiesEquities2nd || vm.formData.IsInvestmenetFundBonds2nd || vm.formData.IsInvestmenetFundEquities2nd || vm.formData.IsInvestmenetFundMoneyMarket2nd || vm.formData.IsAlternativeHedgeFunds2nd || vm.formData.IsAlternativeCommodity2nd || vm.formData.IsAlternativePrivate2nd || vm.formData.IsAlternativeRealEstate2nd || vm.formData.IsOtherAssetInfrastructure2nd || vm.formData.IsCashCurrent2nd) || false
        // }

        vm.checkboxMandatory = function () {
            if(vm.formData.PhTable2nd == "DEFINED"){
                return (!vm.formData.IsFixedIncomeBond2nd || !vm.formData.IsEquitiesEquities2nd || !vm.formData.IsInvestmenetFundBonds2nd || !vm.formData.IsInvestmenetFundEquities2nd || !vm.formData.IsInvestmenetFundMoneyMarket2nd || !vm.formData.IsAlternativeHedgeFunds2nd || !vm.formData.IsAlternativeCommodity2nd || !vm.formData.IsAlternativePrivate2nd || !vm.formData.IsAlternativeRealEstate2nd || !vm.formData.IsOtherAssetInfrastructure2nd || !vm.formData.IsCashCurrent2nd) || false
        }
        else{
            return (vm.formData.IsFixedIncomeBond2nd || vm.formData.IsEquitiesEquities2nd || vm.formData.IsInvestmenetFundBonds2nd || vm.formData.IsInvestmenetFundEquities2nd || vm.formData.IsInvestmenetFundMoneyMarket2nd || vm.formData.IsAlternativeHedgeFunds2nd || vm.formData.IsAlternativeCommodity2nd || vm.formData.IsAlternativePrivate2nd || vm.formData.IsAlternativeRealEstate2nd || vm.formData.IsOtherAssetInfrastructure2nd || vm.formData.IsCashCurrent2nd) || false
        }

        }

        vm.$onInit = function () {
            vm.formData.AddAnotherDedicatedFund2nd = "";
            vm.formData.PCSelfManagementPolicyHolderMail2nd = false;
            vm.formData.PCSelfManagementPolicyHolderEmail2nd = false;
            vm.formData.PCSelfManagementPolicyHolderTelephone2nd = false;
            vm.formData.PCSelfManagementPolicyHolderFax2nd = false;
            onInitFormData();
            getOtherCountryNationalityList();
            getCountryList();
            workflowService.eventRegister(WorkflowConfig.eventForDataTransition, getCommonData, 'switch-fr-charges-2nd');
            workflowService.eventRegister(WorkflowConfig.registerWorkflowExecuteCommand, executeWorkflowForm, 'switch-fr-charges-2nd');
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
    angular.module("slpc.switch-fr-charges-2nd").controller('slpcSwitchFrCharges2ndController', constructor);
})(window.angular, window.appSuite);