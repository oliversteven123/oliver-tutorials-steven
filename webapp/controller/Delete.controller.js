sap.ui.define([
	"project2/controller/BaseController", /* "project9/controller/BaseController" */
	"sap/ui/core/routing/History",
    "sap/m/MessageToast"    
], function(BaseController, History, MessageToast) {
	"use strict";

	return BaseController.extend("project2.controller.Delete", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function() {

			// Register to the add route matched
			this.getRouter().getRoute("delete").attachPatternMatched(this._onRouteMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		_onRouteMatched: function() {

        //here goes your logic which will be executed when the "add" route is hit
        //will be done within the next unit
    
            // register for metadata loaded events
			var oModel = this.getModel();
		/*	oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this)); */
        },

        onDelete2: function() {
            /*delete operation*/
            var oModel = this.getView().getModel();
            var Id = "/ZZSK_ZC_TEAM_VIEW(guid'3be72b92-9ec6-1eee-92f9-95163f7f51eb')"
            /*var Id = this.getView().byId("Id").getValue(); */
         
          /*  oModel.remove("/ZZSK_ZC_TEAM_VIEW('"+UdIf+"')", {
             method: "DELETE",
             success: function(data) {
              alert("success");
             },
             error: function(e) {
              alert("error");
             }
            }); */
            oModel.remove(Id, {
                method: "DELETE",
                success: function(data) {
                 alert("success");
                },
                error: function(e) {
                 alert("error");
                }
            });
        },
            
        _onMetadataLoaded: function () {

            // create default properties
            var oProperties = {
               /* ProductID: "" + parseInt(Math.random() * 1000000000, 10),
                TypeCode: "PR",
                TaxTarifCode: 1,
                CurrencyCode: "EUR",
                MeasureUnit: "EA" */
				IdUf: "98306",
            };

            // create new entry in the model
            this._oContext = this.getModel().createEntry("/ZZSK_ZC_TEAM_VIEW", {
                properties: oProperties,
				success: this._onCreateSuccess.bind(this)
            });
            
            // bind the view to the new entry
            this.getView().setBindingContext(this._oContext);
        },
        		/**
		 * Event handler for the cancel action
		 * @public
		 */
		onCancel: function() {
			this.onNavBack();
		},

		/**
		 * Event handler for the save action
		 * @public
		 */
		onSave: function() {
			this.getModel().submitChanges();
		},   
        
        _onCreateSuccess: function (oProduct) {

			// navigate to the new product's object view
			var sId = oProduct.Name;
			this.getRouter().navTo("RouteView1", {
				objectId : sId
			}, true);
	
			// unbind the view to not show this object again
			this.getView().unbindObject();
			
			// show success messge
			var sMessage = this.getResourceBundle().getText([oProduct.Name]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation : false
			});
		},

    
        

		/**
		 * Event handler for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
           	// discard new product from model.
			this.getModel().deleteCreatedEntry(this._oContext); 

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("RouteView1", {}, bReplace);
			}
		}

	});
});
