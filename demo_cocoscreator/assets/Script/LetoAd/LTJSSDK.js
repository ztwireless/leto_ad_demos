(function() {
    const LTAndroidJS = require("./Android/LTAndroidJS");
    const LTiOSJS = require("./iOS/LTiOSJS");
    let isDebugLog = false;

    let initPlatformBridge = function() {  
        if (cc.sys.os === cc.sys.OS_IOS) {           
            return LTiOSJS;
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            return LTAndroidJS;
        }
    };

    let platformBridge = initPlatformBridge();

    let LTSDK = LTSDK || {
        // shared listener for other api, DON'T RENAME
        LTApiSharedListener: {
            getUserCoinOkCb: null,
            getUserCoinFailCb: null,
            addCoinOkCb: null,
            addCoinFailCb: null,
            redPackCloseCb: null,
            onGetUserCoinSuccess: function(res) {
                this.getUserCoinOkCb && this.getUserCoinOkCb(res);
                this.getUserCoinOkCb = null;
            },
            onGetUserCoinFail: function(res) {
                this.getUserCoinFailCb && this.getUserCoinFailCb(res);
                this.getUserCoinFailCb = null;
            },
            onAddCoinSuccess: function(res) {
                this.addCoinOkCb && this.addCoinOkCb(res)
                this.addCoinOkCb = null
            },
            onAddCoinFail: function(res) {
                this.addCoinFailCb && this.addCoinFailCb(res)
                this.addCoinFailCb = null
            },
            onRedPackClose: function(res) {
                this.redPackCloseCb && this.redPackCloseCb(res)
                this.redPackCloseCb = null
            }
        },

        initSDK: function() {
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.initSDK();
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        setLogDebug: function (debug) {
            isDebugLog = debug;
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.setLogDebug(debug);
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        printLog: function(msg) {
            if (undefined != msg && null != msg && isDebugLog && platformBridge != null ) {
                if (undefined != platformBridge && platformBridge != null) {
                    platformBridge.printJsLog(msg); 
                } else {
                    cc.log("You must run on Android or iOS.");
                }
            }
        },

        getUserCoin: function(okCb, failCb) {
            if (undefined != platformBridge && platformBridge != null) {
                this.LTApiSharedListener.getUserCoinOkCb = okCb;
                this.LTApiSharedListener.getUserCoinFailCb = failCb;
                platformBridge.getUserCoin(); 
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        addCoin: function(coin, okCb, failCb) {
            if (undefined != platformBridge && platformBridge != null) {
                this.LTApiSharedListener.addCoinOkCb = okCb;
                this.LTApiSharedListener.addCoinFailCb = failCb;
                platformBridge.addCoin(coin); 
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        showWithdraw: function() {
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.showWithdraw(); 
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        showWithdrawIcon: function(styleId, left, top, dock) {
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.showWithdrawIcon(styleId, left, top, dock); 
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        hideWithdrawIcon: function() {
            if (undefined != platformBridge && platformBridge != null) {
                platformBridge.hideWithdrawIcon(); 
            } else {
                cc.log("You must run on Android or iOS.");
            }
        },

        showRedPack: function(params, closeCb) {
            if (undefined != platformBridge && platformBridge != null) {
                this.LTApiSharedListener.redPackCloseCb = closeCb
                platformBridge.showRedPack(params); 
            } else {
                cc.log("You must run on Android or iOS.");
            }
        }
    };

    window.LTJSSDK = LTSDK;
})();