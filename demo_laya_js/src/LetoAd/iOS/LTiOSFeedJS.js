var LTiOSJS = require("LTiOSJS");
const OC_RV_WRAPPER_CLASS = "LTFeedWrapper";
var LTiOSFeedJS = LTiOSFeedJS || {
    loadFeed : function (adId, params) {
        LTiOSJS.printJsLog("LTiOSFeedJS::loadFeed(" + adId + ")");
        jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "loadFeed:params:", adId, params);
    },

    setAdListener : function (listener) {
        LTiOSJS.printJsLog("LTiOSFeedJS::setAdListener(" + listener + ")");
        jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
    },

    hasAdReady : function (adId) {
        LTiOSJS.printJsLog("LTiOSFeedJS::hasAdReady(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "feedReady:", adId);
    },

    show: function(adId) {
        LTiOSJS.printJsLog("LTiOSFeedJS::show(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "show:", adId);
    },

    hide: function(adId) {
        LTiOSJS.printJsLog("LTiOSFeedJS::hide(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "hide:", adId);
    },

    destroy: function(adId) {
        LTiOSJS.printJsLog("LTiOSFeedJS::destroy(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "destroy:", adId);
    }
};

module.exports = LTiOSFeedJS;
