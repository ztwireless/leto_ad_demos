export default class LetoInterstitialDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoInterstitialDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnLoad.on(Laya.Event.CLICK, this, this.onLoadClicked)
        this.btnShow.on(Laya.Event.CLICK, this, this.onShowClicked)
        this.btnReady.on(Laya.Event.CLICK, this, this.onReadyStatusClicked)
    }

    onAwake() {
        LTInterstitialJSSDK.setAdListener(this);
    }

    adId() {
        return 1;
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onLoadClicked() {
        LTInterstitialJSSDK.load(this.adId());
    }

    onShowClicked() {
        LTInterstitialJSSDK.show(this.adId());
    }

    onReadyStatusClicked() {
        var isReady = LTInterstitialJSSDK.hasAdReady(this.adId());
    }

    onInterstitialAdLoaded(adId) {
        LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdLoaded(" + adId + ")");
    }

    onInterstitialAdLoadFail(adId, errorInfo) {
         LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdLoadFail(" + adId + ", " + errorInfo + ")");   
    }

    onInterstitialAdShow(adId, callbackInfo) {
        LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdShow("  + adId + ", " + callbackInfo + ")");
    }

    onInterstitialAdClose(adId, callbackInfo) {
        LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdClose("  + adId + ", " + callbackInfo + ")");
    },

    onInterstitialAdClick(adId) {
        LTJSSDK.printLog("LetoInterstitialDemo::onInterstitialAdClick(" + adId + ")");
    }
}