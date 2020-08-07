(function() {
    const classJavaName = "com/leto/ad/js/LTFeedJSBridge";
    let LTAndroidFeedJS = LTAndroidFeedJS || {
        loadFeed : function (adId, params) {
            cc.log("LTAndroidFeedJS-loadFeed");
            jsb.reflection.callStaticMethod(classJavaName, "load", "(ILjava/lang/String;)V", adId, params);
        },

        setAdListener : function (listener) {
            cc.log("LTAndroidFeedJS-setAdListener");
            jsb.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
        },

        hasAdReady : function (adId) {
            cc.log("LTAndroidFeedJS-hasAdReady");
            return jsb.reflection.callStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);
        },

        show: function(adId) {
            cc.log("LTAndroidFeedJS-show:" + adId);
            jsb.reflection.callStaticMethod(classJavaName, "show", "(I)V", adId);
        },

        hide: function(adId) {
            cc.log("LTAndroidFeedJS-showAd:" + adId);
            jsb.reflection.callStaticMethod(classJavaName, "hide", "(I)V", adId);
        },

        destroy: function(adId) {
            cc.log("LTAndroidFeedJS-destroy:" + adId);
            jsb.reflection.callStaticMethod(classJavaName, "destroy", "(I)V", adId);
        }
    };

    module.exports = LTAndroidFeedJS;
})();
