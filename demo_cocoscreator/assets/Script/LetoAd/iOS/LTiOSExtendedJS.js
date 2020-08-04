var LTiOSJS = require("LTiOSJS");
const OC_RV_WRAPPER_CLASS = "LTExtendedWrapper";
var LTiOSExtendedJS = LTiOSExtendedJS || {
    load : function (adId, params) {
        if(typeof params == 'object') {
            params = JSON.stringify(params)
        }
        LTiOSJS.printJsLog("LTiOSExtendedJS::load(" + adId + ")");
        jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "load:params:", adId, params);
    },

    setAdListener : function (listener) {
        LTiOSJS.printJsLog("LTiOSExtendedJS::setAdListener(" + listener + ")");
        jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
    },

    show: function(adId, params) {
        if(typeof params == 'object') {
            params = JSON.stringify(params)
        }
        LTiOSJS.printJsLog("LTiOSExtendedJS::show(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "show:params:", adId, params);
    },

    destroy: function(adId) {
        LTiOSJS.printJsLog("LTiOSExtendedJS::destroy(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "destroy:", adId);
    },

    updateMyCoin: function(adId) {
        LTiOSJS.printJsLog("LTiOSExtendedJS::updateMyCoin(" + adId + ")");
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "updateMyCoin:", adId);
    },

    updateTitle: function(adId, title) {
        cc.log("LTiOSExtendedJS::updateTitle:" + adId);
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "updateTitle:forId:", title, adId);
    },

    updateVideoButtonTitle: function(adId, title) {
        cc.log("LTiOSExtendedJS::updateVideoButtonTitle:" + adId);
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "updateVideoButtonTitle:forId:", title, adId);
    },

    notify: function(adId, action) {
        cc.log("LTiOSExtendedJS::notify:" + adId);
        return jsb.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "notify:forId:", action, adId);
    }
};

module.exports = LTiOSExtendedJS;
