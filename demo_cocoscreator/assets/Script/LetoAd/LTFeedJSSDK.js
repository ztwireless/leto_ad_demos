
var LTAndroidFeedJS = require("./Android/LTAndroidFeedJS");
var LTiOSFeedJS = require("./iOS/LTiOSFeedJS");

var initPlatformBridge = function() {  
    if (cc.sys.os === cc.sys.OS_IOS) {           
        return LTiOSFeedJS;
    } else if (cc.sys.os === cc.sys.OS_ANDROID) {
        return LTAndroidFeedJS;
    }
};

var platformBridge = initPlatformBridge();


var LTFeedSDK = LTFeedSDK || {
    LTFeedListener : {
        developerCallback : null,

        onFeedAdLoaded : function (adId) {
            LTJSSDK.printLog("LTFeedJSSDK.LTFeedListener.onFeedAdLoaded(" + adId + ")");
            if(this.developerCallback != null && this.developerCallback.onFeedAdLoaded != null && undefined != this.developerCallback.onFeedAdLoaded) {
                this.developerCallback.onFeedAdLoaded(adId);
            }
        },
        onFeedAdFailed : function(adId, errorInfo) {
            LTJSSDK.printLog("LTFeedJSSDK.LTFeedListener.onFeedAdFailed(" + adId + ", " + errorInfo + ")");
          if(this.developerCallback != null && this.developerCallback.onFeedAdFailed != null && undefined != this.developerCallback.onFeedAdFailed) {
                this.developerCallback.onFeedAdFailed(adId, errorInfo);
            }
        }
    },
    
    loadFeed : function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
            platformBridge.loadFeed(adId);
        } else {
            cc.log("You must run on Android or iOS.");
        }
    },

    setAdListener : function(listener) {
        var eventJSON = {};
        eventJSON[LoadedCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdLoaded",
        eventJSON[FailedCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdFailed"

        if (undefined != platformBridge && platformBridge != null) {
            platformBridge.setAdListener(JSON.stringify(eventJSON));
        } else {
            cc.log("You must run on Android or iOS.");
        }

        this.LTFeedListener.developerCallback = listener;
    },

    hasAdReady : function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
            return platformBridge.hasAdReady(adId);
        } else {
            cc.log("You must run on Android or iOS.");
        }
        return false;
    },

    show: function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
           platformBridge.show(adId);
        } else {
            cc.log("You must run on Android or iOS.");
        }
    },

    hide: function(adId) {
        if (undefined != platformBridge && platformBridge != null) {
           platformBridge.hide(adId);
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
    }
};

const LoadedCallbackKey = "FeedLoaded";
const FailedCallbackKey = "FeedFailed";


window.LTFeedJSSDK = LTFeedSDK;