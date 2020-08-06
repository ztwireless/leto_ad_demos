export default class LetoMainDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoMainDemo.scene");

        // event
        this.btnRewardedVideo.on(Laya.Event.CLICK, this, this.onRewardedVideoClicked)
        this.btnBanner.on(Laya.Event.CLICK, this, this.onBannerClicked)
        this.btnCoin.on(Laya.Event.CLICK, this, this.onCoinClicked)
        this.btnExtended.on(Laya.Event.CLICK, this, this.onExtendedClicked)
        this.btnFeed.on(Laya.Event.CLICK, this, this.onFeedClicked)
        this.btnInterstitial.on(Laya.Event.CLICK, this, this.onInterstitialClicked)
        this.btnRedPack.on(Laya.Event.CLICK, this, this.onRedPackClicked)
    }

    onRewardedVideoClicked() {
        Laya.Scene.open('test/LetoRewardedVideoDemo.scene')
    }

    onBannerClicked() {
        Laya.Scene.open('test/LetoBannerDemo.scene')
    }

    onCoinClicked() {
        Laya.Scene.open('test/LetoCoinDemo.scene')
    }

    onExtendedClicked() {
        Laya.Scene.open('test/LetoExtendedDemo.scene')
    }

    onFeedClicked() {
        Laya.Scene.open('test/LetoFeedDemo.scene')
    }

    onInterstitialClicked() {
        Laya.Scene.open('test/LetoInterstitialDemo.scene')
    }

    onRedPackClicked() {
        Laya.Scene.open('test/LetoRedPackDemo.scene')
    }
}