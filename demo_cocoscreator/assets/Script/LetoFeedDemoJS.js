require("./LTJSSDK");

cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        LTFeedJSSDK.setAdListener(this);
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
        LTFeedJSSDK.load(this.adId());
    },

    showAd: function () {
        LTFeedJSSDK.show(this.adId());
    },

    hideAd: function() {
        LTFeedJSSDK.hide(this.adId());
    },

    destroyAd: function() {
        LTFeedJSSDK.destroy(this.adId())
    },

    checkReady : function () {
        LTJSSDK.printLog("LetoFeedDemo::checkReady()   " + (LTFeedJSSDK.hasAdReady(this.adId()) ? "Ready" : "No"));
    },

    //Callbacks
    onFeedAdLoaded:function(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdLoaded(" + adId + ")");
    },

    onFeedAdFailed : function(adId, errorInfo) {
      LTJSSDK.printLog("LetoFeedDemo::onFeedAdFailed(" + adId + ", " + errorInfo + ")");
    },

    onFeedAdShow:function(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdShow(" + adId + ")");
    },

    onFeedAdHide:function(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdHide(" + adId + ")");
    },

    onFeedAdClick:function(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdClick(" + adId + ")");
    },

    onFeedAdClose:function(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdClose(" + adId + ")");
    }
});
