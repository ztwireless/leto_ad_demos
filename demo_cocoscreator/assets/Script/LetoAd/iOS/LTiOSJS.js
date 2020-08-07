(function() {
    const OC_LTSDK_MANAGER_CLASS = "LTSDKManager";
    const OC_BIRDGE_CLASS = "LTJSBridge";
    let LTiOSJS = LTiOSJS || {
        initSDK : function() {
            this.printJsLog("LTiOSJS::initSDK()");
            jsb.reflection.callStaticMethod(OC_LTSDK_MANAGER_CLASS, "initSDK");
        },
        
        setLogDebug : function (debug) {
            this.printJsLog("LTiOSJS::setLogDebug(" + debug + ")");
            jsb.reflection.callStaticMethod(OC_LTSDK_MANAGER_CLASS, "setLogDebug:", debug);
        },
        
        printJsLog : function(msg) {
            if (undefined != msg && msg != null) {
                jsb.reflection.callStaticMethod(OC_BIRDGE_CLASS, "log:", msg);
            }
        },
        
        getUserCoin : function() {
            jsb.reflection.callStaticMethod(OC_BIRDGE_CLASS, "getUserCoin");
        },
        
        addCoin : function(coin) {
            jsb.reflection.callStaticMethod(OC_BIRDGE_CLASS, "addCoin:", coin);
        },
        
        showWithdraw : function(coin) {
            jsb.reflection.callStaticMethod(OC_BIRDGE_CLASS, "showWithdraw");
        },

        showWithdrawIcon: function(styleId, left, top, dock) {
            jsb.reflection.callStaticMethod(OC_BIRDGE_CLASS, "showWithdrawIcon:left:top:dock:", styleId, left, top, dock);
        },

        hideWithdrawIcon: function() {
            jsb.reflection.callStaticMethod(OC_BIRDGE_CLASS, "hideWithdrawIcon");
        },

        showRedPack: function(params) {
            params = params || {}
            jsb.reflection.callStaticMethod(OC_BIRDGE_CLASS, "showSceneRedPack:", JSON.stringify(params));
        }
    };

    module.exports = LTiOSJS;
})();