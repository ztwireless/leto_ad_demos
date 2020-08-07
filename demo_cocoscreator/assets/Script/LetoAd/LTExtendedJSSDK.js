(function() {
    const LTAndroidExtendedJS = require("./Android/LTAndroidExtendedJS");
    const LTiOSExtendedJS = require("./iOS/LTiOSExtendedJS");

    let initPlatformBridge = function() {  
        if (cc.sys.os === cc.sys.OS_IOS) {           
            return LTiOSExtendedJS;
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            return LTAndroidExtendedJS;
        }
    };

    let platformBridge = initPlatformBridge();


    let LTExtendedSDK = LTExtendedSDK || {
        LTExtendedListener : {
            developerCallback : null,

            onExtendedAdLoaded : function (adId) {
                LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdLoaded(" + adId + ")");
                if(this.developerCallback != null && this.developerCallback.onExtendedAdLoaded != null && undefined != this.developerCallback.onExtendedAdLoaded) {
                    this.developerCallback.onExtendedAdLoaded(adId);
                }
            },
            onExtendedAdFailed : function(adId, errorInfo) {
                LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdFailed(" + adId + ", " + errorInfo + ")");
                if(this.developerCallback != null && this.developerCallback.onExtendedAdFailed != null && undefined != this.developerCallback.onExtendedAdFailed) {
                    this.developerCallback.onExtendedAdFailed(adId, errorInfo);
                }
            },
            onExtendedAdClose : function(adId, res) {
                LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdClose(" + adId + ", " + JSON.stringify(res) + ")");
                if(this.developerCallback != null && this.developerCallback.onExtendedAdClose != null && undefined != this.developerCallback.onExtendedAdClose) {
                    this.developerCallback.onExtendedAdClose(adId, res);
                }
                LTExtendedJSSDK.destroy(adId)
            },
            onExtendedAdCustomClose : function(adId, res) {
                LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdCustomClose(" + adId + ", " + JSON.stringify(res) + ")");
                if(this.developerCallback != null && this.developerCallback.onExtendedAdCustomClose != null && undefined != this.developerCallback.onExtendedAdCustomClose) {
                    this.developerCallback.onExtendedAdCustomClose(adId, res);
                }
            },
            onExtendedAdVideoClose : function(adId, res) {
                LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdVideoClose(" + adId + ", " + JSON.stringify(res) + ")");
                if(this.developerCallback != null && this.developerCallback.onExtendedAdVideoClose != null && undefined != this.developerCallback.onExtendedAdVideoClose) {
                    this.developerCallback.onExtendedAdVideoClose(adId, res);
                }
            },
            onExtendedAdNormalClaim : function(adId) {
                LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdNormalClaim(" + adId + ")");
                if(this.developerCallback != null && this.developerCallback.onExtendedAdNormalClaim != null && undefined != this.developerCallback.onExtendedAdNormalClaim) {
                    this.developerCallback.onExtendedAdNormalClaim(adId);
                }
            }
        },

        setAdListener : function(listener) {
            let eventJSON = {};
            eventJSON[LoadedCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdLoaded"
            eventJSON[FailedCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdFailed"
            eventJSON[CloseCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdClose"
            eventJSON[CustomCloseCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdCustomClose"
            eventJSON[VideoCloseCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdVideoClose"
            eventJSON[NormalClaimCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdNormalClaim"

            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.setAdListener(JSON.stringify(eventJSON));
            } else {
                cc.log("You must run on Android or iOS.");
            }

            this.LTExtendedListener.developerCallback = listener;
        },

        show: function(adId, params) {
            if (undefined != platformBridge && platformBridge != null) {
               params = params || {}
               platformBridge.show(adId, params);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        load: function(adId, params) {
            if (undefined != platformBridge && platformBridge != null) {
               params = params || {}
               platformBridge.load(adId, params);
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

        updateMyCoin: function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.updateMyCoin(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        updateTitle: function(adId, title) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.updateTitle(adId, title);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        updateVideoButtonTitle: function(adId, title) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.updateVideoButtonTitle(adId, title);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        notify: function(adId, action) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.notify(adId, action);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        }
    };

    const LoadedCallbackKey = "ExtendedLoaded";
    const FailedCallbackKey = "ExtendedFailed";
    const CloseCallbackKey = "ExtendedClose";
    const CustomCloseCallbackKey = "ExtendedCustomClose";
    const VideoCloseCallbackKey = "ExtendedVideoClose";
    const NormalClaimCallbackKey = "ExtendedNormalClaim";

    window.LTExtendedJSSDK = LTExtendedSDK;
})();