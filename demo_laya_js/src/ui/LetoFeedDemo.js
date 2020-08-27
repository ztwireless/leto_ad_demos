export default class LetoFeedDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoFeedDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnLoad.on(Laya.Event.CLICK, this, this.onLoadClicked)
        this.btnShow.on(Laya.Event.CLICK, this, this.onShowClicked)
        this.btnHide.on(Laya.Event.CLICK, this, this.onHideClicked)
        this.btnDestroy.on(Laya.Event.CLICK, this, this.onDestroyClicked)
    }

    adId() {
        return 1
    }

    onAwake() {
        LTFeedJSSDK.setAdListener(this);
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onLoadClicked() {
        LTFeedJSSDK.load(this.adId());
    }

    onShowClicked() {
        LTFeedJSSDK.show(this.adId());
    }

    onHideClicked() {
        LTFeedJSSDK.hide(this.adId());
    }

    onDestroyClicked() {
        LTFeedJSSDK.destroy(this.adId())
    }

    //Callbacks
    onFeedAdLoaded(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onFeedAdFailed(adId, errMsg) {
      LTJSSDK.printLog("LetoFeedDemo::onFeedAdFailed(" + adId + ", " + errMsg + ")");
    }

    onFeedAdShow(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onFeedAdHide(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdHide(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onFeedAdClick(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onFeedAdClose(adId, adInfo) {
        LTJSSDK.printLog(`LetoFeedDemo::onFeedAdClose(${adId}, ${JSON.stringify(adInfo)})`);
    }
}