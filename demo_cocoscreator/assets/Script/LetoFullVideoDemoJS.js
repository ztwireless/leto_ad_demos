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

    onFullVideoAdLoaded : function (adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdLoaded(" + adId + ")");
    },

    onFullVideoAdFail : function(adId, errorInfo) {
         LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdFail(" + adId + ", " + errorInfo + ")");   
    },

    onFullVideoAdShow : function(adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdShow("  + adId + ", " + callbackInfo + ")");
    },

    onFullVideoAdClose : function(adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdClose("  + adId + ", " + callbackInfo + ")");
    },

    onFullVideoAdClick: function(adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdClick(" + adId + ")");
    }
});
