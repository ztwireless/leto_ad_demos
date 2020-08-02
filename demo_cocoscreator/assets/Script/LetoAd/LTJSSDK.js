
var LTAndroidJS = require("./Android/LTAndroidJS");
var LTiOSJS = require("./iOS/LTiOSJS");
var isDebugLog = false;

var initPlatformBridge = function() {  
    if (cc.sys.os === cc.sys.OS_IOS) {           
        return LTiOSJS;
    } else if (cc.sys.os === cc.sys.OS_ANDROID) {
        return LTAndroidJS;
    }
};

var platformBridge = initPlatformBridge();

var LTSDK = LTSDK || {
    initSDK: function() {
        if (undefined != platformBridge && platformBridge != null) {
            platformBridge.initSDK();
        } else {
            cc.log("You must run on Android or iOS.");
        }
    },

    setLogDebug: function (debug) {
        isDebugLog = debug;
        if (undefined != platformBridge && platformBridge != null) {
            platformBridge.setLogDebug(debug);
        } else {
            cc.log("You must run on Android or iOS.");
        }
    },

    printLog: function(msg) {
        if (undefined != msg && null != msg && isDebugLog && platformBridge != null ) {
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.printJsLog(msg); 
            } else {
                cc.log("You must run on Android or iOS.");
            }
        }
    }
};

window.LTJSSDK = LTSDK;