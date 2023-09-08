sap.ui.define([
    "project2/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (BaseController, JSONModel, History, MessageToast) {
    "use strict";

    return BaseController.extend("project2.controller.Object", {

        /* =========================================================== */
        /* lifecycle methods         xcz                                  */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            // Model used to manipulate control states. The chosen values make sure,
            // detail page shows busy indication immediately so there is no break in
            // between the busy indication for loading the view's meta data
            var oViewModel = new JSONModel({
                    busy : true,
                    delay : 0
                });
            this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
            this.setModel(oViewModel, "objectView");
        },
        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */
        
        onRatingChanged: function(oEvent) {
            var iValue = oEvent.getParameter("value"),
                sMessage = this.getResourceBundle().getText("productRatingSuccess", [iValue]);
            MessageToast.show(sMessage);
        },

        /**
         * Event handler  for navigating back.
         * It there is a history entry we go one step back in the browser history
         * If not, it will replace the current entry of the browser history with the worklist route.
         * @public
         */
        onNavBack : function() {
            var sPreviousHash = History.getInstance().getPreviousHash();
            if (sPreviousHash !== undefined) {
                // eslint-disable-next-line fiori-custom/sap-no-history-manipulation
                history.go(-1);
            } else {
                this.getRouter().navTo("View1", {}, true);
            }
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Binds the view to the object path.
         * @function
         * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
         * @private
         */
        _onObjectMatched : function (oEvent) {
            var sObjectId =  oEvent.getParameter("arguments").Id;
            this._bindView("/ZZSK_ZC_TEAM_VIEW" + sObjectId);
        },

        /**
         * Binds the view to the object path.
         * @function
         * @param {string} sObjectPath path to the object to be bound
         * @private
         */
        _bindView : function (sObjectPath) {
            var oViewModel = this.getModel("objectView");

            this.getView().bindElement({
                path: sObjectPath,
             /*   parameters: {
                    expand: "ToSupplier"
                }, */

                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function () {
                        oViewModel.setProperty("/busy", true);
                    },
                    dataReceived: function () {
                        oViewModel.setProperty("/busy", false);
                    }
                }
            });
        },

        _onBindingChange : function () {
            var oView = this.getView(),
                oViewModel = this.getModel("objectView"),
                oElementBinding = oView.getElementBinding();

            // No data for the binding
            if (!oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("objectNotFound");
                return;
            }

            var oResourceBundle = this.getResourceBundle(),
                oObject = oView.getBindingContext().getObject(),
                sObjectId = oObject.ProductID,
                sObjectName = oObject.ProductSet;

                oViewModel.setProperty("/busy", false);
                oViewModel.setProperty("/shareSendEmailSubject",
                    oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
                oViewModel.setProperty("/shareSendEmailMessage",
                    oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
        },

        _showObject : function (oItem) {
            this.getRouter().navTo("object", {
                Id: oItem.getBindingContext().getPath().substring("/ZZSK_ZC_TEAM_VIEW".length)
            });
        },

        onDelete2: function() {

            /*delete operation*/
            var oModel = this.getView().getModel();
            var Id = "{/ZZSK_ZC_TEAM_VIEW/Id}";
            /*var Id = this.getView().byId("Id").getValue(); */
            /*var Id2 = oModel.read("/Id", {function(data) {
                alert("success");
               },
               error: function(e) {
                alert("error");
               }}); */
            
           //var oMetaData = oModel.getServiceMetadata();



       /* oModel.callFunction("Materiales", // function import name
        "GET", // http method
        { ProductId : 'AA' }, // function import parameters
        null,
        function(oData, oResponse) {
        console.log(oResponse);
        console.log(oData);
        alert("ok");
        }, // callback function for success
        function(oError){
        alert("err")
        } ); // callback function for error

            var sObjectId =  oEvent.getParameter("arguments").Id;
            this._bindView("/ZZSK_ZC_TEAM_VIEW" + sObjectId); 

            // The source is the list item that got pressed
            this._showObject(oEvent.getSource());
            /*this.getRouter().navTo("objectList");
            var str = "feestje";  

            /*delete operation*/
        /*    var oModel = this.getView().getModel();
            var Id = "{ZZSK_ZC_TEAM_VIEW/Id}"
            /*var Id = this.getView().byId("Id").getValue(); 

          /*  var sObjectId =  oEvent.getParameter("arguments").Id;
            this._bindView("/ZZSK_ZC_TEAM_VIEW" + sObjectId);    /*
         
            oModel.remove("/ZZSK_ZC_TEAM_VIEW('"+UdIf+"')", {
             method: "DELETE",
             success: function(data) {
              alert("success");
             },
             error: function(e) {
              alert("error");
             }
            }); */


        var oView2 = this.getView(),
            oViewModel = this.getModel("objectView")
          //  oElementBinding = oView.getElementBinding();

           
    //        var id5 = this.getSource().getBindingContext().getProperty("Id");


            var id3 = this.getView().byId("34445455445454").getText()
            var id4 = "/ZZSK_ZC_TEAM_VIEW(guid'" + id3 + "')"
            var Id = "/ZZSK_ZC_TEAM_VIEW(guid'3be72b92-9ec6-1eee-92f9-95163f7f51eb')"

            oModel.remove(id4, {
                method: "DELETE",
                success: function(data) {
                 alert("success");
                },
                error: function(e) {
                 alert("error");
                }            
            });
            this.getRouter().navTo("RouteView1");
        }
    });

});
