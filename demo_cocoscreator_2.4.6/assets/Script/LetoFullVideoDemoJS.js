require("./LTJSSDK")


cc.Class({
    extends: cc.Component,

    adId: function() {
        return 1;
    },

    // use this for initialization
    onLoad: function () {
        LTFullVideoJSSDK.setAdListener(this);
    },

    // called every frame
    update: function (dt) {

    },

    back: function () {
        cc.director.loadScene("LetoDemoScene");
       
    },

    loadAd : function () {
        LTFullVideoJSSDK.load(this.adId());
    },

    showAd : function () {
        LTFullVideoJSSDK.show(this.adId());
    },

    checkReady : function () {
        var isReady = LTFullVideoJSSDK.hasAdReady(this.adId());
    },

    onFullVideoAdLoaded : function (adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onFullVideoAdFail : function(adId, errMsg) {
         LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdFail(" + adId + ", " + errMsg + ")");   
    },

    onFullVideoAdShow : function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onFullVideoAdClose : function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdClose(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onFullVideoAdClick: function(adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    }
});
