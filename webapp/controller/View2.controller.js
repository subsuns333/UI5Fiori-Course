sap.ui.define([
    'com/cap/auto/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController,MessageBox,MessageToast,Fragment,Filter,FilterOperator) {
    'use strict';
    return BaseController.extend("com.cap.auto.controller.View2",{
        onInit: function () {
            // Step 1 : Get the router object
            var oRouter = this.getOwnerComponent().getRouter();
            // Step 2:- call the event (attachMatched) with event handler function(enventHndlr)
            oRouter.getRoute("detail").attachMatched(this.enventHndlr , this);
        },
        // Route Matched event Handler concept
        enventHndlr :function (oEvent){
            // Step 1:- Extract the variable(index number) which we pass to the Route "detail"/ pattern
            var sIndex = oEvent.getParameter("arguments").fruitId;
            // var sIndex = oEvent.getParameter("fruitId");
            // Step 2:-reconstruct the path for element binding
            var sPath = "/fruits/" + sIndex;
            // Step 3:- Perform the Elemnet binding within view2 for view2
            this.getView().bindElement(sPath);
            // var oview2 = this.getView();
            // oview2.bindElement(sPath);
        },
        oSupplierPopup : null,
        oCitiPopup: null,
        oField: null,
        onDialogConfirm : function (oEvent){
            // Get the Id of the pop-up, So we can differentiate
            // which fragment led this event to trigger
            var sId = oEvent.getSource().getId();
            debugger
            if(sId.indexOf("cities") !== -1){
                // Step 1:- Explore SDK and get the parameter to find the slelcted item 
                // (The Selected item will be a Display List item)
                var oSelectedItem = oEvent.getParameter("selectedItem");
                // Step 2 :- From the Display list item, we will get the "label" value.
                var sCityName = oSelectedItem.getLabel();
                // Step 3 : Set this to the inputfield inside table on which F4 was pressed
                // We have already taken that inputfield object to the field "oField"
                this.oField.setValue(sCityName);
            }else{
                debugger
                var aFilter = [];

                // Step1 :- Get all the selected value
                var aSelectedItems = oEvent.getParameter("selectedItems");
                // Step2:- Create an array with all the filters
                for (let i = 0; i < aSelectedItems.length; i++) {
                    const element = aSelectedItems[i];
                    var oFilter = new Filter("name", FilterOperator.EQ, element.getLabel());
                    aFilter.push(oFilter);
                    
                }
                // Step3:- Inject the filter to the table by getting its object
                this.getView().byId("supplierTab").getBinding("items").filter(aFilter);
            }

            
        },
        onF4Request : function(oEvent){

            //Get the Object of the inputfield on which the F4 was pressed and copy 
            // in to a global variable
            debugger
            this.oField  = oEvent.getSource();

            // In JS, the callback and promise functions will by default not
            // have access to the 'this' pointer. So
            // We need to create a copy of 'this' ponter. Because a callback/promise function
            // can access a local variable of caller function
            var that = this;

            // If the variable 'oCitiPopup' is not having data
            if(!this.oCitiPopup){
                Fragment.load({
                    id : 'cities',
                    name: 'com.cap.auto.fragments.popup',
                    controller : this
                }).then(function(oDialogBox){
                    that.oCitiPopup = oDialogBox;
                    // by default the Fragment cannot access the data model of our app, 
                    // until someone allow a explicit access of model to this fragment.
                    // The view can allow access of model to the fragment, which is done using
                    // 'addDependent' function
                    that.getView().addDependent(that.oCitiPopup);

                    // Setting title for popup
                    that.oCitiPopup.setTitle("Cities");

                    // Set the City pop-up multiselect to false
                    that.oCitiPopup.setMultiSelect(false);

                    // Use Aggregatoin bindling to get the data lasded in the popup
                    that.oCitiPopup.bindAggregation("items",{
                        path: '/cities',
                        template: new sap.m.DisplayListItem ({
                            label: '{name}',
                            value: '{famousFor}'
                        })
                    });

                    that.oCitiPopup.open();
                });
            }else {
                this.oCitiPopup.open();
            }
            
            
        },
        onFilter : function(){
            // In JS, the callback and promise functions will by default not
            // have access to the 'this' pointer. So
            // We need to create a copy of 'this' ponter. Because a callback/promise function
            // can access a local variable of caller function
            var that = this;

            // If the variable 'oSupplierPopup' is not having data
            if(!this.oSupplierPopup){
                Fragment.load({
                    id : 'supplier',
                    name: 'com.cap.auto.fragments.popup',
                    controller : this
                }).then(function(oDialogBox){
                    that.oSupplierPopup = oDialogBox;
                    // by default the Fragment cannot access the data model of our app, 
                    // until someone allow a explicit access of model to this fragment.
                    // The view can allow access of model to the fragment, which is done using
                    // 'addDependent' function
                    that.getView().addDependent(that.oSupplierPopup);

                    that.oSupplierPopup.setTitle("Suppliers");

                    // Use Aggregatoin bindling to get the data lasded in the popup
                    that.oSupplierPopup.bindAggregation("items",{
                        path: '/suppliers',
                        template: new sap.m.DisplayListItem ({
                            label: '{name}',
                            value: '{country}'
                        })
                    });

                    that.oSupplierPopup.open();
                });
            }else{
                this.oSupplierPopup.open();
            }
            
        },
        onSave : function (){
            MessageBox.confirm("Would you like to Save?",{
                title:"Confirmation...",
                // By default SAP UI5 will not pass 'this' pointer as a controller object
                // to the event handler function. We need to explicitly pass it
                onClose: this.onCloseMessage.bind(this)
            });
            
        },
        onCloseMessage : function(state){
            //  Trying to call 'this' pointer
            var oView = this.getView();     
            
            
            if(state === "OK"){
                MessageToast.show("Congrats! Your order has been palced ");
            }else {
                MessageBox.error("Oops! You can cancelled it ");
            }
        },
        onBack : function(){
            // Step 1 :- get the Mother Object
            var oAppCon = this.getView().getParent();

            // Step 2:- Navingating to the second child using "to" function of class sap.m.NavContainer
            oAppCon.to("idView1");

        }

    });
    
});