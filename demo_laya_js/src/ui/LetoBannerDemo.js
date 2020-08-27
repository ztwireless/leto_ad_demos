export default class LetoBannerDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoBannerDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnLoad.on(Laya.Event.CLICK, this, this.onLoadClicked)
        this.btnReady.on(Laya.Event.CLICK, this, this.onReadyClicked)
        this.btnShow.on(Laya.Event.CLICK, this, this.onShowClicked)
        this.btnRemove.on(Laya.Event.CLICK, this, this.onRemoveClicked)
        this.btnReshow.on(Laya.Event.CLICK, this, this.onReshowClicked)
        this.btnHide.on(Laya.Event.CLICK, this, this.onHideClicked)
    }

    adId() {
        return 1
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onLoadClicked() {
        LTBannerJSSDK.load(this.adId());
    }

    onReadyClicked() {
        var hasReady = LTBannerJSSDK.hasAdReady(this.adId());
        LTJSSDK.printLog("LetoAdBannerDemo::checkReady() " + (hasReady ? "Ready" : "NO"));
    }

    onShowClicked() {
        LTBannerJSSDK.show(this.adId());
    }

    onRemoveClicked() {
        LTBannerJSSDK.remove(this.adId());
    }

    onReshowClicked() {
        LTBannerJSSDK.reShow(this.adId());
    }

    onHideClicked() {
        LTBannerJSSDK.hide(this.adId());
    }

    onBannerAdLoaded(adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onBannerAdLoadFail(adId, errMsg) {
        LTJSSDK.printLog("LetoAdBannerDemo::onBannerAdLoadFail(" + adId + ", " + errMsg + ")");   
    }

    onBannerAdClick(adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onBannerAdShow(adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onBannerAdHide(adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdHide(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onBannerAdClose(adId, adInfo) {
        LTJSSDK.printLog(`LetoAdBannerDemo::onBannerAdClose(${adId}, ${JSON.stringify(adInfo)})`);
    }
}