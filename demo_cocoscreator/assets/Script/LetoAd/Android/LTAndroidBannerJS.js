var classJavaName = "com/leto/ad/cocosjs/LTBannerJSBridge";
var LTAndroidBannerJS = LTAndroidBannerJS || {
  
    loadBanner : function (adId, settings) {
        cc.log("Android-loadBanner:" + settings);
		jsb.reflection.callStaticMethod(classJavaName, "load", "(I)V", adId);
    },

    setAdListener : function (listener) {
        cc.log("Android-setAdListener");
		jsb.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    hasAdReady : function (adId) {
         cc.log("Android-hasAdReady");
        return jsb.reflection.callStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);;
    },

    showAd : function(adId) {
        cc.log("Android-showAdInPosistion");
		jsb.reflection.callStaticMethod(classJavaName, "show", "(I)V", adId);
    },

    removeAd : function(adId) {
         cc.log("Android-removeAd");
		 jsb.reflection.callStaticMethod(classJavaName, "remove", "(I)V", adId);
    },

    reShowAd : function(adId) {
        cc.log("Android-reShowAd");
		jsb.reflection.callStaticMethod(classJavaName, "reshow", "(I)V", adId);
    },

    hideAd : function(adId) {
         cc.log("Android-hideAd");
		 jsb.reflection.callStaticMethod(classJavaName, "hide", "(I)V", adId);
    }
  
};

module.exports = LTAndroidBannerJS;