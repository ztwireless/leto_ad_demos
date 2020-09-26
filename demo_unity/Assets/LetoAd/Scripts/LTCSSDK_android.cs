using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd;

#if UNITY_ANDROID || UNITY_EDITOR

namespace LetoAd.Android {
    class LTGetUserCoinListenerWrapper : AndroidJavaProxy, ILTGetUserCoinListenerInternal {
        private ILTGetUserCoinListener _listener;

        public LTGetUserCoinListenerWrapper(ILTGetUserCoinListener listener) : base("com.leto.ad.js.helper.IGetUserCoinListener") {
            _listener = listener;
        }

        public void onGetUserCoinFail(string res) {
            if(_listener != null) {
                LTGetCoinResult result = JsonUtility.FromJson<LTGetCoinResult>(res);
                _listener.onGetUserCoinFail(result.errMsg);
            }
        }

	    public void onGetUserCoinSuccess(string res) {
            if(_listener != null) {
                LTGetCoinResult result = JsonUtility.FromJson<LTGetCoinResult>(res);
                _listener.onGetUserCoinSuccess(result);
            }
        }
    }

    class LTAddCoinListenerWrapper : AndroidJavaProxy, ILTAddCoinListenerInternal {
        private ILTAddCoinListener _listener;

        public LTAddCoinListenerWrapper(ILTAddCoinListener listener) : base("com.leto.ad.js.helper.IAddCoinListener") {
            _listener = listener;
        }

        public void onAddCoinFail(string res) {
            if(_listener != null) {
                LTAddCoinResult result = JsonUtility.FromJson<LTAddCoinResult>(res);
                _listener.onAddCoinFail(result.errMsg);
            }
        }

	    public void onAddCoinSuccess(string res) {
            if(_listener != null) {
                LTAddCoinResult result = JsonUtility.FromJson<LTAddCoinResult>(res);
                _listener.onAddCoinSuccess(result);
            }
        }
    }

    class LTRedPackListenerWrapper : AndroidJavaProxy, ILTRedPackListenerInternal {
        private ILTRedPackListener _listener;

        public LTRedPackListenerWrapper(ILTRedPackListener listener) : base("com.leto.ad.js.helper.IRedPackListener") {
            _listener = listener;
        }

        public void onRedPackClose(string res) {
            if(_listener != null) {
                Debug.Log("onRedPackClose: " + res);
                LTRedPackResult result = JsonUtility.FromJson<LTRedPackResult>(res);
                Debug.Log("after from json, result is " + result);
                _listener.onRedPackClose(result);
            }
        }
    }

    public class LTCSSDK_android : ILTCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTJSBridge");
        }

        public void initSDK() {
            AndroidJavaClass player = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
            AndroidJavaObject actObj = player.GetStatic<AndroidJavaObject>("currentActivity");
            _javaSDKClass.CallStatic("initSDK", actObj);
        }

        public void getUserCoin(ILTGetUserCoinListener listener) {
            _javaSDKClass.CallStatic("getUserCoin", new LTGetUserCoinListenerWrapper(listener));
        }

        public void addCoin(int coin, ILTAddCoinListener listener) {
            _javaSDKClass.CallStatic("addCoin", coin, new LTAddCoinListenerWrapper(listener));
        }

        public void showWithdraw() {
            _javaSDKClass.CallStatic("showWithdraw");
        }

        public void showWithdrawIcon(int styleId, int left, int top, bool pinned, bool dock) {
            _javaSDKClass.CallStatic("showWithdrawIcon", styleId, left, top, pinned, dock);
        }

        public void hideWithdrawIcon() {
            _javaSDKClass.CallStatic("hideWithdrawIcon");
        }
        
        public void showRedPack(LTRedPackRequest req, ILTRedPackListener listener) {
            string param = JsonUtility.ToJson(req);
            _javaSDKClass.CallStatic("showSceneRedPack", param, new LTRedPackListenerWrapper(listener));
        }
    }

    class LTRewardedVideoListenerWrapper : AndroidJavaProxy, ILTRewardedVideoListenerInternal {
        private ILTRewardedVideoListener _listener;

        public LTRewardedVideoListenerWrapper(ILTRewardedVideoListener listener) : base("com.leto.ad.js.helper.IRewardedVideoListener") {
            _listener = listener;
        }

        public void onRewardedVideoLoaded(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onRewardedVideoLoaded(adId, info);
            }
        }

	    public void onRewardedVideoReward(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onRewardedVideoReward(adId, info);
            }
        }

	    public void onRewardedVideoClose(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onRewardedVideoClose(adId, info);
            }
        }

	    public void onRewardedVideoLoadFail(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onRewardedVideoLoadFail(adId, errMsg);
            }
        }

        public void onRewardedVideoShow(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onRewardedVideoShow(adId, info);
            }
        }

	    public void onRewardedVideoClick(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onRewardedVideoClick(adId, info);
            }
        }
    }

    public class LTRewardedVideoCSSDK_android : ILTRewardedVideoCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTRewardedVideoCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTRewardedVideoJSBridge");
        }

        public void load(int adId) {
            _javaSDKClass.CallStatic("load", adId);
        }

        public void show(int adId) {
            _javaSDKClass.CallStatic("show", adId);
        }

        public void destroy(int adId) {
            _javaSDKClass.CallStatic("destroy", adId);
        }

        public bool isAdReady(int adId) {
            return _javaSDKClass.CallStatic<bool>("isAdReady", adId);
        }

        public void setAdListener(ILTRewardedVideoListener listener) {
            _javaSDKClass.CallStatic("setAdListener", new LTRewardedVideoListenerWrapper(listener));
        }
    }

    class LTInterstitialListenerWrapper : AndroidJavaProxy, ILTInterstitialListenerInternal {
        private ILTInterstitialListener _listener;

        public LTInterstitialListenerWrapper(ILTInterstitialListener listener) : base("com.leto.ad.js.helper.IInterstitialListener") {
            _listener = listener;
        }

        public void onInterstitialLoaded(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onInterstitialLoaded(adId, info);
            }
        }

        public void onInterstitialClose(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onInterstitialClose(adId, info);
            }
        }

        public void onInterstitialLoadFail(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onInterstitialLoadFail(adId, errMsg);
            }
        }

        public void onInterstitialShow(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onInterstitialShow(adId, info);
            }
        }

        public void onInterstitialClick(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onInterstitialClick(adId, info);
            }
        }

        public void onInterstitialDestroy(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onInterstitialDestroy(adId, info);
            }
        }
    }

    public class LTInterstitialCSSDK_android : ILTInterstitialCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTInterstitialCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTInterstitialJSBridge");
        }

        public void load(int adId) {
            _javaSDKClass.CallStatic("load", adId);
        }

        public void show(int adId) {
            _javaSDKClass.CallStatic("show", adId);
        }

        public void destroy(int adId) {
            _javaSDKClass.CallStatic("destroy", adId);
        }

        public bool isAdReady(int adId) {
            return _javaSDKClass.CallStatic<bool>("isAdReady", adId);
        }

        public void setAdListener(ILTInterstitialListener listener) {
            _javaSDKClass.CallStatic("setAdListener", new LTInterstitialListenerWrapper(listener));
        }
    }

    class LTFullVideoListenerWrapper : AndroidJavaProxy, ILTFullVideoListenerInternal {
        private ILTFullVideoListener _listener;

        public LTFullVideoListenerWrapper(ILTFullVideoListener listener) : base("com.leto.ad.js.helper.IFullVideoListener") {
            _listener = listener;
        }

        public void onFullVideoLoaded(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFullVideoLoaded(adId, info);
            }
        }

        public void onFullVideoClose(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFullVideoClose(adId, info);
            }
        }

        public void onFullVideoFail(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onFullVideoFail(adId, errMsg);
            }
        }

        public void onFullVideoShow(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFullVideoShow(adId, info);
            }
        }

        public void onFullVideoClick(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFullVideoClick(adId, info);
            }
        }
    }

    public class LTFullVideoCSSDK_android : ILTFullVideoCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTFullVideoCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTFullVideoJSBridge");
        }

        public void load(int adId) {
            _javaSDKClass.CallStatic("load", adId);
        }

        public void show(int adId) {
            _javaSDKClass.CallStatic("show", adId);
        }

        public void destroy(int adId) {
            _javaSDKClass.CallStatic("destroy", adId);
        }

        public bool isAdReady(int adId) {
            return _javaSDKClass.CallStatic<bool>("isAdReady", adId);
        }

        public void setAdListener(ILTFullVideoListener listener) {
            _javaSDKClass.CallStatic("setAdListener", new LTFullVideoListenerWrapper(listener));
        }
    }

    class LTSplashListenerWrapper : AndroidJavaProxy, ILTSplashListenerInternal {
        private ILTSplashListener _listener;

        public LTSplashListenerWrapper(ILTSplashListener listener) : base("com.leto.ad.js.helper.ISplashListener") {
            _listener = listener;
        }

        public void onSplashLoaded(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onSplashLoaded(adId, info);
            }
        }

        public void onSplashClose(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onSplashClose(adId, info);
            }
        }

        public void onSplashFail(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onSplashFail(adId, errMsg);
            }
        }

        public void onSplashShow(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onSplashShow(adId, info);
            }
        }

        public void onSplashClick(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onSplashClick(adId, info);
            }
        }
    }

    public class LTSplashCSSDK_android : ILTSplashCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTSplashCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTSplashJSBridge");
        }

        public void load(int adId) {
            _javaSDKClass.CallStatic("load", adId);
        }

        public void show(int adId) {
            _javaSDKClass.CallStatic("show", adId);
        }

        public void destroy(int adId) {
            _javaSDKClass.CallStatic("destroy", adId);
        }

        public bool isAdReady(int adId) {
            return _javaSDKClass.CallStatic<bool>("isAdReady", adId);
        }

        public void setAdListener(ILTSplashListener listener) {
            _javaSDKClass.CallStatic("setAdListener", new LTSplashListenerWrapper(listener));
        }
    }

    class LTBannerListenerWrapper : AndroidJavaProxy, ILTBannerListenerInternal {
        private ILTBannerListener _listener;

        public LTBannerListenerWrapper(ILTBannerListener listener) : base("com.leto.ad.js.helper.IBannerListener") {
            _listener = listener;
        }

        public void onBannerLoaded(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onBannerLoaded(adId, info);
            }
        }

        public void onBannerLoadFail(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onBannerLoadFail(adId, errMsg);
            }
        }

        public void onBannerClick(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onBannerClick(adId, info);
            }
        }

        public void onBannerShow(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onBannerShow(adId, info);
            }
        }

        public void onBannerHide(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onBannerHide(adId, info);
            }
        }

        public void onBannerClose(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onBannerClose(adId, info);
            }
        }
    }

    public class LTBannerCSSDK_android : ILTBannerCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTBannerCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTBannerJSBridge");
        }

        public void load(int adId) {
            _javaSDKClass.CallStatic("load", adId);
        }

        public void show(int adId) {
            _javaSDKClass.CallStatic("show", adId);
        }

        public void reShow(int adId) {
            _javaSDKClass.CallStatic("reShow", adId);
        }

        public void hide(int adId) {
            _javaSDKClass.CallStatic("hide", adId);
        }

        public void remove(int adId) {
            _javaSDKClass.CallStatic("remove", adId);
        }

        public bool isAdReady(int adId) {
            return _javaSDKClass.CallStatic<bool>("isAdReady", adId);
        }

        public void setAdListener(ILTBannerListener listener) {
            _javaSDKClass.CallStatic("setAdListener", new LTBannerListenerWrapper(listener));
        }
    }

    class LTFeedListenerWrapper : AndroidJavaProxy, ILTFeedListenerInternal {
        private ILTFeedListener _listener;

        public LTFeedListenerWrapper(ILTFeedListener listener) : base("com.leto.ad.js.helper.IFeedListener") {
            _listener = listener;
        }

        public void onFeedLoaded(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFeedLoaded(adId, info);
            }
        }

        public void onFeedFailed(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onFeedFailed(adId, errMsg);
            }
        }

        public void onFeedShow(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFeedShow(adId, info);
            }
        }

        public void onFeedHide(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFeedHide(adId, info);
            }
        }

        public void onFeedClick(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFeedClick(adId, info);
            }
        }

        public void onFeedClose(int adId, string adInfo) {
            if(_listener != null) {
                LTAdInfo info = JsonUtility.FromJson<LTAdInfo>(adInfo);
                _listener.onFeedClose(adId, info);
            }
        }
    }

    public class LTFeedCSSDK_android : ILTFeedCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTFeedCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTFeedJSBridge");
        }

        public void load(int adId, LTFeedLoadParams param) {
            string s = JsonUtility.ToJson(param);
            _javaSDKClass.CallStatic("load", adId, s);
        }

        public void show(int adId) {
            _javaSDKClass.CallStatic("show", adId);
        }

        public void hide(int adId) {
            _javaSDKClass.CallStatic("hide", adId);
        }

        public void destroy(int adId) {
            _javaSDKClass.CallStatic("destroy", adId);
        }

        public bool isAdReady(int adId) {
            return _javaSDKClass.CallStatic<bool>("isAdReady", adId);
        }

        public void setAdListener(ILTFeedListener listener) {
            _javaSDKClass.CallStatic("setAdListener", new LTFeedListenerWrapper(listener));
        }
    }

    class LTExtendedListenerWrapper : AndroidJavaProxy, ILTExtendedListener {
        private ILTExtendedListener _listener;

        public LTExtendedListenerWrapper(ILTExtendedListener listener) : base("com.leto.ad.js.helper.IExtendedListener") {
            _listener = listener;
        }

        public void onExtendedLoaded(int adId) {
            if(_listener != null) {
                _listener.onExtendedLoaded(adId);
            }
        }

        public void onExtendedFailed(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onExtendedFailed(adId, errMsg);
            }
        }

        public void onExtendedShow(int adId) {
            if(_listener != null) {
                _listener.onExtendedShow(adId);
            }
        }

        public void onExtendedClose(int adId, string res) {
            if(_listener != null) {
                _listener.onExtendedClose(adId, res);
            }
        }

        public void onExtendedCustomClose(int adId, string res) {
            if(_listener != null) {
                _listener.onExtendedCustomClose(adId, res);
            }
        }

        public void onExtendedVideoClose(int adId, string res) {
            if(_listener != null) {
                _listener.onExtendedVideoClose(adId, res);
            }
        }

        public void onExtendedNormalClaim(int adId) {
            if(_listener != null) {
                _listener.onExtendedNormalClaim(adId);
            }
        }
    }

    public class LTExtendedCSSDK_android : ILTExtendedCSSDK {
        private AndroidJavaClass _javaSDKClass;

        public LTExtendedCSSDK_android() {
            _javaSDKClass = new AndroidJavaClass("com.leto.ad.js.LTExtendedJSBridge");
        }

        public void load(int adId, LTExtendedLoadParams param) {
            string s = JsonUtility.ToJson(param);
            _javaSDKClass.CallStatic("load", adId, s);
        }

        public void show(int adId, LTExtendedShowParams param) {
            string s = JsonUtility.ToJson(param);
            _javaSDKClass.CallStatic("show", adId, s);
        }

        public void destroy(int adId) {
            _javaSDKClass.CallStatic("destroy", adId);
        }

        public void updateMyCoin(int adId) {
            _javaSDKClass.CallStatic("updateMyCoin", adId);
        }

        public void updateTitle(int adId, string title) {
            _javaSDKClass.CallStatic("updateTitle", adId, title);
        }

        public void updateVideoButtonTitle(int adId, string title) {
            _javaSDKClass.CallStatic("updateVideoButtonTitle", adId, title);
        }

        public void notify(int adId, int action) {
            _javaSDKClass.CallStatic("notify", adId, action);
        }

        public void setAdListener(ILTExtendedListener listener) {
            _javaSDKClass.CallStatic("setAdListener", new LTExtendedListenerWrapper(listener));
        }
    }
}

#endif