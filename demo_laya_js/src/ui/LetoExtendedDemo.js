export default class LetoExtendedDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoExtendedDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnDefault.on(Laya.Event.CLICK, this, this.onDefaultClicked)
        this.btnCustomLogic.on(Laya.Event.CLICK, this, this.onCustomLogicClicked)
        this.btnNormalClaim.on(Laya.Event.CLICK, this, this.onNormalClaimClicked)
        this.btnNoVideo.on(Laya.Event.CLICK, this, this.onNoVideoClicked)
    }

    onAwake() {
        LTExtendedJSSDK.setAdListener(this)
    }

    adId() {
        return 1
    }

    onDefaultClicked() {
        LTExtendedJSSDK.load(this.adId());
        LTExtendedJSSDK.show(this.adId(), {
            coin: 1,
            ratio: 2
        })
    } 

    onCustomLogicClicked() {
        LTExtendedJSSDK.load(this.adId(), {
            style: {
                title: `自定义标题`,
                video_button_title: '自定义按钮文字',
                icon: 'http://download.mgc-games.com/access/upload/20190319/5c909dc73468a.png'
            }
        })
        LTExtendedJSSDK.show(this.adId(), {
            coin: 1,
            ratio: 2,
            custom_logic: true
        })
    }

    onNormalClaimClicked() {
        LTExtendedJSSDK.load(this.adId(), {
            style: {
                title: '带普通领取按钮',
                show_my_coin: true,
                show_normal_button: true
            }
        })
        LTExtendedJSSDK.show(this.adId(), {
            coin: 1,
            ratio: 2
        })
    }

    onNoVideoClicked() {
        LTExtendedJSSDK.load(this.adId(), {
            style: {
                title: '比例<=1则无视频, 只能普通领取',
                show_my_coin: true
            }
        })
        LTExtendedJSSDK.show(this.adId(), {
            coin: 1,
            ratio: 1
        })
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onExtendedAdLoaded(adId) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdLoaded(" + adId + ")");
    }

    onExtendedAdFailed(adId, errorInfo) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdFailed(" + adId + ", " + errorInfo + ")");
    }

    onExtendedAdShow(adId) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdShow(" + adId + ")");
    }

    onExtendedAdClose(adId, res) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdClose(" + adId + ", " + JSON.stringify(res) + ")");
    }

    onExtendedAdCustomClose(adId, res) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdCustomClose(" + adId + ", " + JSON.stringify(res) + ")");
    }

    onExtendedAdVideoClose(adId, res) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdVideoClose(" + adId + ", " + JSON.stringify(res) + ")");
    }
    
    onExtendedAdNormalClaim(adId) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdNormalClaim(" + adId + ")");
    }
}