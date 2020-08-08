require("./LTJSSDK");

cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        LTExtendedJSSDK.setAdListener(this)
    },

    adId: function() {
        return 1;
    },

    // called every frame
    update: function (dt) {

    },

    back: function () {
        cc.director.loadScene("LetoDemoScene");
    },

    showDefault: function() {
        LTExtendedJSSDK.load(this.adId());
        LTExtendedJSSDK.show(this.adId(), {
            coin: 1,
            ratio: 2
        })
    },

    showCustomLogic: function() {
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
    },

    showNormalClaim: function() {
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
    },

    showNoVideo: function() {
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
    },

    onExtendedAdLoaded : function (adId) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdLoaded(" + adId + ")");
    },
    onExtendedAdFailed : function(adId, errorInfo) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdFailed(" + adId + ", " + errorInfo + ")");
    },
    onExtendedAdClose : function(adId, res) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdClose(" + adId + ", " + JSON.stringify(res) + ")");
    },
    onExtendedAdCustomClose : function(adId, res) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdCustomClose(" + adId + ", " + JSON.stringify(res) + ")");
    },
    onExtendedAdVideoClose : function(adId, res) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdVideoClose(" + adId + ", " + JSON.stringify(res) + ")");
    },
    onExtendedAdNormalClaim : function(adId) {
        LTJSSDK.printLog("LetoExtendDemo::onExtendedAdNormalClaim(" + adId + ")");
    }
});
