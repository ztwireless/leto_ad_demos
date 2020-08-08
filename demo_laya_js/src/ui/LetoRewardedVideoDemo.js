export default class LetoRewardedVideoDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoRewardedVideoDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnLoad.on(Laya.Event.CLICK, this, this.onLoadClicked)
        this.btnShow.on(Laya.Event.CLICK, this, this.onShowClicked)
        this.btnReady.on(Laya.Event.CLICK, this, this.onReadyStatusClicked)
    }

    onAwake() {
        LTRewardedVideoJSSDK.setAdListener(this);
    }

    adId() {
        return 1
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onLoadClicked() {
        LTRewardedVideoJSSDK.loadRewardedVideo(this.adId())
    }

    onShowClicked() {
        LTRewardedVideoJSSDK.showAd(this.adId());
    }

    onReadyStatusClicked() {
        LTJSSDK.printLog("LetoRewardedVideoDemo::checkReady()   " + (LTRewardedVideoJSSDK.hasAdReady(this.adId()) ? "Ready" : "No"));
    }

    //Callbacks
    onRewardedVideoAdLoaded(adId) {
        LTJSSDK.printLog("LetoRewardedVideoDemo::onRewardedVideoAdLoaded(" + adId + ")");
    }

    onRewardedVideoAdFailed(adId, errorInfo) {
      LTJSSDK.printLog("LetoRewardedVideoDemo::onRewardedVideoAdFailed(" + adId + ", " + errorInfo + ")");
    }

    onRewardedVideoAdClosed(adId, callbackInfo) {
        LTJSSDK.printLog("LetoRewardedVideoDemo::onRewardedVideoAdClosed(" + adId + ", " + callbackInfo + ")");
    }

    onReward(adId, callbackInfo) {
        LTJSSDK.printLog("LetoRewardedVideoDemo::onReward(" + adId + ", " + callbackInfo + ")");
    }
}