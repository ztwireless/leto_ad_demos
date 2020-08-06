var classJavaName = "com/leto/ad/js/LTRewardedVideoJSBridge";
var LTAndroidRewardedVideoJS = LTAndroidRewardedVideoJS || {
    bridgeClass: null,

    lazyLoadBridgeClass: function() {
        if(!this.bridgeClass) {
            this.bridgeClass = window.PlatformClass.createClass("com.leto.ad.js.LTRewardedVideoJSBridge")
        }
    }
  
    loadRewardedVideo : function (adId) {
        if(typeof(jsb) != 'undefined') {
            cc.log("LTAndroidRewardedVideoJS-loadRewardedVideo");
            jsb.reflection.callStaticMethod(classJavaName, "load", "(I)V", adId);
        } else if(typeof(window.PlatformClass) != 'undefined') {
            this.lazyLoadBridgeClass()
            this.bridgeClass.call('load', adId)
        }
    },

    setAdListener : function (listener) {
        if(typeof(jsb) != 'undefined') {
            cc.log("LTAndroidRewardedVideoJS-setAdListener");
            jsb.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
        } else if(typeof(window.PlatformClass) != 'undefined') {
            this.lazyLoadBridgeClass()
            this.bridgeClass.call('setAdListener', listener)
        } 
    },

    hasAdReady : function (adId) {
        if(typeof(jsb) != 'undefined') {
            cc.log("LTAndroidRewardedVideoJS-hasAdReady");
            return jsb.reflection.callStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);
        } else if(typeof(window.PlatformClass) != 'undefined') {
            this.lazyLoadBridgeClass()
            return this.bridgeClass.call('isAdReady', adId)
        }
    },

    showAd: function(adId) {
        if(typeof(jsb) != 'undefined') {
            cc.log("LTAndroidRewardedVideoJS-showAd:" + adId);
            jsb.reflection.callStaticMethod(classJavaName, "show", "(I)V", adId);
        } else if(typeof(window.PlatformClass) != 'undefined') {
            this.lazyLoadBridgeClass()
            this.bridgeClass.call('show', adId)
        }
    },

    destroy: function(adId) {
        if(typeof(jsb) != 'undefined') {
            cc.log("LTAndroidRewardedVideoJS-destroy:" + adId);
            jsb.reflection.callStaticMethod(classJavaName, "destroy", "(I)V", adId);
        } else if(typeof(window.PlatformClass) != 'undefined') {
            this.lazyLoadBridgeClass()
            this.bridgeClass.call('destroy', adId)
        }
    }
};

module.exports = LTAndroidRewardedVideoJS;