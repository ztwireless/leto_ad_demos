var classJavaName = "com/leto/ad/js/LTRewardedVideoJSBridge";
var LTAndroidRewardedVideoJS = LTAndroidRewardedVideoJS || {
  
    loadRewardedVideo : function (adId) {
        cc.log("LTAndroidRewardedVideoJS-loadRewardedVideo");
		jsb.reflection.callStaticMethod(classJavaName, "load", "(I)V", adId);
    },

    setAdListener : function (listener) {
        cc.log("LTAndroidRewardedVideoJS-setAdListener");
		jsb.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    hasAdReady : function (adId) {
        cc.log("LTAndroidRewardedVideoJS-hasAdReady");
        return jsb.reflection.callStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);
    },

    showAd: function(adId) {
        cc.log("LTAndroidRewardedVideoJS-showAd:" + adId);
		jsb.reflection.callStaticMethod(classJavaName, "show", "(I)V", adId);
    },

    destroy: function(adId) {
        cc.log("LTAndroidRewardedVideoJS-destroy:" + adId);
        jsb.reflection.callStaticMethod(classJavaName, "destroy", "(I)V", adId);
    }
};

module.exports = LTAndroidRewardedVideoJS;