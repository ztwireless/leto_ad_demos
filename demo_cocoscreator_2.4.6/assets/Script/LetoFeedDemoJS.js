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
    onFeedAdLoaded:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onFeedAdFailed : function(adId, errMsg) {
      LTJSSDK.printLog("LetoFeedDemo::onFeedAdFailed(" + adId + ", " + errMsg + ")");
    },

    onFeedAdShow:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onFeedAdHide:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdHide(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onFeedAdClick:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onFeedAdClose:function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdClose(${adId}, ${JSON.stringify(adInfo)})`);
    }
});
