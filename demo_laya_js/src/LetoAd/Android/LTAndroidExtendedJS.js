var classJavaName = "com/leto/ad/js/LTExtendedJSBridge";
var LTAndroidExtendedJS = LTAndroidExtendedJS || {
    load : function (adId, params) {
        if(typeof params == 'object') {
            params = JSON.stringify(params)
        }
        cc.log("LTAndroidExtendedJS-load:" + params);
        jsb.reflection.callStaticMethod(classJavaName, "load", "(ILjava/lang/String;)V", adId, params);
    },

    setAdListener : function (listener) {
        cc.log("LTAndroidExtendedJS-setAdListener");
        jsb.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    show: function(adId, params) {
        if(typeof params == 'object') {
            params = JSON.stringify(params)
        }
        cc.log("LTAndroidExtendedJS-show:" + params);
        jsb.reflection.callStaticMethod(classJavaName, "show", "(ILjava/lang/String;)V", adId, params);
    },

    destroy: function(adId) {
        cc.log("LTAndroidExtendedJS-destroy:" + adId);
        jsb.reflection.callStaticMethod(classJavaName, "destroy", "(I)V", adId);
    },

    updateMyCoin: function(adId) {
        cc.log("LTAndroidExtendedJS-updateMyCoin:" + adId);
        jsb.reflection.callStaticMethod(classJavaName, "updateMyCoin", "(I)V", adId);
    },

    updateTitle: function(adId, title) {
        cc.log("LTAndroidExtendedJS-updateTitle:" + adId);
        jsb.reflection.callStaticMethod(classJavaName, "updateTitle", "(ILjava/lang/String;)V", adId, title);
    },

    updateVideoButtonTitle: function(adId, title) {
        cc.log("LTAndroidExtendedJS-updateVideoButtonTitle:" + adId);
        jsb.reflection.callStaticMethod(classJavaName, "updateVideoButtonTitle", "(ILjava/lang/String;)V", adId, title);
    },

    notify: function(adId, action) {
        cc.log("LTAndroidExtendedJS-notify:" + adId);
        jsb.reflection.callStaticMethod(classJavaName, "notify", "(II)V", adId, action);
    }
};

module.exports = LTAndroidExtendedJS;