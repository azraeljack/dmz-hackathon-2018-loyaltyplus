const frameModule = require("tns-core-modules/ui/frame");
var insomnia = require("nativescript-insomnia");
var orientationModule = require("nativescript-screen-orientation");
const app = require("tns-core-modules/application")
const globalVars = require("../../globalVars");
var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;

var page;
exports.pageLoaded = function (args) {

    page = args.object;

    orientationModule.setCurrentOrientation("portrait");

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


    insomnia.keepAwake();
}

exports.scanQrCodeClicked = function () {
    /*frameModule.topmost().navigate({
        moduleName: globalVars.navigation.createPassword,
        context: {
            execute: globalVars.execute.newWallet
        },
        animated: true,
        transition: globalVars.transitions.slideLeft
    })*/


    var barcodescanner = new BarcodeScanner();
    
    barcodescanner.scan({
        formats: "QR_CODE,PDF_417",   // Pass in of you want to restrict scanning to certain types
        cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        showFlipCameraButton: false,   // default false
        preferFrontCamera: false,     // default false
        showTorchButton: true,        // default false
        beepOnScan: true,             // Play or Suppress beep on scan (default true)
        torchOn: false,               // launch with the flashlight on (default false)
        closeCallback: function () { /* console.log("Scanner closed");*/ return; }, // invoked when the scanner was closed (success or abort)
        resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        orientation: "portrait",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
    }).then(
        function (result) {
            // console.log("Scan format: " + result.format);
            // console.log("Scan text:   " + result.text);

            console.log(result.text)
            frameModule.topmost().navigate({
                moduleName:globalVars.navigation.claimPoints,
                animated:true,
                transition:globalVars.transitions.slideLeft,
                context:{info:result.text}
            })
             },
        function (error) {
            //console.log("No scan: " + error);
            dialogs.alert({ title: globalVars.messageObjects.error, message: "The address could not be scanned. Kindly try again.", okButtonText: globalVars.messageObjects.Ok })

        }
    );
    //console.log("lksjdflksjdflkj")
}

exports.addPointsManuallyClicked = function() {
    frameModule.topmost().navigate({
        moduleName: globalVars.navigation.dashboard,
        animated: true,
        transition: globalVars.transitions.slideRight
    })
}

exports.backClicked = function(){
    frameModule.topmost().navigate({
        moduleName: globalVars.navigation.dashboard,
        animated: true,
        transition: globalVars.transitions.slideRight
    })
}