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
            "PCBondMinPercentage4th",
            "PCEquitiesMinPercentage4th",
            "PCBondsFundMinPercentage4th",
            "PCEquityFundMinPercentage4th",
            "PCMoneyMarketFundMinPercentage4th",
            "PCHedgeFundMinPercentage4th",
            "PCCommodityFundMinPercentage4th",
            "PCPrivateEquityFundMinPercentage4th",
            "PCRealStateFundMinPercentage4th",
            "PCCashMinPercentage4th"
        ];

        var percentMaxFields = [
            "PCBondMaxPercentage4th",
            "PCEquitiesMaxPercentage4th",
            "PCBondsFundMaxPercentage4th",
            "PCEquityFundMaxPercentage4th",
            "PCMoneyMarketFundMaxPercentage4th",
            "PCHedgeFundMaxPercentage4th",
            "PCCommodityFundMaxPercentage4th",
            "PCPrivateEquityFundMaxPercentage4th",
            "PCRealStateFundMaxPercentage4th",
            "PCCashMaxPercentage4th"
        ];

        var modelTree = {
            "IsInvestmentManagement4th#value=true": {
                "PCFinancialManagementChargePercentage4th": NaN,
            },
            "IsCustodyCharges4th#value=true": {
                "PCCustodyChargePercentage4th": NaN,
            },
            "IsAllFees4th#value=true": {
                "PCAllInFee4th": "",
            },
            "ChargesSpecificInstruction4th#value=YES": {
                "PCSpecificInstruction4th": ""
            },
            "IsFixedIncomeBond4th#value=true": {
                "PCBondMinPercentage4th": NaN,
                "PCBondMaxPercentage4th": NaN
            },
            "IsEquitiesEquities4th#value=true": {
                "PCEquitiesMinPercentage4th": NaN,
                "PCEquitiesMaxPercentage4th": NaN
            },
            "IsInvestmenetFundBonds4th#value=true": {
                "PCBondsFundMinPercentage4th": NaN,
                "PCBondsFundMaxPercentage4th": NaN
            },
            "IsInvestmenetFundEquities4th#value=true": {
                "PCEquityFundMinPercentage4th": NaN,
                "PCEquityFundMaxPercentage4th": NaN
            },
            "IsInvestmenetFundMoneyMarket4th#value=true": {
                "PCMoneyMarketFundMinPercentage4th": NaN,
                "PCMoneyMarketFundMaxPercentage4th": NaN
            },
            "IsAlternativeHedgeFunds4th#value=true": {
                "PCHedgeFundMinPercentage4th": NaN,
                "PCHedgeFundMaxPercentage4th": NaN
            },
            "IsAlternativeCommodity4th#value=true": {
                "PCCommodityFundMinPercentage4th": NaN,
                "PCCommodityFundMaxPercentage4th": NaN
            },
            "IsAlternativePrivate4th#value=true": {
                "PCPrivateEquityFundMinPercentage4th": NaN,
                "PCPrivateEquityFundMaxPercentage4th": NaN
            },
            "IsAlternativeRealEstate4th#value=true": {
                "PCRealStateFundMinPercentage4th": NaN,
                "PCRealStateFundMaxPercentage4th": NaN
            },
            "IsCashCurrent4th#value=true": {
                "PCCashMinPercentage4th": NaN,
                "PCCashMaxPercentage4th": NaN
            },
            "AddAnotherDedicatedFund4th#value=NO": {
                "PCDoesTheInvestment4th": ""
            },
            "PCSelfManagementPolicyHolderMail4th#value=true": {
                "PCSelfManagementPolicyHolderMail1stAddress4th": false,
                "PCSelfManagementPolicyHolderMailCorrespondenceAddress4th": false,
                "PCSelfManagementPolicyHolderMailFollowingAddress4th#value=true#default=false": {
                    "PCSelfManagementPolicyHolderMailFollowingAddressValue4th": ""
                }
            },
            "PCSelfManagementPolicyHolderEmail4th#value=true": {
                "PCSelfManagementPolicyHolderEmailValue4th": ""
            },
            "PCSelfManagementPolicyHolderTelephone4th#value=true": {
                "PCSelfManagementPolicyHolderTelephoneValue4th": ""
            },
            "PCSelfManagementPolicyHolderFax4th#value=true": {
                "PCSelfManagementPolicyHolderFaxValue4th": ""
            },
            "PCSelfManagementDifferentInvestmentStrategy4th#value=true": {
                "IsDifferentInvestmentFixedIncomeBond4th#value=true#default=false": {
                    "PCSelfManagementBondMinPercentage4th": -1,
                    "PCSelfManagementBondMaxPercentage4th": -1
                },
                "IsDifferentInvestmentEquities4th#value=true#default=false": {
                    "PCSelfManagementEquitiesMinPercentage4th": -1,
                    "PCSelfManagementEquitiesMaxPercentage4th": -1
                },
                "IsDifferentInvestmentInvestmentFundsBond4th#value=true#default=false": {
                    "PCSelfManagementBondsFundMinPercentage4th": -1,
                    "PCSelfManagementBondsFundMaxPercentage4th": -1
                },
                "IsDifferentInvestmentInvestmentFundsEquity4th#value=true#default=false": {
                    "PCSelfManagementEquityFundMinPercentage4th": -1,
                    "PCSelfManagementEquityFundMaxPercentage4th": -1
                },
                "IsDifferentInvestmentInvestmentFundsMoney4th#value=true#default=false": {
                    "PCSelfManagementMoneyMarketFundMinPercentage4th": -1,
                    "PCSelfManagementMoneyMarketFundMaxPercentage4th": -1
                },
                "IsDifferentInvestmentAlternateHedge4th#value=true#default=false": {
                    "PCSelfManagementHedgeFundMinPercentage4th": -1,
                    "PCSelfManagementHedgeFundMaxPercentage4th": -1
                },
                "IsDifferentInvestmentAlternateCommodity4th#value=true#default=false": {
                    "PCSelfManagementCommodityFundMinPercentage4th": -1,
                    "PCSelfManagementCommodityFundMaxPercentage4th": -1
                },
                "IsDifferentInvestmentAlternatePrivate4th#value=true#default=false": {
                    "PCSelfManagementPrivateEquityFundMinPercentage4th": -1,
                    "PCSelfManagementPrivateEquityFundMaxPercentage4th": -1
                },
                "IsDifferentInvestmentAlternateReal4th#value=true#default=false": {
                    "PCSelfManagementRealStateFundMinPercentage4th": -1,
                    "PCSelfManagementRealStateFundMaxPercentage4th": -1
                },
                "IsDifferentInvestmentOther4th": false,
                "IsDifferentInvestmentCash4th#value=true#default=false": {
                    "PCSelfManagementCashMinPercentage4th": -1,
                    "PCSelfManagementCashMaxPercentage4th": -1
                }
            },
            "PCSelfManagementContactPersonFirstNameNotApplicable4th#value=false": {
                "PCSelfManagementContactPersonFirstName4th": ""
            },
            "PCSelfManagementContactPersonMobileNotApplicable4th#value=false": {
                "PCSelfManagementContactPersonMobile4th": ""
            },
            "PCSelfManagementContactPersonEmailNotApplicable4th#value=false": {
                "PCSelfManagementContactPersonEmail4th": ""
            },
            "PCSelfManagementContactPersonFaxNotApplicable4th#value=false": {
                "PCSelfManagementContactPersonFax4th": ""
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
            vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable4th = vm.formData.PCSelfManagementContactPersonFirstNameNotApplicable4th || false;
            vm.formData.PCSelfManagementContactPersonMobileNotApplicable4th = vm.formData.PCSelfManagementContactPersonMobileNotApplicable4th || false;
            vm.formData.PCSelfManagementContactPersonEmailNotApplicable4th = vm.formData.PCSelfManagementContactPersonEmailNotApplicable4th || false;
            vm.formData.PCSelfManagementContactPersonFaxNotApplicable4th = vm.formData.PCSelfManagementContactPersonFaxNotApplicable4th || false;
            vm.formData.IsSelfTelephoneAvailable4th = vm.formData.IsSelfTelephoneAvailable4th || false;

            vm.IsFirstAdditionalInfoExpanded2 = vm.formData["IsFirstAdditionalInfoExpanded2"] || false;
            vm.IsFirstAdditionalInfoExpanded3 = vm.formData["IsFirstAdditionalInfoExpanded3"] || false;
            vm.IsFirstAdditionalInfoExpanded4 = vm.formData["IsFirstAdditionalInfoExpanded4"] || false;
            vm.IsFirstAdditionalInfoExpanded5 = vm.formData["IsFirstAdditionalInfoExpanded5"] || false;
        }

        function doubleDefualtValue() {
            var doublePropertyArray = [
                "PCSelfManagementBondMinPercentage4th",
                "PCSelfManagementBondMaxPercentage4th",
                "PCSelfManagementEquitiesMinPercentage4th",
                "PCSelfManagementEquitiesMaxPercentage4th",
                "PCSelfManagementBondsFundMinPercentage4th",
                "PCSelfManagementBondsFundMaxPercentage4th",
                "PCSelfManagementEquityFundMinPercentage4th",
                "PCSelfManagementEquityFundMaxPercentage4th",
                "PCSelfManagementMoneyMarketFundMinPercentage4th",
                "PCSelfManagementMoneyMarketFundMaxPercentage4th",
                "PCSelfManagementHedgeFundMinPercentage4th",
                "PCSelfManagementHedgeFundMaxPercentage4th",
                "PCSelfManagementCommodityFundMinPercentage4th",
                "PCSelfManagementCommodityFundMaxPercentage4th",
                "PCSelfManagementPrivateEquityFundMinPercentage4th",
                "PCSelfManagementPrivateEquityFundMaxPercentage4th",
                "PCSelfManagementRealStateFundMinPercentage4th",
                "PCSelfManagementRealStateFundMaxPercentage4th",
                "PCSelfManagementCashMinPercentage4th",
                "PCSelfManagementCashMaxPercentage4th"
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
                            vm.formData.AddAnotherDedicatedFund4th = "YES";
                        } else {
                            vm.formData.AddAnotherDedicatedFund4th = "NO";
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfoModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info2.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo2ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info3.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo3ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info4.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo4ModalController",
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
            if (vm.formData.PCDoesTheInvestment4th === 'NO') {
                showInfo4Modal($event);
            }
        }


        vm.showInfo6Modal = function ($event) {
            showInfo6Modal($event);
        }

        var showInfo6Modal = function ($event) {
            $mdDialog.show({
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info6.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo6ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info12.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo12ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info13.modal.view.html",
                    controller: "slpcSwitchFrCharges4thInfo13ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info7.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo7ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info8.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo8ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info9.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo9ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info10.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo10ModalController",
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
                templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info11.modal.view.html",
                targetEvent: $event,
                controller: "slpcSwitchFrCharges4thInfo11ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info5.modal.view.html",
                    controller: "slpcSwitchFrCharges4thInfo5ModalController",
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
                    templateUrl: vm.viewHelper.getTenantPath() + "app/workflows/switch-fr-charges-4th/view/switch-fr-charges-4th.info14.modal.view.html",
                    controller: "slpcSwitchFrCharges4thInfo14ModalController",
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

            var checkBoxs = ['PCSelfManagementSameInvestmentStrategy4th', 'PCSelfManagementDifferentInvestmentStrategy4th', 'PCSelfManagementUploadInvestmentStrategy4th'];
            for (var i = 0; i < checkBoxs.length; i++) {
                if (checkBoxs[i] !== key) {
                    vm.formData[checkBoxs[i]] = false;
                }
            }
        }

        function updateSelfInvestmentAdvice(key) {
            var options = [
                'PCSelfManagementPolicyHolderMail4th',
                'PCSelfManagementPolicyHolderEmail4th',
                'PCSelfManagementPolicyHolderTelephone4th',
                'PCSelfManagementPolicyHolderFax4th'
            ];
            _.forEach(options, function (option) {
                if (option != key) {
                    vm.formData[option] = false;
                }
            });

            // if( vm.formData.PCSelfManagementPolicyHolderMail4th == false || vm.formData.PCSelfManagementPolicyHolderEmail4th == false || vm.formData.PCSelfManagementPolicyHolderTelephone4th == false ||  vm.formData.PCSelfManagementPolicyHolderFax4th == false ){
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
                'PCSelfManagementPolicyHolderMail1stAddress4th',
                'PCSelfManagementPolicyHolderMailCorrespondenceAddress4th',
                'PCSelfManagementPolicyHolderMailFollowingAddress4th'
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
            vm.formData.PCDoesTheInvestment4th = '';
        }


        // vm.checkboxMandatory = function () {
        //     return (vm.formData.IsFixedIncomeBond4th || vm.formData.IsEquitiesEquities4th || vm.formData.IsInvestmenetFundBonds4th || vm.formData.IsInvestmenetFundEquities4th || vm.formData.IsInvestmenetFundMoneyMarket4th || vm.formData.IsAlternativeHedgeFunds4th || vm.formData.IsAlternativeCommodity4th || vm.formData.IsAlternativePrivate4th || vm.formData.IsAlternativeRealEstate4th || vm.formData.IsOtherAssetInfrastructure4th || vm.formData.IsCashCurrent4th) || false
        // }

        vm.checkboxMandatory = function () {
            if(vm.formData.PhTable4th == "DEFINED"){
                return (!vm.formData.IsFixedIncomeBond4th || !vm.formData.IsEquitiesEquities4th || !vm.formData.IsInvestmenetFundBonds4th || !vm.formData.IsInvestmenetFundEquities4th || !vm.formData.IsInvestmenetFundMoneyMarket4th || !vm.formData.IsAlternativeHedgeFunds4th || !vm.formData.IsAlternativeCommodity4th || !vm.formData.IsAlternativePrivate4th || !vm.formData.IsAlternativeRealEstate4th || !vm.formData.IsOtherAssetInfrastructure4th || !vm.formData.IsCashCurrent4th) || false
        }
        else{
            return (vm.formData.IsFixedIncomeBond4th || vm.formData.IsEquitiesEquities4th || vm.formData.IsInvestmenetFundBonds4th || vm.formData.IsInvestmenetFundEquities4th || vm.formData.IsInvestmenetFundMoneyMarket4th || vm.formData.IsAlternativeHedgeFunds4th || vm.formData.IsAlternativeCommodity4th || vm.formData.IsAlternativePrivate4th || vm.formData.IsAlternativeRealEstate4th || vm.formData.IsOtherAssetInfrastructure4th || vm.formData.IsCashCurrent4th) || false
        }

        }

        vm.$onInit = function () {
            vm.formData.AddAnotherDedicatedFund4th = "";
            vm.formData.PCSelfManagementPolicyHolderMail4th = false;
            vm.formData.PCSelfManagementPolicyHolderEmail4th = false;
            vm.formData.PCSelfManagementPolicyHolderTelephone4th = false;
            vm.formData.PCSelfManagementPolicyHolderFax4th = false;
            onInitFormData();
            getOtherCountryNationalityList();
            getCountryList();
            workflowService.eventRegister(WorkflowConfig.eventForDataTransition, getCommonData, 'switch-fr-charges-4th');
            workflowService.eventRegister(WorkflowConfig.registerWorkflowExecuteCommand, executeWorkflowForm, 'switch-fr-charges-4th');
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
    angular.module("slpc.switch-fr-charges-4th").controller('slpcSwitchFrCharges4thController', constructor);
})(window.angular, window.appSuite);