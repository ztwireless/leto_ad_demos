var classJavaName = "com/leto/ad/cocosjs/LTJSBridge";
var LTAndroidJS = LTAndroidJS || {
    printJsLog : function(msg) {
        if (undefined != msg && msg != null) {
            jsb.reflection.callStaticMethod("android/util/Log", "i", "(Ljava/lang/String;Ljava/lang/String;)I", "LTJSBridge", msg);
        }
    },

    initSDK : function() {
        jsb.reflection.callStaticMethod(classJavaName, "initSDK", "()V");
    },

    setLogDebug : function (debug) {
        jsb.reflection.callStaticMethod(classJavaName, "setLogDebug", "(Z)V", debug);
    },

    getUserCoin: function() {
        jsb.reflection.callStaticMethod(classJavaName, "getUserCoin", "()V");
    },

    addCoin: function(coin) {
        jsb.reflection.callStaticMethod(classJavaName, "addCoin", "(I)V", coin);
    },

    showWithdraw: function(coin) {
        jsb.reflection.callStaticMethod(classJavaName, "showWithdraw", "()V");
    },

    showWithdrawIcon: function(styleId, left, top, dock) {
        jsb.reflection.callStaticMethod(classJavaName, "showWithdrawIcon", "(IIIZ)V", styleId, left, top, dock);
    },

    hideWithdrawIcon: function() {
        jsb.reflection.callStaticMethod(classJavaName, "hideWithdrawIcon", "()V");
    },

    showRedPack: function(params) {
        params = params || {}
        jsb.reflection.callStaticMethod(classJavaName, "showSceneRedPack", "(Ljava/lang/String;)V", JSON.stringify(params));
    }
};

module.exports = LTAndroidJS;