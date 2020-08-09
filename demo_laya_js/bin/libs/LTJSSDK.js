(function() {
    // check platform
    let isIOS = function() {
        if(typeof(window.cc) !== 'undefined') {
            return cc.sys.os == cc.sys.OS_IOS
        } else if(typeof(window.Laya) !== 'undefined') {
            return Laya.Browser.onIOS
        } else {
            return false
        }
    }
    let isAndroid = function() {
        if(typeof(window.cc) !== 'undefined') {
            return cc.sys.os == cc.sys.OS_ANDROID
        } else if(typeof(window.Laya) !== 'undefined') {
            return Laya.Browser.onAndroid
        } else {
            return false
        }
    }

    // call android java
    let layaClassCache = {}
    let loadLayaClass = function(klass) {
        if(!layaClassCache[klass]) {
            layaClassCache[klass] = window.PlatformClass.createClass(klass)
        }
        return layaClassCache[klass]
    }
    let callJavaStaticMethod = function(klass, method, sig) {
        let args = Array.prototype.slice.call(arguments, 3)
        if(typeof(jsb) !== 'undefined') {
            return jsb.reflection.callStaticMethod(klass, method, sig, ...args)
        } else if(typeof(window.PlatformClass) !== 'undefined') {
            klass = klass.replace(/\//g, '.') // to dot class name
            javaClass = loadLayaClass(klass)
            return javaClass.call(method, ...args)
        }
    }

    // LTAndroidJS
    {
        let classJavaName = "com/leto/ad/js/LTJSBridge";
        let LTAndroidJS = {
            printJsLog : function(msg) {
                if (undefined != msg && msg != null) {
                    callJavaStaticMethod("android/util/Log", "i", "(Ljava/lang/String;Ljava/lang/String;)I", "LTJSBridge", msg);
                }
            },

            initSDK : function() {
                callJavaStaticMethod(classJavaName, "initSDK", "()V");
            },

            setLogDebug : function (debug) {
                callJavaStaticMethod(classJavaName, "setLogDebug", "(Z)V", debug);
            },

            getUserCoin: function() {
                callJavaStaticMethod(classJavaName, "getUserCoin", "()V");
            },

            addCoin: function(coin) {
                callJavaStaticMethod(classJavaName, "addCoin", "(I)V", coin);
            },

            showWithdraw: function(coin) {
                callJavaStaticMethod(classJavaName, "showWithdraw", "()V");
            },

            showWithdrawIcon: function(styleId, left, top, pinned, dock) {
                callJavaStaticMethod(classJavaName, "showWithdrawIcon", "(IIIZZ)V", styleId, left, top, pinned, dock);
            },

            hideWithdrawIcon: function() {
                callJavaStaticMethod(classJavaName, "hideWithdrawIcon", "()V");
            },

            showRedPack: function(params) {
                params = params || {}
                callJavaStaticMethod(classJavaName, "showSceneRedPack", "(Ljava/lang/String;)V", JSON.stringify(params));
            }
        };
        window.LTAndroidJS = LTAndroidJS;
    }

    // LTiOSJS
    {
        let OC_LTSDK_MANAGER_CLASS = "LTSDKManager";
        let OC_BIRDGE_CLASS = "LTJSBridge";
        let LTiOSJS = {
            initSDK : function() {
                this.printJsLog("LTiOSJS::initSDK()");
                callJavaStaticMethod(OC_LTSDK_MANAGER_CLASS, "initSDK");
            },
            
            setLogDebug : function (debug) {
                this.printJsLog("LTiOSJS::setLogDebug(" + debug + ")");
                callJavaStaticMethod(OC_LTSDK_MANAGER_CLASS, "setLogDebug:", debug);
            },
            
            printJsLog : function(msg) {
                if (undefined != msg && msg != null) {
                    callJavaStaticMethod(OC_BIRDGE_CLASS, "log:", msg);
                }
            },
            
            getUserCoin : function() {
                callJavaStaticMethod(OC_BIRDGE_CLASS, "getUserCoin");
            },
            
            addCoin : function(coin) {
                callJavaStaticMethod(OC_BIRDGE_CLASS, "addCoin:", coin);
            },
            
            showWithdraw : function(coin) {
                callJavaStaticMethod(OC_BIRDGE_CLASS, "showWithdraw");
            },

            showWithdrawIcon: function(styleId, left, top, dock) {
                callJavaStaticMethod(OC_BIRDGE_CLASS, "showWithdrawIcon:left:top:dock:", styleId, left, top, dock);
            },

            hideWithdrawIcon: function() {
                callJavaStaticMethod(OC_BIRDGE_CLASS, "hideWithdrawIcon");
            },

            showRedPack: function(params) {
                params = params || {}
                callJavaStaticMethod(OC_BIRDGE_CLASS, "showSceneRedPack:", JSON.stringify(params));
            }
        };
        window.LTiOSJS = LTiOSJS;
    }

    // LTJSSDK
    {
        let LTSDK = {
            isDebugLog: false,
            platformBridge: isIOS() ? window.LTiOSJS : (isAndroid() ? window.LTAndroidJS : null),

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

            ensureBridge: function() {
                if(!this.platformBridge) {
                    this.platformBridge = isIOS() ? window.LTiOSJS : (isAndroid() ? window.LTAndroidJS : null)
                }
            },

            initSDK: function() {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.initSDK();
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setLogDebug: function (debug) {
                this.ensureBridge()
                this.isDebugLog = debug;
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.setLogDebug(debug);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            printLog: function(msg) {
                this.ensureBridge()
                if (undefined != msg && null != msg && this.isDebugLog && this.platformBridge != null ) {
                    if (undefined != this.platformBridge && this.platformBridge != null) {
                        this.platformBridge.printJsLog(msg); 
                    } else {
                        LTJSSDK.printLog("You must run on Android or iOS.");
                    }
                }
            },

            getUserCoin: function(okCb, failCb) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.LTApiSharedListener.getUserCoinOkCb = okCb;
                    this.LTApiSharedListener.getUserCoinFailCb = failCb;
                    this.platformBridge.getUserCoin(); 
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            addCoin: function(coin, okCb, failCb) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.LTApiSharedListener.addCoinOkCb = okCb;
                    this.LTApiSharedListener.addCoinFailCb = failCb;
                    this.platformBridge.addCoin(coin); 
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            showWithdraw: function() {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.showWithdraw(); 
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            showWithdrawIcon: function(styleId, left, top, dock) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.showWithdrawIcon(styleId, left, top, dock); 
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            hideWithdrawIcon: function() {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.hideWithdrawIcon(); 
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            showRedPack: function(params, closeCb) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.LTApiSharedListener.redPackCloseCb = closeCb
                    this.platformBridge.showRedPack(params); 
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            }
        };
        window.LTJSSDK = LTSDK;
    }

    // LTAndroidRewardedVideoJS
    {
        let classJavaName = "com/leto/ad/js/LTRewardedVideoJSBridge";
        let LTAndroidRewardedVideoJS = {
          
            loadRewardedVideo : function (adId) {
                LTJSSDK.printLog("LTAndroidRewardedVideoJS-loadRewardedVideo");
                callJavaStaticMethod(classJavaName, "load", "(I)V", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTAndroidRewardedVideoJS-setAdListener");
                callJavaStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
            },

            hasAdReady : function (adId) {
                LTJSSDK.printLog("LTAndroidRewardedVideoJS-hasAdReady");
                return callJavaStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);
            },

            showAd: function(adId) {
                LTJSSDK.printLog("LTAndroidRewardedVideoJS-showAd:" + adId);
                callJavaStaticMethod(classJavaName, "show", "(I)V", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTAndroidRewardedVideoJS-destroy:" + adId);
                callJavaStaticMethod(classJavaName, "destroy", "(I)V", adId);
            }
        };

        window.LTAndroidRewardedVideoJS = LTAndroidRewardedVideoJS;
    }

    // LTiOSRewardedVideoJS
    {
        let OC_RV_WRAPPER_CLASS = "LTRewardedVideoWrapper";
        let LTiOSRewardedVideoJS = {
            loadRewardedVideo : function (adId) {
                LTJSSDK.printLog("LTiOSRewardedVideoJS::loadRewardedVideo(" + adId + ")");
                callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "loadRewardedVideo:", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSRewardedVideoJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
            },

            hasAdReady : function (adId) {
                LTJSSDK.printLog("LTiOSRewardedVideoJS::hasAdReady(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "rewardedVideoReady:", adId);
            },

            showAd : function(adId) {
                LTJSSDK.printLog("LTiOSRewardedVideoJS::showAd(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "show:", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTiOSRewardedVideoJS::destroy(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "destroy:", adId);
            }
        };

        window.LTiOSRewardedVideoJS = LTiOSRewardedVideoJS;
    }

    // LTRewardedVideoJSSDK
    {
        let LTRewardedVideoSDK = {
            platformBridge: isIOS() ? window.LTiOSRewardedVideoJS : (isAndroid() ? window.LTAndroidRewardedVideoJS : null),
            LTRewardedVideoListener : {
                developerCallback : null,

                onRewardedVideoAdLoaded : function (adId) {
                    LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdLoaded(" + adId + ")");
                    if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdLoaded != null && undefined != this.developerCallback.onRewardedVideoAdLoaded) {
                        this.developerCallback.onRewardedVideoAdLoaded(adId);
                    }
                },
                onRewardedVideoAdFailed : function(adId, errorInfo) {
                    LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdFailed(" + adId + ", " + errorInfo + ")");
                  if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdFailed != null && undefined != this.developerCallback.onRewardedVideoAdFailed) {
                        this.developerCallback.onRewardedVideoAdFailed(adId, errorInfo);
                    }
                },
                onRewardedVideoAdClosed : function(adId, callbackInfo) {
                    LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdClosed(" + adId + ", " + callbackInfo + ")");
                    if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdClosed != null && undefined != this.developerCallback.onRewardedVideoAdClosed) {
                        this.developerCallback.onRewardedVideoAdClosed(adId, callbackInfo);
                    }
                    LTRewardedVideoJSSDK.destroy(adId);
                },
                onReward : function(adId, callbackInfo) {
                    LTJSSDK.printLog("LTRewardedVideoJSSDK.LTRewardedVideoListener.onReward(" + adId + ", " + callbackInfo + ")");
                    if(this.developerCallback != null && this.developerCallback.onReward != null && undefined != this.developerCallback.onReward) {
                        this.developerCallback.onReward(adId, callbackInfo);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSRewardedVideoJS : (isAndroid() ? window.LTAndroidRewardedVideoJS : null)
            },
            
            loadRewardedVideo : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.loadRewardedVideo(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdLoaded",
                eventJSON[LoadFailCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdFailed",
                eventJSON[CloseCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdClosed",
                eventJSON[RewardCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onReward"

                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.setAdListener(JSON.stringify(eventJSON));
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }

                this.LTRewardedVideoListener.developerCallback = listener;
            },

            hasAdReady : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    return this.platformBridge.hasAdReady(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
                return false;
            },

            showAd : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.showAd(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            destroy: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.destroy(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            }
        };

        let LoadedCallbackKey = "RewardedVideoLoaded";
        let LoadFailCallbackKey = "RewardedVideoLoadFail";
        let CloseCallbackKey = "RewardedVideoClose";
        let RewardCallbackKey = "RewardedVideoReward";

        window.LTRewardedVideoJSSDK = LTRewardedVideoSDK;
    }

    // LTAndroidInterstitialJS
    {
        let classJavaName = "com/leto/ad/js/LTInterstitialJSBridge";
        let LTAndroidInterstitialJS = {
            loadInterstitial : function (adId) {
                LTJSSDK.printLog("Android-loadInterstitial");
                callJavaStaticMethod(classJavaName, "load", "(I)V", adId);
            },

            setAdListener: function (listener) {
                LTJSSDK.printLog("Android-setAdListener");
                callJavaStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
            },

            hasAdReady: function (adId) {
                 LTJSSDK.printLog("Android-hasAdReady");
                return callJavaStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);
            },

            showAd: function(adId) {
                LTJSSDK.printLog("Android-showAd:" + adId);
                callJavaStaticMethod(classJavaName, "show", "(I)V", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("Android-destroy:" + adId);
                callJavaStaticMethod(classJavaName, "destroy", "(I)V", adId);
            }
        };

        window.LTAndroidInterstitialJS = LTAndroidInterstitialJS;
    }

    // LTiOSInterstitialJS
    {
        let OC_WRAPPER_CLASS = "LTInterstitialAdWrapper";
        let LTiOSInterstitialJS = {
            loadInterstitial : function (adId) {
                LTJSSDK.printLog("LTiOSInterstitialJS::loadInterstitial(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "loadInterstitia:", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSInterstitialJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
            },

            hasAdReady : function (adId) {
                LTJSSDK.printLog("LTiOSInterstitialJS::hasAdReady(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "interstitialReady:", adId);
            },

            showAd : function(adId) {
                LTJSSDK.printLog("LTiOSInterstitialJS::showAd(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "show:", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTiOSInterstitialJS::destroy(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "destroy:", adId);
            }  
        };

        window.LTiOSInterstitialJS = LTiOSInterstitialJS;
    }

    // LTInterstitialJSSDK
    {
        let LTInterstitialSDK = {
            platformBridge: isIOS() ? window.LTiOSInterstitialJS : (isAndroid() ? window.LTAndroidInterstitialJS : null),

            LTInterstitialListener : {
                developerCallback : null,

                onInterstitialAdLoaded : function (adId) {
                    if(this.developerCallback != null && this.developerCallback.onInterstitialAdLoaded != null && undefined != this.developerCallback.onInterstitialAdLoaded) {
                        this.developerCallback.onInterstitialAdLoaded(adId);
                    }
                },

                onInterstitialAdLoadFail : function(adId, errorInfo) {
                  if(this.developerCallback != null && this.developerCallback.onInterstitialAdLoadFail != null && undefined != this.developerCallback.onInterstitialAdLoadFail) {
                        this.developerCallback.onInterstitialAdLoadFail(adId, errorInfo);
                    }
                },

                onInterstitialAdShow : function(adId, callbackInfo) {
                   if(this.developerCallback != null && this.developerCallback.onInterstitialAdShow != null && undefined != this.developerCallback.onInterstitialAdShow) {
                        this.developerCallback.onInterstitialAdShow(adId, callbackInfo);
                    }
                },

                onInterstitialAdClose : function(adId, callbackInfo) {
                    if(this.developerCallback != null && this.developerCallback.onInterstitialAdClose != null && undefined != this.developerCallback.onInterstitialAdClose) {
                        this.developerCallback.onInterstitialAdClose(adId, callbackInfo);
                    }
                    LTJSSDK.printLog(`onInterstitialAdClose, auto destroy for ${adId}`)
                    LTInterstitialJSSDK.destroy(adId)
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSInterstitialJS : (isAndroid() ? window.LTAndroidInterstitialJS : null)
            },
            
            loadInterstitial : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.loadInterstitial(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]="LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdLoaded",
                eventJSON[LoadFailCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdLoadFail",
                eventJSON[CloseCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdClose",
                eventJSON[ShowCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdShow"

                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                     this.platformBridge.setAdListener(JSON.stringify(eventJSON));
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }

                this.LTInterstitialListener.developerCallback = listener;
            },

            hasAdReady : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    return this.platformBridge.hasAdReady(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
                return false;
            },

            showAd : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.showAd(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            destroy: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.destroy(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },
        };

        let LoadedCallbackKey = "InterstitialLoaded";
        let LoadFailCallbackKey = "InterstitialLoadFail";
        let CloseCallbackKey = "InterstitialClose";
        let ShowCallbackKey = "InterstitialAdShow";

        window.LTInterstitialJSSDK = LTInterstitialSDK;
    }

    // LTAndroidFeedJS
    {
        let classJavaName = "com/leto/ad/js/LTFeedJSBridge";
        let LTAndroidFeedJS = {
            loadFeed : function (adId, params) {
                LTJSSDK.printLog("LTAndroidFeedJS-loadFeed");
                callJavaStaticMethod(classJavaName, "load", "(ILjava/lang/String;)V", adId, params);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTAndroidFeedJS-setAdListener");
                callJavaStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
            },

            hasAdReady : function (adId) {
                LTJSSDK.printLog("LTAndroidFeedJS-hasAdReady");
                return callJavaStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);
            },

            show: function(adId) {
                LTJSSDK.printLog("LTAndroidFeedJS-show:" + adId);
                callJavaStaticMethod(classJavaName, "show", "(I)V", adId);
            },

            hide: function(adId) {
                LTJSSDK.printLog("LTAndroidFeedJS-showAd:" + adId);
                callJavaStaticMethod(classJavaName, "hide", "(I)V", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTAndroidFeedJS-destroy:" + adId);
                callJavaStaticMethod(classJavaName, "destroy", "(I)V", adId);
            }
        };

        window.LTAndroidFeedJS = LTAndroidFeedJS;
    }

    // LTiOSFeedJS
    {
        let OC_RV_WRAPPER_CLASS = "LTFeedWrapper";
        let LTiOSFeedJS = {
            loadFeed : function (adId, params) {
                LTJSSDK.printLog("LTiOSFeedJS::loadFeed(" + adId + ")");
                callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "loadFeed:params:", adId, params);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSFeedJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
            },

            hasAdReady : function (adId) {
                LTJSSDK.printLog("LTiOSFeedJS::hasAdReady(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "feedReady:", adId);
            },

            show: function(adId) {
                LTJSSDK.printLog("LTiOSFeedJS::show(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "show:", adId);
            },

            hide: function(adId) {
                LTJSSDK.printLog("LTiOSFeedJS::hide(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "hide:", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTiOSFeedJS::destroy(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "destroy:", adId);
            }
        };

        window.LTiOSFeedJS = LTiOSFeedJS;
    }

    // LTFeedSDK
    {
        let LTFeedSDK = {
            platformBridge: isIOS() ? window.LTiOSFeedJS : (isAndroid() ? window.LTAndroidFeedJS : null),
            LTFeedListener : {
                developerCallback : null,

                onFeedAdLoaded : function (adId) {
                    LTJSSDK.printLog("LTFeedJSSDK.LTFeedListener.onFeedAdLoaded(" + adId + ")");
                    if(this.developerCallback != null && this.developerCallback.onFeedAdLoaded != null && undefined != this.developerCallback.onFeedAdLoaded) {
                        this.developerCallback.onFeedAdLoaded(adId);
                    }
                },
                onFeedAdFailed : function(adId, errorInfo) {
                    LTJSSDK.printLog("LTFeedJSSDK.LTFeedListener.onFeedAdFailed(" + adId + ", " + errorInfo + ")");
                    if(this.developerCallback != null && this.developerCallback.onFeedAdFailed != null && undefined != this.developerCallback.onFeedAdFailed) {
                        this.developerCallback.onFeedAdFailed(adId, errorInfo);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSFeedJS : (isAndroid() ? window.LTAndroidFeedJS : null)
            },
            
            load : function(adId, params) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.loadFeed(adId, params || "{}");
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdLoaded",
                eventJSON[FailedCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdFailed"

                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.setAdListener(JSON.stringify(eventJSON));
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }

                this.LTFeedListener.developerCallback = listener;
            },

            hasAdReady : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    return this.platformBridge.hasAdReady(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
                return false;
            },

            show: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.show(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            hide: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.hide(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            destroy: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.destroy(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            }
        };

        let LoadedCallbackKey = "FeedLoaded";
        let FailedCallbackKey = "FeedFailed";

        window.LTFeedJSSDK = LTFeedSDK;
    }

    // LTiOSExtendedJS
    {
        let OC_RV_WRAPPER_CLASS = "LTExtendedWrapper";
        let LTiOSExtendedJS = {
            load : function (adId, params) {
                if(typeof params == 'object') {
                    params = JSON.stringify(params)
                }
                LTJSSDK.printLog("LTiOSExtendedJS::load(" + adId + ")");
                callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "load:params:", adId, params);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSExtendedJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
            },

            show: function(adId, params) {
                if(typeof params == 'object') {
                    params = JSON.stringify(params)
                }
                LTJSSDK.printLog("LTiOSExtendedJS::show(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "show:params:", adId, params);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTiOSExtendedJS::destroy(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "destroy:", adId);
            },

            updateMyCoin: function(adId) {
                LTJSSDK.printLog("LTiOSExtendedJS::updateMyCoin(" + adId + ")");
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "updateMyCoin:", adId);
            },

            updateTitle: function(adId, title) {
                LTJSSDK.printLog("LTiOSExtendedJS::updateTitle:" + adId);
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "updateTitle:forId:", title, adId);
            },

            updateVideoButtonTitle: function(adId, title) {
                LTJSSDK.printLog("LTiOSExtendedJS::updateVideoButtonTitle:" + adId);
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "updateVideoButtonTitle:forId:", title, adId);
            },

            notify: function(adId, action) {
                LTJSSDK.printLog("LTiOSExtendedJS::notify:" + adId);
                return callJavaStaticMethod(OC_RV_WRAPPER_CLASS, "notify:forId:", action, adId);
            }
        };

        window.LTiOSExtendedJS = LTiOSExtendedJS;
    }

    // LTAndroidExtendedJS
    {
        let classJavaName = "com/leto/ad/js/LTExtendedJSBridge";
        let LTAndroidExtendedJS = {
            load : function (adId, params) {
                if(typeof params == 'object') {
                    params = JSON.stringify(params)
                }
                LTJSSDK.printLog("LTAndroidExtendedJS-load:" + params);
                callJavaStaticMethod(classJavaName, "load", "(ILjava/lang/String;)V", adId, params);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTAndroidExtendedJS-setAdListener");
                callJavaStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
            },

            show: function(adId, params) {
                if(typeof params == 'object') {
                    params = JSON.stringify(params)
                }
                LTJSSDK.printLog("LTAndroidExtendedJS-show:" + params);
                callJavaStaticMethod(classJavaName, "show", "(ILjava/lang/String;)V", adId, params);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTAndroidExtendedJS-destroy:" + adId);
                callJavaStaticMethod(classJavaName, "destroy", "(I)V", adId);
            },

            updateMyCoin: function(adId) {
                LTJSSDK.printLog("LTAndroidExtendedJS-updateMyCoin:" + adId);
                callJavaStaticMethod(classJavaName, "updateMyCoin", "(I)V", adId);
            },

            updateTitle: function(adId, title) {
                LTJSSDK.printLog("LTAndroidExtendedJS-updateTitle:" + adId);
                callJavaStaticMethod(classJavaName, "updateTitle", "(ILjava/lang/String;)V", adId, title);
            },

            updateVideoButtonTitle: function(adId, title) {
                LTJSSDK.printLog("LTAndroidExtendedJS-updateVideoButtonTitle:" + adId);
                callJavaStaticMethod(classJavaName, "updateVideoButtonTitle", "(ILjava/lang/String;)V", adId, title);
            },

            notify: function(adId, action) {
                LTJSSDK.printLog("LTAndroidExtendedJS-notify:" + adId);
                callJavaStaticMethod(classJavaName, "notify", "(II)V", adId, action);
            }
        };

        window.LTAndroidExtendedJS = LTAndroidExtendedJS;
    }

    // LTExtendedSDK
    {
        let LTExtendedSDK = {
            platformBridge: isIOS() ? window.LTiOSExtendedJS : (isAndroid() ? window.LTAndroidExtendedJS : null),
            LTExtendedListener : {
                developerCallback : null,

                onExtendedAdLoaded : function (adId) {
                    LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdLoaded(" + adId + ")");
                    if(this.developerCallback != null && this.developerCallback.onExtendedAdLoaded != null && undefined != this.developerCallback.onExtendedAdLoaded) {
                        this.developerCallback.onExtendedAdLoaded(adId);
                    }
                },
                onExtendedAdFailed : function(adId, errorInfo) {
                    LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdFailed(" + adId + ", " + errorInfo + ")");
                    if(this.developerCallback != null && this.developerCallback.onExtendedAdFailed != null && undefined != this.developerCallback.onExtendedAdFailed) {
                        this.developerCallback.onExtendedAdFailed(adId, errorInfo);
                    }
                },
                onExtendedAdClose : function(adId, res) {
                    LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdClose(" + adId + ", " + JSON.stringify(res) + ")");
                    if(this.developerCallback != null && this.developerCallback.onExtendedAdClose != null && undefined != this.developerCallback.onExtendedAdClose) {
                        this.developerCallback.onExtendedAdClose(adId, res);
                    }
                    LTExtendedJSSDK.destroy(adId)
                },
                onExtendedAdCustomClose : function(adId, res) {
                    LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdCustomClose(" + adId + ", " + JSON.stringify(res) + ")");
                    if(this.developerCallback != null && this.developerCallback.onExtendedAdCustomClose != null && undefined != this.developerCallback.onExtendedAdCustomClose) {
                        this.developerCallback.onExtendedAdCustomClose(adId, res);
                    }
                },
                onExtendedAdVideoClose : function(adId, res) {
                    LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdVideoClose(" + adId + ", " + JSON.stringify(res) + ")");
                    if(this.developerCallback != null && this.developerCallback.onExtendedAdVideoClose != null && undefined != this.developerCallback.onExtendedAdVideoClose) {
                        this.developerCallback.onExtendedAdVideoClose(adId, res);
                    }
                },
                onExtendedAdNormalClaim : function(adId) {
                    LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdNormalClaim(" + adId + ")");
                    if(this.developerCallback != null && this.developerCallback.onExtendedAdNormalClaim != null && undefined != this.developerCallback.onExtendedAdNormalClaim) {
                        this.developerCallback.onExtendedAdNormalClaim(adId);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSExtendedJS : (isAndroid() ? window.LTAndroidExtendedJS : null)
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdLoaded"
                eventJSON[FailedCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdFailed"
                eventJSON[CloseCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdClose"
                eventJSON[CustomCloseCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdCustomClose"
                eventJSON[VideoCloseCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdVideoClose"
                eventJSON[NormalClaimCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdNormalClaim"

                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.setAdListener(JSON.stringify(eventJSON));
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }

                this.LTExtendedListener.developerCallback = listener;
            },

            show: function(adId, params) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   params = params || {}
                   this.platformBridge.show(adId, params);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            load: function(adId, params) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   params = params || {}
                   this.platformBridge.load(adId, params);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            destroy: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.destroy(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            updateMyCoin: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.updateMyCoin(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            updateTitle: function(adId, title) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.updateTitle(adId, title);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            updateVideoButtonTitle: function(adId, title) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.updateVideoButtonTitle(adId, title);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            notify: function(adId, action) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.notify(adId, action);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            }
        };

        let LoadedCallbackKey = "ExtendedLoaded";
        let FailedCallbackKey = "ExtendedFailed";
        let CloseCallbackKey = "ExtendedClose";
        let CustomCloseCallbackKey = "ExtendedCustomClose";
        let VideoCloseCallbackKey = "ExtendedVideoClose";
        let NormalClaimCallbackKey = "ExtendedNormalClaim";

        window.LTExtendedJSSDK = LTExtendedSDK;
    }

    // LTAndroidBannerJS
    {
        let classJavaName = "com/leto/ad/js/LTBannerJSBridge";
        let LTAndroidBannerJS = {
            loadBanner : function (adId) {
                LTJSSDK.printLog("Android-loadBanner");
                callJavaStaticMethod(classJavaName, "load", "(I)V", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("Android-setAdListener");
                callJavaStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
            },

            hasAdReady : function (adId) {
                 LTJSSDK.printLog("Android-hasAdReady");
                return callJavaStaticMethod(classJavaName, "isAdReady", "(I)Z", adId);;
            },

            showAd : function(adId) {
                LTJSSDK.printLog("Android-showAdInPosistion");
                callJavaStaticMethod(classJavaName, "show", "(I)V", adId);
            },

            removeAd : function(adId) {
                 LTJSSDK.printLog("Android-removeAd");
                 callJavaStaticMethod(classJavaName, "remove", "(I)V", adId);
            },

            reShowAd : function(adId) {
                LTJSSDK.printLog("Android-reShowAd");
                callJavaStaticMethod(classJavaName, "reshow", "(I)V", adId);
            },

            hideAd : function(adId) {
                 LTJSSDK.printLog("Android-hideAd");
                 callJavaStaticMethod(classJavaName, "hide", "(I)V", adId);
            }
          
        };

        window.LTAndroidBannerJS = LTAndroidBannerJS;
    }

    // LTiOSBannerJS
    {
        let OC_WRAPPER_CLASS = "LTBannerAdWrapper";
        let LTiOSBannerJS = {
            loadBanner: function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::loadBanner(" + adId);
                callJavaStaticMethod(OC_WRAPPER_CLASS, "loadBanner:", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSBannerJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
            },
          
            hasAdReady : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::hasAdReady(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "bannerReady:", adId);
            },

            showAd : function(adId) { 
                LTJSSDK.printLog("LTiOSBannerJS::showAd(" + adId + ", " + position + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "show:", adId);
            },

            removeAd : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::removeAd(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "removeAd:", adId);
            },

            reShowAd : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::reShowAd(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "reShowAd:", adId);
            },

            hideAd : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::hideAd(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "hideAd:", adId);
            }
        };

        window.LTiOSBannerJS = LTiOSBannerJS;
    }

    // LTBannerSDK
    {
        let LTBannerSDK = {
            platformBridge: isIOS() ? window.LTiOSBannerJS : (isAndroid() ? window.LTAndroidBannerJS : null),
            LTBannerListener : {
                developerCallback : null,

                onBannerAdLoaded : function (adId) {
                    if(this.developerCallback != null && this.developerCallback.onBannerAdLoaded != null && undefined != this.developerCallback.onBannerAdLoaded) {
                        this.developerCallback.onBannerAdLoaded(adId);
                    }
                },

                onBannerAdLoadFail : function(adId, errorInfo) {
                  if(this.developerCallback != null && this.developerCallback.onBannerAdLoadFail != null && undefined != this.developerCallback.onBannerAdLoadFail) {
                        this.developerCallback.onBannerAdLoadFail(adId, errorInfo);
                    }
                },
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSBannerJS : (isAndroid() ? window.LTAndroidBannerJS : null)
            },
            
            loadBanner : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.loadBanner(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]= "LTBannerJSSDK.LTBannerListener.onBannerAdLoaded",
                eventJSON[LoadFailCallbackKey]=  "LTBannerJSSDK.LTBannerListener.onBannerAdLoadFail"

                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.setAdListener(JSON.stringify(eventJSON));
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }

                this.LTBannerListener.developerCallback = listener;
            },

            hasAdReady : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    return this.platformBridge.hasAdReady(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
                return false;
            },

            showAd: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.showAd(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            removeAd : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.removeAd(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            reShowAd : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.reShowAd(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            hideAd : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.hideAd(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },
        };

        let LoadedCallbackKey = "BannerLoaded";
        let LoadFailCallbackKey = "BannerLoadFail";

        window.LTBannerJSSDK = LTBannerSDK;
    }
})();