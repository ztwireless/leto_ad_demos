var classJavaName = "com/leto/ad/js/LTInterstitialJSBridge";
var LTAndroidInterstitialJS = LTAndroidInterstitialJS || {
    loadInterstitial : function (adId) {
        cc.log("Android-loadInterstitial");
		jsb.reflection.callStaticMethod(classJavaName, "load", "(I)V", adId);
    },

    setAdListener: function (listener) {
        cc.log("Android-setAdListener");
		jsb.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    hasAdReady: function (adId) {
         cc.log("Android-hasAdReady");
        return jsb.reflection.callStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);
    },

    showAd: function(adId) {
        cc.log("Android-showAd:" + adId);
		jsb.reflection.callStaticMethod(classJavaName, "show", "(I)V", adId);
    },

    destroy: function(adId) {
        LTJSSDK.printLog("Android-destroy:" + adId);
        jsb.reflection.callStaticMethod(classJavaName, "destroy", "(I)V", adId);
    }
};

module.exports = LTAndroidInterstitialJS;