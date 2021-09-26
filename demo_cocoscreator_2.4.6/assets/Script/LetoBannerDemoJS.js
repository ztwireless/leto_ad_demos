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

    onBannerAdLoaded : function (adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onBannerAdLoadFail : function(adId, errMsg) {
        LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdLoadFail(" + adId + ", " + errMsg + ")");   
    },

    onBannerAdClick : function (adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onBannerAdShow : function (adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onBannerAdHide : function (adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdHide(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onBannerAdClose : function (adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdClose(${adId}, ${JSON.stringify(adInfo)})`);
    }
});
