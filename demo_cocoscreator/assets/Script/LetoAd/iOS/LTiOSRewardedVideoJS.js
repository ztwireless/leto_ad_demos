var LTiOSJS = require("LTiOSJS");
const OC_RV_WRAPPER_CLASS = "LTRewardedVideoWrapper";
var LTiOSRewardedVideoJS = LTiOSRewardedVideoJS || {
    loadRewardedVideo : function (adId) {
        LTiOSJS.printJsLog("LTiOSRewardedVideoJS::loadRewardedVideo(" + adId + ")");
        jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "loadRewardedVideo:", adId);
    },

    setAdListener : function (listener) {
        LTiOSJS.printJsLog("LTiOSRewardedVideoJS::setAdListener(" + listener + ")");
        jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
    },

    hasAdReady : function (adId) {
        LTiOSJS.printJsLog("LTiOSRewardedVideoJS::hasAdReady(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "rewardedVideoReady:", adId);
    },

    showAd : function(adId) {
        LTiOSJS.printJsLog("LTiOSRewardedVideoJS::showAd(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "show:", adId);
    }
};

module.exports = LTiOSRewardedVideoJS;
