require("./LTJSSDK");

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            type: cc.Label,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
    },

    // called every frame
    update: function (dt) {

    },

    back: function () {
        cc.director.loadScene("LetoDemoScene");
    },

    getUserCoin: function() {
        LTJSSDK.getUserCoin(res => {
            this.label.string = `User Coin: ${res.coin}`
        })
    },

    addCoin: function() {
        LTJSSDK.addCoin(1, res => {
            LTJSSDK.getUserCoin(res => {
                this.label.string = `User Coin: ${res.coin}`
            })
        })
    },

    showWithdraw: function() {
        LTJSSDK.showWithdraw()
    },

    showWithdrawIcon1: function() {
        LTJSSDK.showWithdrawIcon(1, 10, 10, true);
    },

    showWithdrawIcon2: function() {
        LTJSSDK.showWithdrawIcon(2, 10, 10, true);
    },

    hideWithdrawIcon: function() {
        LTJSSDK.hideWithdrawIcon();
    },
});
