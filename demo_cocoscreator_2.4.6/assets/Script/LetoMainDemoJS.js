require("./LTJSSDK");

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
    gotoBannerScene: function () {
       cc.director.loadScene("BannerDemoScene");
    },
    gotoInterstitialScene: function () {
       cc.director.loadScene("InterstitialDemoScene");
    },
    gotoFeedScene: function () {
       cc.director.loadScene("FeedDemoScene");
    },
    gotoFullVideoScene: function () {
       cc.director.loadScene("FullVideoDemoScene");
    },

    onCheckRealNameClicked() {
      LTJSSDK.checkRealName(this)
    },

    onCheckRealNameResult(errCode, errMsg) {
      if(errCode == 0) {
         cc.log(`onCheckRealNameResult success`)
      } else {
         cc.log(`onCheckRealNameResult failed`)
      }
    }
});
