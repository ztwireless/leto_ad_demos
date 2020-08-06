var LTiOSInterstitialJS = require("./iOS/LTiOSInterstitialJS");
var LTAndroidInterstitialJS = require("./Android/LTAndroidInterstitialJS");

var initPlatformBridge = function() {  
    if (cc.sys.os === cc.sys.OS_IOS) {           
        return LTiOSInterstitialJS;
    } else if (cc.sys.os === cc.sys.OS_ANDROID) {
        return LTAndroidInterstitialJS;
    }
};

var platformBridge = initPlatformBridge();

var LTInterstitialSDK = LTInterstitialSDK || {


    LTInterstitialListener : {
        developerCallback : null,

        onInterstitialAdLoaded : function (adId) {
            if(this.developerCallback != null && this.developerCallback.onInterstitialAdLoaded != null && undefined != this.developerCallback.onInterstitialAdLoaded) {
                this.developerCallback.onInterstitialAdLoaded(adId);
            }
        },

        onInterstitialAdLoadFail : function(adId, errorInfo) {
          if(this.developerCallback != null && this.developerCallback.onInterstitialAdLoadFail != null && undefined != this.developerCallback.onInterstitialAdLoadFail) {
                this.developerCallback.onInterstitialAdLoadFail(adId, errorInfo);
            }
        },

        onInterstitialAdShow : function(adId, callbackInfo) {
           if(this.developerCallback != null && this.developerCallback.onInterstitialAdShow != null && undefined != this.developerCallback.onInterstitialAdShow) {
                this.developerCallback.onInterstitialAdShow(adId, callbackInfo);
            }
        },

        onInterstitialAdClose : function(adId, callbackInfo) {
            if(this.developerCallback != null && this.developerCallback.onInterstitialAdClose != null && undefined != this.developerCallback.onInterstitialAdClose) {
                this.developerCallback.onInterstitialAdClose(adId, callbackInfo);
            }
            LTJSSDK.printLog(`onInterstitialAdClose, auto destroy for ${adId}`)
            LTInterstitialJSSDK.destroy(adId)
        }
    },
    
    loadInterstitial : function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
            platformBridge.loadInterstitial(adId);
        } else {
            cc.log("You must run on Android or iOS.");
        }
    },

    setAdListener : function(listener) {
        var eventJSON = {};
        eventJSON[LoadedCallbackKey]="LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdLoaded",
        eventJSON[LoadFailCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdLoadFail",
        eventJSON[CloseCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdClose",
        eventJSON[ShowCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdShow"

        if (undefined != platformBridge && platformBridge != null) {
             platformBridge.setAdListener(JSON.stringify(eventJSON));
        } else {
            cc.log("You must run on Android or iOS.");
        }

        this.LTInterstitialListener.developerCallback = listener;
    },

    hasAdReady : function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
            return platformBridge.hasAdReady(adId);
        } else {
            cc.log("You must run on Android or iOS.");
        }
        return false;
    },

    showAd : function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
           platformBridge.showAd(adId);
        } else {
            cc.log("You must run on Android or iOS.");
        }
    },

    destroy: function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
           platformBridge.destroy(adId);
        } else {
            cc.log("You must run on Android or iOS.");
        }
    },
};

const LoadedCallbackKey = "InterstitialLoaded";
const LoadFailCallbackKey = "InterstitialLoadFail";
const CloseCallbackKey = "InterstitialClose";
const ShowCallbackKey = "InterstitialAdShow";

window.LTInterstitialJSSDK = LTInterstitialSDK;