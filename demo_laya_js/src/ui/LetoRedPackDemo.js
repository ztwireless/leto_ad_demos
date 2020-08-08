export default class LetoRedPackDemo extends Laya.Scene {
    constructor() {
        super();
        
        //加载场景文件
        this.loadScene("test/LetoRedPackDemo.scene");

        // event
        this.btnBack.on(Laya.Event.CLICK, this, this.onBackClicked)
        this.btnRedPack1.on(Laya.Event.CLICK, this, this.onRedPack1Clicked)
        this.btnRedPack2.on(Laya.Event.CLICK, this, this.onRedPack2Clicked)
    }

    onBackClicked() {
        Laya.Scene.open('test/LetoMainDemo.scene')
    }

    onRedPack1Clicked() {
        LTJSSDK.showRedPack({
            workflow: 1,
            local_limits: [
                { limit: 1000, max_award: 5, min_award: 1, video_ratio: 2 },
                { limit: 2000, max_award: 4, min_award: 1, video_ratio: 3 },
                { limit: 3000, max_award: 2, min_award: 1, video_ratio: 4 }
            ]
        }, res => {
            LTJSSDK.printLog("red pack close")
        })
    }

    onRedPack2Clicked() {
        LTJSSDK.showRedPack({
            workflow: 2,
            local_limits: [
                { limit: 1000, max_award: 5, min_award: 1, video_ratio: 2 },
                { limit: 2000, max_award: 4, min_award: 1, video_ratio: 3 },
                { limit: 3000, max_award: 2, min_award: 1, video_ratio: 4 }
            ]
        }, res => {
            LTJSSDK.printLog("red pack close")
        })
    }
}