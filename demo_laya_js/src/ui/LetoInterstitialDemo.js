export default class LetoInterstitialDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoInterstitialDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }
}