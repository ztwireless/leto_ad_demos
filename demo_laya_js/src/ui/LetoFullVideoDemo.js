export default class LetoFullVideoDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoFullVideoDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnLoad.on(Laya.Event.CLICK, this, this.onLoadClicked)
        this.btnShow.on(Laya.Event.CLICK, this, this.onShowClicked)
        this.btnReady.on(Laya.Event.CLICK, this, this.onReadyStatusClicked)
    }

    onAwake() {
        LTFullVideoJSSDK.setAdListener(this);
    }

    adId() {
        return 1;
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onLoadClicked() {
        LTFullVideoJSSDK.load(this.adId());
    }

    onShowClicked() {
        LTFullVideoJSSDK.show(this.adId());
    }

    onReadyStatusClicked() {
        var isReady = LTFullVideoJSSDK.hasAdReady(this.adId());
    }

    onFullVideoAdLoaded(adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onFullVideoAdFail(adId, errMsg) {
         LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdFail(" + adId + ", " + errMsg + ")");   
    }

    onFullVideoAdShow(adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdShow(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onFullVideoAdClose(adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdClose(${adId}, ${JSON.stringify(adInfo)})`);
    }

    onFullVideoAdClick(adId, adInfo) {
        LTJSSDK.printLog(`LetoFullVideoDemo::onFullVideoAdClick(${adId}, ${JSON.stringify(adInfo)})`);
    }
}