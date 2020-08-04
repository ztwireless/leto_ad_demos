require("./LetoAd/LTJSSDK");

cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
    },

    // called every frame
    update: function (dt) {

    },

    back: function () {
        cc.director.loadScene("LetoDemoScene");
    },

    showRedPack1: function() {
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
    },

    showRedPack2: function() {
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
});
