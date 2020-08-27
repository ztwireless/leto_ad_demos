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
        LTRewardedVideoJSSDK.load(this.adId())
    }

    onShowClicked() {
        LTRewardedVideoJSSDK.show(this.adId());
    }

    onReadyStatusClicked() {
        LTJSSDK.printLog("LetoRewardedVideoDemo::checkReady()   " + (LTRewardedVideoJSSDK.hasAdReady(this.adId()) ? "Ready" : "No"));
    }

    //Callbacks
    onRewardedVideoAdLoaded(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onRewardedVideoAdFailed(adId, errMsg) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdFailed(${adId}, ${errMsg})`);
    }

    onRewardedVideoAdClosed(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdClosed(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onReward(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onReward(${adId}, ${JSON.stringify(adInfo)}})`);
    }

    onRewardedVideoAdShow(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onRewardedVideoAdClick(adId, adInfo) {
        LTJSSDK.printLog(`LetoRewardedVideoDemo::onRewardedVideoAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    }
}