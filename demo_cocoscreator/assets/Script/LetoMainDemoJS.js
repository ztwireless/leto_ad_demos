
require("./LetoAd/LTJSSDK");

cc.Class({
    extends: cc.Component,

    start : function(){
        cc.log("Main Scene start.......");

        LTJSSDK.setLogDebug(true);

        LTJSSDK.initSDK();
    },

    // use this for initialization
    onLoad: function () {   

    },

    // called every frame
    update: function (dt) {

    },

    gotoRewardedVideoScene: function () {
        cc.director.loadScene("RewardedVideoDemoScene");
    },
    gotoNativeScene: function () {
       cc.director.loadScene("NativeAdDemoScene");
    },
    gotoBannerScene: function () {
       cc.director.loadScene("BannerDemoScene");
    },
    gotoInterstitialScene: function () {
       cc.director.loadScene("InterstitialDemoScene");
    }
});
