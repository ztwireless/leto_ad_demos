require("./LTJSSDK")

cc.Class({
    extends: cc.Component,

    adId: function() {
        return 1;
    },

    // use this for initialization
    onLoad: function () {
       LTBannerJSSDK.setAdListener(this);
    },

    // called every frame
    update: function (dt) {

    },

    back: function () {
        cc.director.loadScene("LetoDemoScene");
    },

    loadAd : function () {
        LTJSSDK.printLog("LetoAdBannerDemo::loadAd(" + this.adId() + ")");
        LTBannerJSSDK.loadBanner(this.adId());
    },

    showAd : function () {
         LTBannerJSSDK.showAd(this.adId());
    },

    removeAd : function () {
        LTBannerJSSDK.removeAd(this.adId());
    },

    reShowAd : function () {
        LTBannerJSSDK.reShowAd(this.adId());
    },

    hideAd : function() {
        LTBannerJSSDK.hideAd(this.adId());
    },

    checkReady : function () {
        var hasReady = LTBannerJSSDK.hasAdReady(this.adId());
        LTJSSDK.printLog("LetoAdBannerDemo::checkReady() " + (hasReady ? "Ready" : "NO"));
    },

    onBannerAdLoaded : function (adId) {
         LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdLoaded(" + adId + ")");
    },

    onBannerAdLoadFail : function(adId, errorInfo) {
        LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdLoadFail(" + adId + ", " + errorInfo + ")");   
    }
});
