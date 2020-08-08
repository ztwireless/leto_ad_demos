export default class LetoCoinDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoCoinDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnGetUserCoin.on(Laya.Event.CLICK, this, this.onGetUserCoinClicked)
        this.btnAddCoin.on(Laya.Event.CLICK, this, this.onAddCoinClicked)
        this.btnWithdraw.on(Laya.Event.CLICK, this, this.onWithdrawClicked)
        this.btnFloat1.on(Laya.Event.CLICK, this, this.onFloat1Clicked)
        this.btnFloat2.on(Laya.Event.CLICK, this, this.onFloat2Clicked)
        this.btnHideFloat.on(Laya.Event.CLICK, this, this.onHideFloatClicked)
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onGetUserCoinClicked() {
        LTJSSDK.getUserCoin(res => {
            this.label.text = `User Coin: ${res.coin}`
        })
    }

    onAddCoinClicked() {
        LTJSSDK.addCoin(1, res => {
            LTJSSDK.getUserCoin(res => {
                this.label.text = `User Coin: ${res.coin}`
            })
        })
    }

    onWithdrawClicked() {
        LTJSSDK.showWithdraw()
    }

    onFloat1Clicked() {
        LTJSSDK.showWithdrawIcon(1, 10, 10, false, true);
    }

    onFloat2Clicked() {
        LTJSSDK.showWithdrawIcon(2, 10, 10, false, true);
    }

    onHideFloatClicked() {
        LTJSSDK.hideWithdrawIcon();
    }
}