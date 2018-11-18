const frameModule = require("tns-core-modules/ui/frame");
var insomnia = require("nativescript-insomnia");
var orientationModule = require("nativescript-screen-orientation");
const app = require("tns-core-modules/application")
const globalVars = require("../../globalVars");
const dialogs = require("tns-core-modules/ui/dialogs")

var page;
exports.pageLoaded = function (args) {

    page = args.object;
    console.log(page.navigationContext);
    orientationModule.setCurrentOrientation("portrait");

    if (page.ios) {
        //use this long method to hide the back link
        //frameModule.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
    }
    else if (page.android) {
        //do android specific stuff here
        let activity = app.android.startActivity ||
            app.android.foregroundActivity ||
            frameModule.topmost().android.currentActivity ||
            frameModule.topmost().android.activity

        //This is how android back button can be overriden
        activity.onBackPressed = function () {
            frameModule.topmost().navigate({
                moduleName: globalVars.navigation.dashboard,
                animated: true,
                transition: globalVars.transitions.slideRight
            })
        }
    }

    insomnia.keepAwake();
}

exports.claimYourPointsClicked = function () {
    /*frameModule.topmost().navigate({
        moduleName: globalVars.navigation.createPassword,
        context: {
            execute: globalVars.execute.newWallet
        },
        animated: true,
        transition: globalVars.transitions.slideLeft
    })*/

    //here, check the point status from the API and update the vallues appropriately
    dialogs.alert({title:"Congratulation",message:"You have received 10 Points of Company A. Your total points balance is 30 points.",okButtonText:"Ok"})
}

exports.backClicked = function(){
    frameModule.topmost().navigate({
        moduleName: globalVars.navigation.dashboard,
        animated: true,
        transition: globalVars.transitions.slideRight
    })
}