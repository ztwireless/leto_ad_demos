(function() {
    const LTiOSJS = require("LTiOSJS");
    const OC_WRAPPER_CLASS = "LTInterstitialAdWrapper";
    let LTiOSInterstitialJS = LTiOSInterstitialJS || {
        loadInterstitial : function (adId) {
            LTiOSJS.printJsLog("LTiOSInterstitialJS::loadInterstitial(" + adId + ")");
            jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "loadInterstitia:", adId);
        },

        setAdListener : function (listener) {
            LTiOSJS.printJsLog("LTiOSInterstitialJS::setAdListener(" + listener + ")");
            jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
        },

        hasAdReady : function (adId) {
            LTiOSJS.printJsLog("LTiOSInterstitialJS::hasAdReady(" + adId + ")");
            return jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "interstitialReady:", adId);
        },

        showAd : function(adId) {
            LTiOSJS.printJsLog("LTiOSInterstitialJS::showAd(" + adId + ")");
            return jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "show:", adId);
        },

        destroy: function(adId) {
            LTiOSJS.printJsLog("LTiOSInterstitialJS::destroy(" + adId + ")");
            return jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "destroy:", adId);
        }  
    };

    module.exports = LTiOSInterstitialJS;
})();