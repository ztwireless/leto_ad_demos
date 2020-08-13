using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd;

#if UNITY_ANDROID

namespace LetoAd.Android {
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

        public void onBannerLoadFail(int adId) {
            if(_listener != null) {
                _listener.onBannerLoadFail(adId);
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

        public void load(int adId, string param) {
            _javaSDKClass.CallStatic("load", adId, param);
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
}

#endif