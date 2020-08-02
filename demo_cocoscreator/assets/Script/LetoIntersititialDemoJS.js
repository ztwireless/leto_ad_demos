require("./LetoAd/LTInterstitialJSSDK")


cc.Class({
    extends: cc.Component,

    adId: function() {
        return 1;
    },

    // use this for initialization
    onLoad: function () {
        LTInterstitialJSSDK.setAdListener(this);
    },

    // called every frame
    update: function (dt) {

    },

    back: function () {
        cc.director.loadScene("LetoDemoScene");
       
    },

    loadAd : function () {
        LTInterstitialJSSDK.loadInterstitial(this.adId());
    },

    showAd : function () {
        LTInterstitialJSSDK.showAd(this.adId());
    },

    checkReady : function () {
        var isReady = LTInterstitialJSSDK.hasAdReady(this.adId());
    },

    onInterstitialAdLoaded : function (adId) {
        LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdLoaded(" + adId + ")");
    },

    onInterstitialAdLoadFail : function(adId, errorInfo) {
         LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdLoadFail(" + adId + ", " + errorInfo + ")");   
    },

    onInterstitialAdShow : function(adId, callbackInfo) {
        LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdShow("  + adId + ", " + callbackInfo + ")");
    },

    onInterstitialAdClose : function(adId, callbackInfo) {
        LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdClose("  + adId + ", " + callbackInfo + ")");
    },
});
