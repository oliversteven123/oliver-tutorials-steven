sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("project2.controller.View1", {
            onInit: function () {
            /*    var oViewModel;

                // keeps the search state
                this._aTableSearchState = [];
    
                // Model used to manipulate control states
                oViewModel = new JSONModel({
                    worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
                    shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                    shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                    tableNoDataText : this.getResourceBundle().getText("tableNoDataText"
    )
                });
                this.setModel(oViewModel, "View1"); */

            },

        /**
         * Convenience method for accessing the router.
         * @public
         * @returns {sap.ui.core.routing.Router} the router for this component*/
         
        getRouter : function () {
            return UIComponent.getRouterFor(this);
        },

        
         /* Convenience method for getting the view model by name.
         * @public
         * @param {string} [sName] the model name
         * @returns {sap.ui.model.Model} the model instance
         */
        getModel : function (sName) {
            return this.getView().getModel(sName);
        },

            _mFilters: {

                STEVEN: [new sap.ui.model.Filter("Bonus", "LT", 9000)],
				HANS: [new sap.ui.model.Filter("Bonus", "BT", 9000, 1000555)] 
			},

            /* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Event handler when a filter tab gets pressed
			 * @param {sap.ui.base.Event} oEvent the filter tab event
			 * @public
			 */
			onQuickFilter: function(oEvent) {
                var aTableSearchState = [];
                var sKey = oEvent.getParameter("key");
                aTableSearchState = [new Filter("CreatedBy", FilterOperator.Contains, sKey)];
                this._applySearch(aTableSearchState);    


            /*    var sKey = oEvent.getParameter("key"),
					oFilter = this._mFilters[sKey],
					oTable = this.byId("table"),
					oBinding = oTable.getBinding("items");
				if (oFilter) {
					oBinding.filter(oFilter);
				} else {
					oBinding.filter([]);	
				}*/
			},

                    /**
             * Event handler when a table item gets pressed
             * @param {sap.ui.base.Event} oEvent the table selectionChange event
             * @public
             */
            onPress : function (oEvent) {
                // The source is the list item that got pressed
                this._showObject(oEvent.getSource());
                /*this.getRouter().navTo("objectList");*/
                var str = "feestje";
            },

            /**
             * Event handler for navigating back.
             * Navigate back in the browser history
             * @public
             */
            onNavBack : function() {
                // eslint-disable-next-line fiori-custom/sap-no-history-manipulation, fiori-custom/sap-browser-api-warning
                history.go(-1);
            },

            _showObject : function (oItem) {
                this.getRouter().navTo("object", {
                    Id: oItem.getBindingContext().getPath().substring("/ZZSK_ZC_TEAM_VIEW".length)
                });
            },

           
            onNavToDetailList : function (){
                this.getRouter().navTo("object");
            },
            
            onNavToEmployees : function (){
                this.getRouter().navTo("employeeList");
            },
            
			/**
			 * Event handler when the add button gets pressed
			 * @public
			 */
			onAdd: function() {
				this.getRouter().navTo("add");
			},
            onDelete: function() {
				this.getRouter().navTo("delete");
			},


            onNavBack : function() {
                // eslint-disable-next-line fiori-custom/sap-no-history-manipulation, fiori-custom/sap-browser-api-warning
                history.go(-1);
            },
            onSearch : function (oEvent) {
                if (oEvent.getParameters().refreshButtonPressed) {
                    // Search field's 'refresh' button has been pressed.
                    // This is visible if you select any main list item.
                    // In this case no new search is triggered, we only
                    // refresh the list binding.
                    this.onRefresh();
                } else {
                    var aTableSearchState = [];
                    var sQuery = oEvent.getParameter("query");
    
                    if (sQuery && sQuery.length > 0) {
                        aTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
                    }
                    this._applySearch(aTableSearchState);
                }
    
            },
            _applySearch: function(aTableSearchState) {
                var oTable = this.byId("table"),
                    oViewModel = this.getModel("RouteView1");
                oTable.getBinding("items").filter(aTableSearchState, "Application");
                // changes the noDataText of the list in case there are no filter results
                if (aTableSearchState.length !== 0) {
                    oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
                }
            },

            /*
            * Event handler when a filter tab gets pressed
			 * @param {sap.ui.base.Event} oEvent the filter tab event
			 * @public
			 */
			/*onQuickFilter: function(oEvent) {
				var sKey = oEvent.getParameter("key"),
					oFilter = this._mFilters[sKey],
					oTable = this.byId("table"),
					oBinding = oTable.getBinding("items");
				if (oFilter) {
					oBinding.filter(oFilter);
				} else {
					oBinding.filter([]);	
				}
			}*/
        });
    });
