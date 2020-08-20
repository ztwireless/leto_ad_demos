using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd;

#if UNITY_ANDROID

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

    class LTRewardedVideoListenerWrapper : AndroidJavaProxy, ILTRewardedVideoListener {
        private ILTRewardedVideoListener _listener;

        public LTRewardedVideoListenerWrapper(ILTRewardedVideoListener listener) : base("com.leto.ad.js.helper.IRewardedVideoListener") {
            _listener = listener;
        }

        public void onRewardedVideoLoaded(int adId) {
            if(_listener != null) {
                _listener.onRewardedVideoLoaded(adId);
            }
        }

	    public void onRewardedVideoReward(int adId) {
            if(_listener != null) {
                _listener.onRewardedVideoReward(adId);
            }
        }

	    public void onRewardedVideoClose(int adId, string res) {
            if(_listener != null) {
                _listener.onRewardedVideoClose(adId, res);
            }
        }

	    public void onRewardedVideoLoadFail(int adId) {
            if(_listener != null) {
                _listener.onRewardedVideoLoadFail(adId);
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

    class LTInterstitialListenerWrapper : AndroidJavaProxy, ILTInterstitialListener {
        private ILTInterstitialListener _listener;

        public LTInterstitialListenerWrapper(ILTInterstitialListener listener) : base("com.leto.ad.js.helper.IInterstitialListener") {
            _listener = listener;
        }

        public void onInterstitialLoaded(int adId) {
            if(_listener != null) {
                _listener.onInterstitialLoaded(adId);
            }
        }

        public void onInterstitialClose(int adId) {
            if(_listener != null) {
                _listener.onInterstitialClose(adId);
            }
        }

        public void onInterstitialLoadFail(int adId) {
            if(_listener != null) {
                _listener.onInterstitialLoadFail(adId);
            }
        }

        public void onInterstitialAdShow(int adId) {
            if(_listener != null) {
                _listener.onInterstitialAdShow(adId);
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

    class LTBannerListenerWrapper : AndroidJavaProxy, ILTBannerListener {
        private ILTBannerListener _listener;

        public LTBannerListenerWrapper(ILTBannerListener listener) : base("com.leto.ad.js.helper.IBannerListener") {
            _listener = listener;
        }

        public void onBannerLoaded(int adId) {
            if(_listener != null) {
                _listener.onBannerLoaded(adId);
            }
        }

        public void onBannerLoadFail(int adId, string errMsg) {
            if(_listener != null) {
                _listener.onBannerLoadFail(adId, errMsg);
            }
        }

        public void onBannerClick(int adId) {
            if(_listener != null) {
                _listener.onBannerClick(adId);
            }
        }

        public void onBannerShow(int adId) {
            if(_listener != null) {
                _listener.onBannerShow(adId);
            }
        }

        public void onBannerHide(int adId) {
            if(_listener != null) {
                _listener.onBannerHide(adId);
            }
        }

        public void onBannerClose(int adId) {
            if(_listener != null) {
                _listener.onBannerClose(adId);
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

    class LTFeedListenerWrapper : AndroidJavaProxy, ILTFeedListener {
        private ILTFeedListener _listener;

        public LTFeedListenerWrapper(ILTFeedListener listener) : base("com.leto.ad.js.helper.IFeedListener") {
            _listener = listener;
        }

        public void onFeedLoaded(int adId) {
            if(_listener != null) {
                _listener.onFeedLoaded(adId);
            }
        }

        public void onFeedFailed(int adId) {
            if(_listener != null) {
                _listener.onFeedFailed(adId);
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