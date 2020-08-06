var LTiOSJS = require("LTiOSJS");
const OC_WRAPPER_CLASS = "LTBannerAdWrapper";
var LTiOSBannerJS = LTiOSBannerJS || {
    loadBanner: function(adId, extra) {
        LTiOSJS.printJsLog("LTiOSBannerJS::loadBanner(" + adId);
        jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "loadBanner:", adId);
    },

    setAdListener : function (listener) {
        LTiOSJS.printJsLog("LTiOSBannerJS::setAdListener(" + listener + ")");
        jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
    },
  
    hasAdReady : function(adId) {
        LTiOSJS.printJsLog("LTiOSBannerJS::hasAdReady(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "bannerReady:", adId);
    },

    showAd : function(adId) { 
        LTiOSJS.printJsLog("LTiOSBannerJS::showAd(" + adId + ", " + position + ")");
        jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "show:", adId);
    },

    removeAd : function(adId) {
        LTiOSJS.printJsLog("LTiOSBannerJS::removeAd(" + adId + ")");
        jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "removeAd:", adId);
    },

    reShowAd : function(adId) {
        LTiOSJS.printJsLog("LTiOSBannerJS::reShowAd(" + adId + ")");
        jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "reShowAd:", adId);
    },

    hideAd : function(adId) {
        LTiOSJS.printJsLog("LTiOSBannerJS::hideAd(" + adId + ")");
        jsb.reflection.callStaticMethod(OC_WRAPPER_CLASS, "hideAd:", adId);
    }
};

module.exports = LTiOSBannerJS;
