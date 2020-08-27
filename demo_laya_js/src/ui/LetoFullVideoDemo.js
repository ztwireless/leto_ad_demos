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

    onFullVideoAdLoaded(adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdLoaded(" + adId + ")");
    }

    onFullVideoAdFail(adId, errorInfo) {
         LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdFail(" + adId + ", " + errorInfo + ")");   
    }

    onFullVideoAdShow(adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdShow("  + adId + ")");
    }

    onFullVideoAdClose(adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdClose("  + adId + ")");
    }

    onFullVideoAdClick(adId) {
        LTJSSDK.printLog("LetoFullVideoDemo::onFullVideoAdClick(" + adId + ")");
    }
}