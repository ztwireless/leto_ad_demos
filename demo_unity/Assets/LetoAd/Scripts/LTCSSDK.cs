using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd.Android;
using LetoAd.IOS;

namespace LetoAd {
    public interface ILTCSSDK {
        void initSDK();
    }

    public class LTCSSDK : ILTCSSDK {
        private ILTCSSDK _pltSdk;

        public LTCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTCSSDK_ios();
            #endif
        }

        public void initSDK() {
            _pltSdk.initSDK();
        }
    }

    public interface ILTRewardedVideoListener {
        void onRewardedVideoLoaded(int adId);
	    void onRewardedVideoReward(int adId);
	    void onRewardedVideoClose(int adId, string res);
	    void onRewardedVideoLoadFail(int adId);
    }

    public interface ILTRewardedVideoCSSDK {
        void load(int adId);
        void show(int adId);
        void destroy(int adId);
        bool isAdReady(int adId);
        void setAdListener(ILTRewardedVideoListener listener);
    }

    public class LTRewardedVideoCSSDK : ILTRewardedVideoCSSDK {
        private ILTRewardedVideoCSSDK _pltSdk;

        public LTRewardedVideoCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTRewardedVideoCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTRewardedVideoCSSDK_ios();
            #endif
        }

        public void load(int adId) {
            _pltSdk.load(adId);
        }

        public void show(int adId) {
            _pltSdk.show(adId);
        }

        public void destroy(int adId) {
            _pltSdk.destroy(adId);
        }

        public bool isAdReady(int adId) {
            return _pltSdk.isAdReady(adId);
        }

        public void setAdListener(ILTRewardedVideoListener listener) {
            _pltSdk.setAdListener(listener);
        }
    }

    public interface ILTInterstitialListener {
        void onInterstitialLoaded(int adId);
        void onInterstitialClose(int adId);
        void onInterstitialLoadFail(int adId);
        void onInterstitialAdShow(int adId);
    }

    public interface ILTInterstitialCSSDK {
        void load(int adId);
        void show(int adId);
        void destroy(int adId);
        bool isAdReady(int adId);
        void setAdListener(ILTInterstitialListener listener);
    }

    public class LTInterstitialCSSDK: ILTInterstitialCSSDK {
        private ILTInterstitialCSSDK _pltSdk;

        public LTInterstitialCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTInterstitialCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTInterstitialCSSDK_ios();
            #endif
        }

        public void load(int adId) {
            _pltSdk.load(adId);
        }

        public void show(int adId) {
            _pltSdk.show(adId);
        }

        public void destroy(int adId) {
            _pltSdk.destroy(adId);
        }

        public bool isAdReady(int adId) {
            return _pltSdk.isAdReady(adId);
        }

        public void setAdListener(ILTInterstitialListener listener) {
            _pltSdk.setAdListener(listener);
        }
    }

    public interface ILTBannerListener {
        void onBannerLoaded(int adId);
        void onBannerLoadFail(int adId);
    }

    public interface ILTBannerCSSDK {
        void load(int adId);
        void show(int adId);
        void reShow(int adId);
        void hide(int adId);
        void remove(int adId);
        bool isAdReady(int adId);
        void setAdListener(ILTBannerListener listener);
    }

    public class LTBannerCSSDK : ILTBannerCSSDK {
        private ILTBannerCSSDK _pltSdk;

        public LTBannerCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTBannerCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTBannerCSSDK_ios();
            #endif
        }

        public void load(int adId) {
            _pltSdk.load(adId);
        }

        public void show(int adId) {
            _pltSdk.show(adId);
        }

        public void reShow(int adId) {
            _pltSdk.reShow(adId);
        }

        public void hide(int adId) {
            _pltSdk.hide(adId);
        }

        public void remove(int adId) {
            _pltSdk.remove(adId);
        }

        public bool isAdReady(int adId) {
            return _pltSdk.isAdReady(adId);
        }

        public void setAdListener(ILTBannerListener listener) {
            _pltSdk.setAdListener(listener);
        }
    }

    public interface ILTFeedListener {
        void onFeedLoaded(int adId);
        void onFeedFailed(int adId);
    }

    public interface ILTFeedCSSDK {
        void load(int adId, string param = "{}");
        void show(int adId);
        void hide(int adId);
        void destroy(int adId);
        bool isAdReady(int adId);
        void setAdListener(ILTFeedListener listener);
    }

    public class LTFeedCSSDK : ILTFeedCSSDK {
        private ILTFeedCSSDK _pltSdk;

        public LTFeedCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTFeedCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTFeedCSSDK_ios();
            #endif
        }

        public void load(int adId, string param) {
            _pltSdk.load(adId, param);
        }

        public void show(int adId) {
            _pltSdk.show(adId);
        }

        public void hide(int adId) {
            _pltSdk.hide(adId);
        }

        public void destroy(int adId) {
            _pltSdk.destroy(adId);
        }

        public bool isAdReady(int adId) {
            return _pltSdk.isAdReady(adId);
        }

        public void setAdListener(ILTFeedListener listener) {
            _pltSdk.setAdListener(listener);
        }
    }

    public interface ILTExtendedListener {
        void onExtendedLoaded(int adId);
        void onExtendedFailed(int adId, string errMsg);
        void onExtendedClose(int adId, string res);
        void onExtendedCustomClose(int adId, string res);
        void onExtendedVideoClose(int adId, string res);
        void onExtendedNormalClaim(int adId);
    }

    public interface ILTExtendedCSSDK {
        void load(int adId, string param = "{}");
        void show(int adId, string param = "{}");
        void destroy(int adId);
        void updateMyCoin(int adId);
        void updateTitle(int adId, string title);
        void updateVideoButtonTitle(int adId, string title);
        void notify(int adId, int action);
    }

    public class LTExtendedCSSDK : ILTExtendedCSSDK {
        
    }
}