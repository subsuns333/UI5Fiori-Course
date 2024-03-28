sap.ui.define([
    'sap/ui/core/UIComponent'
    
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("com.cap.auto.Component",{
        metadata: {
            //  links Component.js to its companion manifest.json
            manifest: "json"
        },
        init : function(){
            //  like constructor of This class 
            // We are  going to call the 'init' function of parent class 'sap.ui.core.UIComponent' in to this child class
            UIComponent.prototype.init.apply(this);

            // Step 1:- Call the Standard function "getRouter()". (it is avlailable in the parent calss "UIComponent")
            var oRuter = this.getRouter();
            // debugger
            // Step 2 :- Initialize router
            oRuter.initialize();

        },
        // createContent: function(){
        //     // We will create UI5 app Structue
        //     //  Main Function to initialize root views and Objects 

        //     var oView =new sap.ui.view({
        //         viewName: "com.cap.auto.view.App",
        //         type:"XML"
        //     });

        //     // get the object of the Container control (App) whic is inside the App view
        //     var oAppCon = oView.byId("appCon");

        //     //  crearte 2 views and place it insie the App Container Controll
        //     // view 1
        //     var oView1 = new sap.ui.view({
        //         viewName : "com.cap.auto.view.View1",
        //         type: "XML",
        //         id: "idView1"
        //     });
        //     // view 2 
        //     var oView2 = new sap.ui.view({
        //         viewName : "com.cap.auto.view.View2",
        //         type: "XML",
        //         id: "idView2"
        //     });

        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);


        //     return oView;

        // },
        destroy: function(){
            //  Clean up code

        }


    });
    
});