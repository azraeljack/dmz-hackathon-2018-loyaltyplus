const frameModule = require("tns-core-modules/ui/frame");
const dialogs = require("tns-core-modules/ui/dialogs");
const app = require("tns-core-modules/application")
const globalVars = require("../../globalVars")
var orientationModule = require("nativescript-screen-orientation");
var insomnia = require("nativescript-insomnia");
var orientationModule = require("nativescript-screen-orientation");
var globalFuncs = require("../../globalFuncs")


var page;


exports.pageLoaded = function (args) {

    //this must be called 


    page = args.object;
    let b = globalFuncs.getTotalBalance()
    page.getViewById("currentBalanceLabel").text = "Current Balance  : "+b.toFixed(0);
    orientationModule.setCurrentOrientation("portrait");
    insomnia.keepAwake();
    if (page.ios) {

        //use this long method to hide the back link
        frameModule.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);

    }
    else if (page.android) {
        //do android specific stuff here

  

        let activity = app.android.startActivity ||
            app.android.foregroundActivity ||
            frameModule.topmost().android.currentActivity ||
            frameModule.topmost().android.activity

        //This is how android back button can be overriden
        activity.onBackPressed = function () {

            dialogs.confirm({ title: globalVars.messageObjects.exit, message: globalVars.messageObjects.exitSure, okButtonText: globalVars.messageObjects.yes, cancelButtonText: globalVars.messageObjects.no }).then((res) => {
                if (res) {
                    //exit
                   // walletManager.exit();
                }
            })
        }
    }

  
};

exports.addPointsClicked = function(){
    frameModule.topmost().navigate({
        moduleName:globalVars.navigation.addPoints,
        animated:true,
        transition:globalVars.transitions.slideLeft
    })
}

exports.spendPointsClicked = function(){
    frameModule.topmost().navigate({
        moduleName:globalVars.navigation.spendPoints,
        animated:true,
        transition:globalVars.transitions.slideLeft
    })
}

exports.exitClicked = function () {
    //finish all the exit stuff here    
    globalFuncs.exit();
}


