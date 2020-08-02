const OC_LTSDK_MANAGER_CLASS = "LTSDKManager";
const OC_BIRDGE_CLASS = "LTJSBridge";
var LTiOSJS = LTiOSJS || {
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
    }
};

module.exports = LTiOSJS;