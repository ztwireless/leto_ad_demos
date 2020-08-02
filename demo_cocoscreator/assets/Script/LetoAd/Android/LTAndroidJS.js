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
    }
};

module.exports = LTAndroidJS;