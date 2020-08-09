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
    onRewardedVideoAdLoaded:function(adId) {
        LTJSSDK.printLog("LetoRewardedVideoDemo::onRewardedVideoAdLoaded(" + adId + ")");
    },

    onRewardedVideoAdFailed : function(adId, errorInfo) {
      LTJSSDK.printLog("LetoRewardedVideoDemo::onRewardedVideoAdFailed(" + adId + ", " + errorInfo + ")");
    },

    onRewardedVideoAdClosed : function(adId, callbackInfo) {
        LTJSSDK.printLog("LetoRewardedVideoDemo::onRewardedVideoAdClosed(" + adId + ", " + callbackInfo + ")");
    },

    onReward : function(adId, callbackInfo) {
        LTJSSDK.printLog("LetoRewardedVideoDemo::onReward(" + adId + ", " + callbackInfo + ")");
    }
});
