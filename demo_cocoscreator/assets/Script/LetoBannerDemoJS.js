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
        LTBannerJSSDK.load(this.adId());
    },

    showAd : function () {
         LTBannerJSSDK.show(this.adId());
    },

    removeAd : function () {
        LTBannerJSSDK.remove(this.adId());
    },

    reShowAd : function () {
        LTBannerJSSDK.reShow(this.adId());
    },

    hideAd : function() {
        LTBannerJSSDK.hide(this.adId());
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
    },

    onBannerAdClick : function (adId) {
        LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdClick(" + adId + ")");
    },

    onBannerAdShow : function (adId) {
        LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdShow(" + adId + ")");
    },

    onBannerAdHide : function (adId) {
        LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdHide(" + adId + ")");
    },

    onBannerAdClose : function (adId) {
        LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdClose(" + adId + ")");
    }
});
