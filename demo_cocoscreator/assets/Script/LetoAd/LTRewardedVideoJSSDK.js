(function() {
    const LTAndroidRewardedVideoJS = require("./Android/LTAndroidRewardedVideoJS");
    const LTiOSRewardedVideoJS = require("./iOS/LTiOSRewardedVideoJS");

    let initPlatformBridge = function() {  
        if (cc.sys.os === cc.sys.OS_IOS) {           
            return LTiOSRewardedVideoJS;
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            return LTAndroidRewardedVideoJS;
        }
    };

    let platformBridge = initPlatformBridge();


    let LTRewardedVideoSDK = LTRewardedVideoSDK || {
        LTRewardedVideoListener : {
            developerCallback : null,

            onRewardedVideoAdLoaded : function (adId) {
                LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdLoaded(" + adId + ")");
                if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdLoaded != null && undefined != this.developerCallback.onRewardedVideoAdLoaded) {
                    this.developerCallback.onRewardedVideoAdLoaded(adId);
                }
            },
            onRewardedVideoAdFailed : function(adId, errorInfo) {
                LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdFailed(" + adId + ", " + errorInfo + ")");
              if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdFailed != null && undefined != this.developerCallback.onRewardedVideoAdFailed) {
                    this.developerCallback.onRewardedVideoAdFailed(adId, errorInfo);
                }
            },
            onRewardedVideoAdClosed : function(adId, callbackInfo) {
                LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdClosed(" + adId + ", " + callbackInfo + ")");
                if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdClosed != null && undefined != this.developerCallback.onRewardedVideoAdClosed) {
                    this.developerCallback.onRewardedVideoAdClosed(adId, callbackInfo);
                }
                LTRewardedVideoJSSDK.destroy(adId);
            },
            onReward : function(adId, callbackInfo) {
                LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onReward(" + adId + ", " + callbackInfo + ")");
                if(this.developerCallback != null && this.developerCallback.onReward != null && undefined != this.developerCallback.onReward) {
                    this.developerCallback.onReward(adId, callbackInfo);
                }
            }
        },
        
        loadRewardedVideo : function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.loadRewardedVideo(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        setAdListener : function(listener) {
            let eventJSON = {};
            eventJSON[LoadedCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdLoaded",
            eventJSON[LoadFailCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdFailed",
            eventJSON[CloseCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdClosed",
            eventJSON[RewardCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onReward"

            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.setAdListener(JSON.stringify(eventJSON));
            } else {
                cc.log("You must run on Android or iOS.");
            }

            this.LTRewardedVideoListener.developerCallback = listener;
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
        }
    };

    const LoadedCallbackKey = "RewardedVideoLoaded";
    const LoadFailCallbackKey = "RewardedVideoLoadFail";
    const CloseCallbackKey = "RewardedVideoClose";
    const RewardCallbackKey = "RewardedVideoReward";


    window.LTRewardedVideoJSSDK = LTRewardedVideoSDK;
})();