require("./LTJSSDK")


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
        LTInterstitialJSSDK.load(this.adId());
    },

    showAd : function () {
        LTInterstitialJSSDK.show(this.adId());
    },

    checkReady : function () {
        var isReady = LTInterstitialJSSDK.hasAdReady(this.adId());
    },

    onInterstitialAdLoaded : function (adId, adInfo) {
        LTJSSDK.printLog(`LetoInterstitialDemo::onInterstitialAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onInterstitialAdLoadFail : function(adId, errMsg) {
         LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdLoadFail(" + adId + ", " + errMsg + ")");   
    },

    onInterstitialAdShow : function(adId, adInfo) {
        LTJSSDK.printLog(`LetoInterstitialDemo::onInterstitialAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onInterstitialAdClose : function(adId, adInfo) {
        LTJSSDK.printLog(`LetoInterstitialDemo::onInterstitialAdClose(${adId}, ${JSON.stringify(adInfo)})`);
    },

    onInterstitialAdClick: function(adId, adInfo) {
        LTJSSDK.printLog(`LetoInterstitialDemo::onInterstitialAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    }
});
