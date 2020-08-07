(function() {
    const LTAndroidBannerJS = require("./Android/LTAndroidBannerJS");
    const LTiOSBannerJS = require("./iOS/LTiOSBannerJS");

    let initPlatformBridge = function() {  
        if (cc.sys.os === cc.sys.OS_IOS) {           
            return LTiOSBannerJS;
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            return LTAndroidBannerJS;
        }
    };

    let platformBridge = initPlatformBridge();

    let LTBannerSDK = LTBannerSDK || {
        LTBannerListener : {
            developerCallback : null,

            onBannerAdLoaded : function (adId) {
                if(this.developerCallback != null && this.developerCallback.onBannerAdLoaded != null && undefined != this.developerCallback.onBannerAdLoaded) {
                    this.developerCallback.onBannerAdLoaded(adId);
                }
            },

            onBannerAdLoadFail : function(adId, errorInfo) {
              if(this.developerCallback != null && this.developerCallback.onBannerAdLoadFail != null && undefined != this.developerCallback.onBannerAdLoadFail) {
                    this.developerCallback.onBannerAdLoadFail(adId, errorInfo);
                }
            },
        },
        
        loadBanner : function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.loadBanner(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        setAdListener : function(listener) {
            let eventJSON = {};
            eventJSON[LoadedCallbackKey]= "LTBannerJSSDK.LTBannerListener.onBannerAdLoaded",
            eventJSON[LoadFailCallbackKey]=  "LTBannerJSSDK.LTBannerListener.onBannerAdLoadFail"
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.setAdListener(JSON.stringify(eventJSON));
            } else {
                cc.log("You must run on Android or iOS.");
            }

            this.LTBannerListener.developerCallback = listener;
        },

        hasAdReady : function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
                return platformBridge.hasAdReady(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
            return false;
        },

        showAd: function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.showAd(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        removeAd : function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.removeAd(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        reShowAd : function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.reShowAd(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        hideAd : function(adId) {
            if (undefined != platformBridge && platformBridge != null) {
               platformBridge.hideAd(adId);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },
    };

    const LoadedCallbackKey = "BannerLoaded";
    const LoadFailCallbackKey = "BannerLoadFail";

    window.LTBannerJSSDK = LTBannerSDK;
})();