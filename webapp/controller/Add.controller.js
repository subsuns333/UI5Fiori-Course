sap.ui.define([
    'com/cap/auto/controller/BaseController',
    'sap/ui/model/json/JSONModel'
    
], function(BaseController, JSONModel) {
    'use strict';
    return BaseController.extend("com.cap.auto.controller.Add",{
        onInt:function (){
            //create a local json model which will hold the payload
            // of the data which we need to send to bankend sap system
            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({
                prodData: {
                    "PRODUCT_ID" : "",
                    "TYPE_CODE" : "PR",
                    "CATEGORY" : "Notebooks",
                    "NAME" : ""
                }
            })           
        }
    });
    
});