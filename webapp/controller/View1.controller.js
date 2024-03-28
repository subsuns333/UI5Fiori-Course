sap.ui.define([
    'com/cap/auto/controller/BaseController',
    'com/cap/auto/util/formatter',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(BaseController, Formatter, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("com.cap.auto.controller.View1",{
        formatter: Formatter,
        onInit: function(){
            this.oRuter = this.getOwnerComponent().getRouter();
        },
        onNext: function(sIndex){
            // Step 1 :- get the Mother Object
            // var oAppCon = this.getView().getParent();

            // Step 2:- Navingating to the second child using "to" function of class sap.m.NavContainer
            // oAppCon.to("idView2");
            
            // this.oRuter = this.getOwnerComponent().getRouter();
            this.oRuter.navTo("detail", {
                fruitId : sIndex
            }); 

        },
        onAdd :function () {
            this.oRuter.navTo("addProduct");
        },
        onSearch : function(oEvent){
            // debugger;
            // //Step 1:-  get the value of the search field
            // var sValue = oEvent.getParameter("query");
            // // Step 2 :- get the object of View 2
            // var oView2 = this.getView().getParent().getPages()[1];
            // // Step3 = Change the title of the second page dynamically
            // oView2.getContent()[0].setTitle(sValue);

            // // Step 4 :- Call onNext function for navigation
            // this.onNext();

            // Step 1: Get wht was user typed inside search control
            var sText = oEvent.getParameter("query");
            // Step 2: Contruct a filter object to search data
            var oFilter1 = new Filter("name", FilterOperator.Contains, sText);
            var oFilter2 = new Filter("type", FilterOperator.Contains, sText);
            // Step 2.a: Create an Array of filter objects
            var aFilter = [oFilter1, oFilter2];
            // Step 2.b: Create an array with OR condition
            var oFilter = new Filter({
                filters: aFilter,
                and: false
            });
            // Step 3: Get the list control object 
            var oList = this.getView().byId("idList");
            // Step 4: Insert the filter to the List items
            oList.getBinding("items").filter(oFilter);

        },
        onOrder : function (){
            this.onNext();
        },
        onDelete : function (oEvent){
            // Step 1 :- Need to Konw the object of the item on which delete was pressed
            var oListitem = oEvent.getParameter("listItem");
            // Step 2:- Get the object of the list control
            // var oList = this.getView().byId("idList")  - Avoid Id based coding if possible
            var oList = oEvent.getSource();
            // Step 3:- Call the delete item for list and paass the object which need to be deleted
            oList.removeItem(oListitem);
        },
        onItemSelect: function (oEvent){
            // Step 1: Get the selected item from the list
            var oSelectedItem = oEvent.getParameter("listItem");
            // Step 2: - Get the path of the item which was selected
            var sPath = oSelectedItem.getBindingContextPath();
            // // Step 3: - Get the object of view2
            //     // Step 3.a: - Get the SplitApp object
            //     var oSplitApp = this.getView().getParent().getParent();
            //     // Step 3.b : - Get the view2 object from by refering the SplitApp object
            //     var oview2 = oSplitApp.getDetailPages()[0];

            // // Step 4:- Bind the whole of second view with the selected item
            // oview2.bindElement(sPath);


            // for Eg, sPath = ---/fruits/2
            // Split this "sPath" by '/' and get the last index number
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];


            this.onNext(sIndex);
        },
        onDeleteMulti : function () {
            // Step 1 :- Get the list Object
            var oList = this.getView().byId("idList");
            // Step 2 :- Get all selected Items
            var allItems = oList.getSelectedItems();
            // Step 3 :- Loop every item and delete one by one
            for (let i = 0; i < allItems.length; i++) {
                const element = allItems[i];
                oList.removeItem(element);
                
            }
        }
    });
    
}); 