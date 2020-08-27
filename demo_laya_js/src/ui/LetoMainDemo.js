export default class LetoMainDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoMainDemo.scene");

        // event
        this.btnRewardedVideo.on(Laya.Event.CLICK, this, this.onRewardedVideoClicked)
        this.btnBanner.on(Laya.Event.CLICK, this, this.onBannerClicked)
        this.btnFeed.on(Laya.Event.CLICK, this, this.onFeedClicked)
        this.btnInterstitial.on(Laya.Event.CLICK, this, this.onInterstitialClicked)
        this.btnFullVideo.on(Laya.Event.CLICK, this, this.onFullVideoClicked)
    }

    onAwake() {
        LTJSSDK.setLogDebug(true)
    }

    onRewardedVideoClicked() {
        Laya.Scene.open('test/LetoRewardedVideoDemo.scene')
    }

    onBannerClicked() {
        Laya.Scene.open('test/LetoBannerDemo.scene')
    }

    onFeedClicked() {
        Laya.Scene.open('test/LetoFeedDemo.scene')
    }

    onInterstitialClicked() {
        Laya.Scene.open('test/LetoInterstitialDemo.scene')
    }

    onFullVideoClicked() {
        Laya.Scene.open('test/LetoFullVideoDemo.scene')
    }
}