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
    onFeedAdLoaded(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdLoaded(" + adId + ")");
    }

    onFeedAdFailed(adId, errorInfo) {
      LTJSSDK.printLog("LetoFeedDemo::onFeedAdFailed(" + adId + ", " + errorInfo + ")");
    }

    onFeedAdShow(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdShow(" + adId + ")");
    }

    onFeedAdHide(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdHide(" + adId + ")");
    }

    onFeedAdClick(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdClick(" + adId + ")");
    }

    onFeedAdClose(adId) {
        LTJSSDK.printLog("LetoFeedDemo::onFeedAdClose(" + adId + ")");
    }
}