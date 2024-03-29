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

                onRewardedVideoAdLoaded : function (adId, adInfo) {
                    LTJSSDK.printLog(`LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdLoaded != null && undefined != this.developerCallback.onRewardedVideoAdLoaded) {
                        this.developerCallback.onRewardedVideoAdLoaded(adId, adInfo);
                    }
                },
                onRewardedVideoAdFailed : function(adId, errMsg) {
                    LTJSSDK.printLog(`LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdFailed(${adId}, ${errMsg})`);
                    if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdFailed != null && undefined != this.developerCallback.onRewardedVideoAdFailed) {
                        this.developerCallback.onRewardedVideoAdFailed(adId, errMsg);
                    }
                },
                onRewardedVideoAdClosed : function(adId, adInfo) {
                    LTJSSDK.printLog(`LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdClosed(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdClosed != null && undefined != this.developerCallback.onRewardedVideoAdClosed) {
                        this.developerCallback.onRewardedVideoAdClosed(adId, adInfo);
                    }
                    LTRewardedVideoSDK.load(adId)
                },
                onReward : function(adId, adInfo) {
                    LTJSSDK.printLog(`LTRewardedVideoJSSDK.LTRewardedVideoListener.onReward(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onReward != null && undefined != this.developerCallback.onReward) {
                        this.developerCallback.onReward(adId, adInfo);
                    }
                },
                onRewardedVideoAdShow : function(adId, adInfo) {
                    LTJSSDK.printLog(`LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdShow(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdShow != null && undefined != this.developerCallback.onRewardedVideoAdShow) {
                        this.developerCallback.onRewardedVideoAdShow(adId, adInfo);
                    }
                },
                onRewardedVideoAdClick : function(adId, adInfo) {
                    LTJSSDK.printLog(`LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdClick(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onRewardedVideoAdClick != null && undefined != this.developerCallback.onRewardedVideoAdClick) {
                        this.developerCallback.onRewardedVideoAdClick(adId, adInfo);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSRewardedVideoJS : (isAndroid() ? window.LTAndroidRewardedVideoJS : null)
            },
            
            load : function(adId) {
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
                eventJSON[ShowCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdShow",
                eventJSON[ClickCallbackKey]= "LTRewardedVideoJSSDK.LTRewardedVideoListener.onRewardedVideoAdClick",

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

            show : function(adId) {
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
        let ShowCallbackKey = "RewardedVideoShow";
        let ClickCallbackKey = "RewardedVideoClick";

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

                onInterstitialAdLoaded : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onInterstitialAdLoaded != null && undefined != this.developerCallback.onInterstitialAdLoaded) {
                        this.developerCallback.onInterstitialAdLoaded(adId, adInfo);
                    }
                },

                onInterstitialAdLoadFail : function(adId, errMsg) {
                  if(this.developerCallback != null && this.developerCallback.onInterstitialAdLoadFail != null && undefined != this.developerCallback.onInterstitialAdLoadFail) {
                        this.developerCallback.onInterstitialAdLoadFail(adId, errMsg);
                    }
                },

                onInterstitialAdShow : function(adId, adInfo) {
                   if(this.developerCallback != null && this.developerCallback.onInterstitialAdShow != null && undefined != this.developerCallback.onInterstitialAdShow) {
                        this.developerCallback.onInterstitialAdShow(adId, adInfo);
                    }
                },

                onInterstitialAdClose : function(adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onInterstitialAdClose != null && undefined != this.developerCallback.onInterstitialAdClose) {
                        this.developerCallback.onInterstitialAdClose(adId, adInfo);
                    }
                    LTJSSDK.printLog(`onInterstitialAdClose, auto destroy for ${adId}`)
                    LTInterstitialJSSDK.destroy(adId)
                },

                onInterstitialAdClick : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onInterstitialAdClick != null && undefined != this.developerCallback.onInterstitialAdClick) {
                        this.developerCallback.onInterstitialAdClick(adId, adInfo);
                    }
                },

                onInterstitialAdDestroy : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onInterstitialAdDestroy != null && undefined != this.developerCallback.onInterstitialAdDestroy) {
                        this.developerCallback.onInterstitialAdDestroy(adId, adInfo);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSInterstitialJS : (isAndroid() ? window.LTAndroidInterstitialJS : null)
            },
            
            load : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.loadInterstitial(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]="LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdLoaded"
                eventJSON[LoadFailCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdLoadFail"
                eventJSON[CloseCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdClose"
                eventJSON[ShowCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdShow"
                eventJSON[ClickCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdClick"
                eventJSON[DestroyCallbackKey]= "LTInterstitialJSSDK.LTInterstitialListener.onInterstitialAdDestroy"

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

            show : function(adId) {
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

        let LoadedCallbackKey = "InterstitialLoaded"
        let LoadFailCallbackKey = "InterstitialLoadFail"
        let CloseCallbackKey = "InterstitialClose"
        let ShowCallbackKey = "InterstitialShow"
        let ClickCallbackKey = "InterstitialClick"
        let DestroyCallbackKey = "InterstitialDestroy"

        window.LTInterstitialJSSDK = LTInterstitialSDK;
    }

    // LTAndroidFullVideoJS
    {
        let classJavaName = "com/leto/ad/js/LTFullVideoJSBridge";
        let LTAndroidFullVideoJS = {
            loadFullVideo : function (adId) {
                LTJSSDK.printLog("Android-loadFullVideo");
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

        window.LTAndroidFullVideoJS = LTAndroidFullVideoJS;
    }

    // LTiOSFullVideoJS
    {
        let OC_WRAPPER_CLASS = "LTFullVideoAdWrapper";
        let LTiOSFullVideoJS = {
            loadFullVideo : function (adId) {
                LTJSSDK.printLog("LTiOSFullVideoJS::loadFullVideo(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "loadFullVideo:", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSFullVideoJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
            },

            hasAdReady : function (adId) {
                LTJSSDK.printLog("LTiOSFullVideoJS::hasAdReady(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "fullVideoReady:", adId);
            },

            showAd : function(adId) {
                LTJSSDK.printLog("LTiOSFullVideoJS::showAd(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "show:", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTiOSFullVideoJS::destroy(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "destroy:", adId);
            }  
        };

        window.LTiOSFullVideoJS = LTiOSFullVideoJS;
    }

    // LTFullVideoJSSDK
    {
        let LTFullVideoSDK = {
            platformBridge: isIOS() ? window.LTiOSFullVideoJS : (isAndroid() ? window.LTAndroidFullVideoJS : null),

            LTFullVideoListener : {
                developerCallback : null,

                onFullVideoAdLoaded : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onFullVideoAdLoaded != null && undefined != this.developerCallback.onFullVideoAdLoaded) {
                        this.developerCallback.onFullVideoAdLoaded(adId, adInfo);
                    }
                },

                onFullVideoAdFail : function(adId, errMsg) {
                  if(this.developerCallback != null && this.developerCallback.onFullVideoAdFail != null && undefined != this.developerCallback.onFullVideoAdFail) {
                        this.developerCallback.onFullVideoAdFail(adId, errMsg);
                    }
                },

                onFullVideoAdShow : function(adId, adInfo) {
                   if(this.developerCallback != null && this.developerCallback.onFullVideoAdShow != null && undefined != this.developerCallback.onFullVideoAdShow) {
                        this.developerCallback.onFullVideoAdShow(adId, adInfo);
                    }
                },

                onFullVideoAdClose : function(adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onFullVideoAdClose != null && undefined != this.developerCallback.onFullVideoAdClose) {
                        this.developerCallback.onFullVideoAdClose(adId, adInfo);
                    }
                    LTFullVideoJSSDK.load(adId)
                },

                onFullVideoAdClick : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onFullVideoAdClick != null && undefined != this.developerCallback.onFullVideoAdClick) {
                        this.developerCallback.onFullVideoAdClick(adId, adInfo);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSFullVideoJS : (isAndroid() ? window.LTAndroidFullVideoJS : null)
            },
            
            load : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.loadFullVideo(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]="LTFullVideoJSSDK.LTFullVideoListener.onFullVideoAdLoaded",
                eventJSON[FailCallbackKey]= "LTFullVideoJSSDK.LTFullVideoListener.onFullVideoAdFail",
                eventJSON[CloseCallbackKey]= "LTFullVideoJSSDK.LTFullVideoListener.onFullVideoAdClose",
                eventJSON[ShowCallbackKey]= "LTFullVideoJSSDK.LTFullVideoListener.onFullVideoAdShow"
                eventJSON[ClickCallbackKey]= "LTFullVideoJSSDK.LTFullVideoListener.onFullVideoAdClick"

                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                     this.platformBridge.setAdListener(JSON.stringify(eventJSON));
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }

                this.LTFullVideoListener.developerCallback = listener;
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

            show : function(adId) {
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

        let LoadedCallbackKey = "FullVideoLoaded";
        let FailCallbackKey = "FullVideoFail";
        let CloseCallbackKey = "FullVideoClose";
        let ShowCallbackKey = "FullVideoShow";
        let ClickCallbackKey = "FullVideoClick";

        window.LTFullVideoJSSDK = LTFullVideoSDK;
    }

    // LTAndroidSplashJS
    {
        let classJavaName = "com/leto/ad/js/LTSplashJSBridge";
        let LTAndroidSplashJS = {
            loadSplash : function (adId) {
                LTJSSDK.printLog("Android-loadSplash");
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

        window.LTAndroidSplashJS = LTAndroidSplashJS;
    }

    // LTiOSSplashJS
    {
        let OC_WRAPPER_CLASS = "LTSplashAdWrapper";
        let LTiOSSplashJS = {
            loadSplash : function (adId) {
                LTJSSDK.printLog("LTiOSSplashJS::loadSplash(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "loadSplash:", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSSplashJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
            },

            hasAdReady : function (adId) {
                LTJSSDK.printLog("LTiOSSplashJS::hasAdReady(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "splashReady:", adId);
            },

            showAd : function(adId) {
                LTJSSDK.printLog("LTiOSSplashJS::showAd(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "show:", adId);
            },

            destroy: function(adId) {
                LTJSSDK.printLog("LTiOSSplashJS::destroy(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "destroy:", adId);
            }  
        };

        window.LTiOSSplashJS = LTiOSSplashJS;
    }

    // LTSplashJSSDK
    {
        let LTSplashSDK = {
            platformBridge: isIOS() ? window.LTiOSSplashJS : (isAndroid() ? window.LTAndroidSplashJS : null),

            LTSplashListener : {
                developerCallback : null,

                onSplashAdLoaded : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onSplashAdLoaded != null && undefined != this.developerCallback.onSplashAdLoaded) {
                        this.developerCallback.onSplashAdLoaded(adId, adInfo);
                    }
                },

                onSplashAdFail : function(adId, errMsg) {
                  if(this.developerCallback != null && this.developerCallback.onSplashAdFail != null && undefined != this.developerCallback.onSplashAdFail) {
                        this.developerCallback.onSplashAdFail(adId, errMsg);
                    }
                },

                onSplashAdShow : function(adId, adInfo) {
                   if(this.developerCallback != null && this.developerCallback.onSplashAdShow != null && undefined != this.developerCallback.onSplashAdShow) {
                        this.developerCallback.onSplashAdShow(adId, adInfo);
                    }
                },

                onSplashAdClose : function(adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onSplashAdClose != null && undefined != this.developerCallback.onSplashAdClose) {
                        this.developerCallback.onSplashAdClose(adId, adInfo);
                    }
                    LTJSSDK.printLog(`onSplashAdClose, auto destroy for ${adId}`)
                    LTSplashJSSDK.destroy(adId)
                },

                onSplashAdClick : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onSplashAdClick != null && undefined != this.developerCallback.onSplashAdClick) {
                        this.developerCallback.onSplashAdClick(adId, adInfo);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSSplashJS : (isAndroid() ? window.LTAndroidSplashJS : null)
            },
            
            load : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.loadSplash(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]="LTSplashJSSDK.LTSplashListener.onSplashAdLoaded",
                eventJSON[FailCallbackKey]= "LTSplashJSSDK.LTSplashListener.onSplashAdFail",
                eventJSON[CloseCallbackKey]= "LTSplashJSSDK.LTSplashListener.onSplashAdClose",
                eventJSON[ShowCallbackKey]= "LTSplashJSSDK.LTSplashListener.onSplashAdShow"
                eventJSON[ClickCallbackKey]= "LTSplashJSSDK.LTSplashListener.onSplashAdClick"

                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                     this.platformBridge.setAdListener(JSON.stringify(eventJSON));
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }

                this.LTSplashListener.developerCallback = listener;
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

            show : function(adId) {
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

        let LoadedCallbackKey = "SplashLoaded";
        let FailCallbackKey = "SplashFail";
        let CloseCallbackKey = "SplashClose";
        let ShowCallbackKey = "SplashShow";
        let ClickCallbackKey = "SplashClick";

        window.LTSplashJSSDK = LTSplashSDK;
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

                onFeedAdLoaded : function (adId, adInfo) {
                    LTJSSDK.printLog(`LTFeedJSSDK.LTFeedListener.onFeedAdLoaded(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onFeedAdLoaded != null && undefined != this.developerCallback.onFeedAdLoaded) {
                        this.developerCallback.onFeedAdLoaded(adId, adInfo);
                    }
                },
                onFeedAdFailed : function(adId, errMsg) {
                    LTJSSDK.printLog("LTFeedJSSDK.LTFeedListener.onFeedAdFailed(" + adId + ", " + errMsg + ")");
                    if(this.developerCallback != null && this.developerCallback.onFeedAdFailed != null && undefined != this.developerCallback.onFeedAdFailed) {
                        this.developerCallback.onFeedAdFailed(adId, errMsg);
                    }
                },
                onFeedAdShow : function (adId, adInfo) {
                    LTJSSDK.printLog(`LTFeedJSSDK.LTFeedListener.onFeedAdShow(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onFeedAdShow != null && undefined != this.developerCallback.onFeedAdShow) {
                        this.developerCallback.onFeedAdShow(adId, adInfo);
                    }
                },
                onFeedAdHide : function (adId, adInfo) {
                    LTJSSDK.printLog(`LTFeedJSSDK.LTFeedListener.onFeedAdHide(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onFeedAdHide != null && undefined != this.developerCallback.onFeedAdHide) {
                        this.developerCallback.onFeedAdHide(adId, adInfo);
                    }
                    LTJSSDK.printLog(`onFeedAdHide, auto destroy for ${adId}`)
                    LTFeedSDK.destroy(adId)
                },
                onFeedAdClick : function (adId, adInfo) {
                    LTJSSDK.printLog(`LTFeedJSSDK.LTFeedListener.onFeedAdClick(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onFeedAdClick != null && undefined != this.developerCallback.onFeedAdClick) {
                        this.developerCallback.onFeedAdClick(adId, adInfo);
                    }
                },
                onFeedAdClose : function (adId, adInfo) {
                    LTJSSDK.printLog(`LTFeedJSSDK.LTFeedListener.onFeedAdClose(${adId}, ${JSON.stringify(adInfo)})`);
                    if(this.developerCallback != null && this.developerCallback.onFeedAdClose != null && undefined != this.developerCallback.onFeedAdClose) {
                        this.developerCallback.onFeedAdClose(adId, adInfo);
                    }
                    LTFeedSDK.load(adId)
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
                eventJSON[LoadedCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdLoaded"
                eventJSON[FailedCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdFailed"
                eventJSON[ShowCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdShow"
                eventJSON[HideCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdHide"
                eventJSON[CloseCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdClose"
                eventJSON[ClickCallbackKey]= "LTFeedJSSDK.LTFeedListener.onFeedAdClick"

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
        let ShowCallbackKey = "FeedShow";
        let HideCallbackKey = "FeedHide";
        let ClickCallbackKey = "FeedClick";
        let CloseCallbackKey = "FeedClose";

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
                onExtendedAdShow : function (adId) {
                    LTJSSDK.printLog("LTExtendedJSSDK.LTExtendedListener.onExtendedAdShow(" + adId + ")");
                    if(this.developerCallback != null && this.developerCallback.onExtendedAdShow != null && undefined != this.developerCallback.onExtendedAdShow) {
                        this.developerCallback.onExtendedAdShow(adId);
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
                eventJSON[ShowCallbackKey]= "LTExtendedJSSDK.LTExtendedListener.onExtendedAdShow"
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
        let ShowCallbackKey = "ExtendedShow";
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
            load : function (adId) {
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

            show : function(adId) {
                LTJSSDK.printLog("Android-showAdInPosistion");
                callJavaStaticMethod(classJavaName, "show", "(I)V", adId);
            },

            remove : function(adId) {
                 LTJSSDK.printLog("Android-removeAd");
                 callJavaStaticMethod(classJavaName, "remove", "(I)V", adId);
            },

            reShow : function(adId) {
                LTJSSDK.printLog("Android-reShowAd");
                callJavaStaticMethod(classJavaName, "reShow", "(I)V", adId);
            },

            hide : function(adId) {
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
            load: function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::loadBanner(" + adId);
                callJavaStaticMethod(OC_WRAPPER_CLASS, "load:", adId);
            },

            setAdListener : function (listener) {
                LTJSSDK.printLog("LTiOSBannerJS::setAdListener(" + listener + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
            },
          
            hasAdReady : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::hasAdReady(" + adId + ")");
                return callJavaStaticMethod(OC_WRAPPER_CLASS, "bannerReady:", adId);
            },

            show : function(adId) { 
                LTJSSDK.printLog("LTiOSBannerJS::showAd(" + adId + ", " + position + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "show:", adId);
            },

            remove : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::removeAd(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "remove:", adId);
            },

            reShow : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::reShowAd(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "reShow:", adId);
            },

            hide : function(adId) {
                LTJSSDK.printLog("LTiOSBannerJS::hideAd(" + adId + ")");
                callJavaStaticMethod(OC_WRAPPER_CLASS, "hide:", adId);
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

                onBannerAdLoaded : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onBannerAdLoaded != null && undefined != this.developerCallback.onBannerAdLoaded) {
                        this.developerCallback.onBannerAdLoaded(adId, adInfo);
                    }
                },

                onBannerAdLoadFail : function(adId, errMsg) {
                    if(this.developerCallback != null && this.developerCallback.onBannerAdLoadFail != null && undefined != this.developerCallback.onBannerAdLoadFail) {
                        this.developerCallback.onBannerAdLoadFail(adId, errMsg);
                    }
                },

                onBannerAdClick : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onBannerAdClick != null && undefined != this.developerCallback.onBannerAdClick) {
                        this.developerCallback.onBannerAdClick(adId, adInfo);
                    }
                },

                onBannerAdShow : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onBannerAdShow != null && undefined != this.developerCallback.onBannerAdShow) {
                        this.developerCallback.onBannerAdShow(adId, adInfo);
                    }
                },

                onBannerAdHide : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onBannerAdHide != null && undefined != this.developerCallback.onBannerAdHide) {
                        this.developerCallback.onBannerAdHide(adId);
                    }
                },

                onBannerAdClose : function (adId, adInfo) {
                    if(this.developerCallback != null && this.developerCallback.onBannerAdClose != null && undefined != this.developerCallback.onBannerAdClose) {
                        this.developerCallback.onBannerAdClose(adId, adInfo);
                    }
                }
            },

            ensureBridge: function() {
                this.platformBridge = isIOS() ? window.LTiOSBannerJS : (isAndroid() ? window.LTAndroidBannerJS : null)
            },
            
            load : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                    this.platformBridge.load(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            setAdListener : function(listener) {
                let eventJSON = {};
                eventJSON[LoadedCallbackKey]= "LTBannerJSSDK.LTBannerListener.onBannerAdLoaded",
                eventJSON[LoadFailCallbackKey]=  "LTBannerJSSDK.LTBannerListener.onBannerAdLoadFail"
                eventJSON[ClickCallbackKey]=  "LTBannerJSSDK.LTBannerListener.onBannerAdClick"
                eventJSON[ShowCallbackKey]=  "LTBannerJSSDK.LTBannerListener.onBannerAdShow"
                eventJSON[HideCallbackKey]=  "LTBannerJSSDK.LTBannerListener.onBannerAdHide"
                eventJSON[CloseCallbackKey]=  "LTBannerJSSDK.LTBannerListener.onBannerAdClose"

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

            show: function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.show(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            remove : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.remove(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            reShow : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.reShow(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },

            hide : function(adId) {
                this.ensureBridge()
                if (undefined != this.platformBridge && this.platformBridge != null) {
                   this.platformBridge.hide(adId);
                } else {
                    LTJSSDK.printLog("You must run on Android or iOS.");
                }
            },
        };

        let LoadedCallbackKey = "BannerLoaded";
        let LoadFailCallbackKey = "BannerLoadFail";
        let ClickCallbackKey = "BannerClick";
        let ShowCallbackKey = "BannerShow";
        let HideCallbackKey = "BannerHide";
        let CloseCallbackKey = "BannerClose";

        window.LTBannerJSSDK = LTBannerSDK;
    }
})();