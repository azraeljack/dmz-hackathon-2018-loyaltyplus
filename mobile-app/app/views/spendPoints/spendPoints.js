const frameModule = require("tns-core-modules/ui/frame");
const dialogs = require("tns-core-modules/ui/dialogs");
const clipboard = require("nativescript-clipboard")
const globalFuncs = require("../../globalFuncs")
const globalVars = require("../../globalVars")
const app = require("tns-core-modules/application")
var ZXing = require('nativescript-zxing');
var imageSource = require("tns-core-modules/image-source")

var page;

exports.pageLoaded = function (args) {
    page = args.object;


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

            frameModule.topmost().navigate({
                moduleName: globalVars.navigation.dashboard,
                animated: true,
                transition: globalVars.transitions.slideRight
            })
        }
    }

    let rAddress = "dhfoeh24hfmoeh33dhfu4olnukdi";
    page.getViewById('myReceiveAddress').text = rAddress;

    var zx = new ZXing();
    var qrimg = zx.createBarcode({encode: rAddress, height: 200, width: 200, format: ZXing.QR_CODE});
    
    page.getViewById("img").imageSource = imageSource.fromNativeSource(qrimg)
    let b = globalFuncs.getTotalBalance()
    page.getViewById("currentBalanceLabel").text = "Current Balance  : "+b.toFixed(0);

};


exports.backClicked = function () {

    frameModule.topmost().navigate({
        moduleName: globalVars.navigation.dashboard,
        animated: true,
        transition: globalVars.transitions.slideRight
    })
}

