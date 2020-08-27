require("./LTJSSDK");

cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        LTRewardedVideoJSSDK.setAdListener(this);
    },

    adId: function() {
        return 1;
    },

    // called every frame
    update: function (dt) {

    },

    back: function () {
        cc.director.loadScene("LetoDemoScene");
    },

    loadAd: function () {
        LTRewardedVideoJSSDK.load(this.adId());
    },

    showAd: function () {
        LTRewardedVideoJSSDK.show(this.adId());
    },

    checkReady : function () {
        LTJSSDK.printLog("LetoRewardedVideoDemo::checkReady()   " + (LTRewardedVideoJSSDK.hasAdReady(this.adId()) ? "Ready" : "No"));
    },

    //Callbacks
    onRewardedVideoAdLoaded:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onRewardedVideoAdFailed : function(adId, errMsg) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdFailed(${adId}, ${errMsg})`);
    },

    onRewardedVideoAdClosed : function(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdClosed(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onReward : function(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onReward(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onRewardedVideoAdShow:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onRewardedVideoAdClick:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    }
});
