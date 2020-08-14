using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd.Android;
using LetoAd.IOS;

namespace LetoAd {
    [System.Serializable]
    public class LTCommonResult {
        public int errCode;
        public string errMsg;
    }

    [System.Serializable]
    public class LTGetCoinResult : LTCommonResult {
        public int coin;
    }

    [System.Serializable]
    public class LTAddCoinResult : LTCommonResult {
        public int coin;
    }

    [System.Serializable]
    public class LTLocalLimit {
        public int limit; // 累计值
        public int max_award; // 最大奖励
        public int min_award; // 最小奖励
        public int video_ratio; // 视频翻倍系数

        public LTLocalLimit(int limit, int max_award, int min_award, int video_ratio) {
            this.limit = limit;
            this.max_award = max_award;
            this.min_award = min_award;
            this.video_ratio = video_ratio;
        }
    }

    [System.Serializable]
    public class LTRedPackRequest {
        public int workflow;
        public LTLocalLimit[] local_limits;
    }

    [System.Serializable]
    public class LTRedPackResult {
        public bool success;
        public bool abort;
        public int add_coin;
    }

    public interface ILTRedPackListenerInternal {
        void onRedPackClose(string res);
    }

    public interface ILTRedPackListener {
        void onRedPackClose(LTRedPackResult result);
    }

    public interface ILTGetUserCoinListenerInternal {
	    void onGetUserCoinFail(string res);
	    void onGetUserCoinSuccess(string res);
    }

    public interface ILTGetUserCoinListener {
	    void onGetUserCoinFail(string errMsg);
	    void onGetUserCoinSuccess(LTGetCoinResult result);
    }

    public interface ILTAddCoinListenerInternal {
        void onAddCoinFail(string res);
	    void onAddCoinSuccess(string res);
    }

    public interface ILTAddCoinListener {
        void onAddCoinFail(string errMsg);
	    void onAddCoinSuccess(LTAddCoinResult result);
    }

    public interface ILTCSSDK {
        void initSDK();
        void getUserCoin(ILTGetUserCoinListener listener);
        void addCoin(int coin, ILTAddCoinListener listener);
        void showWithdraw();
        void showWithdrawIcon(int styleId, int left, int top, bool pinned, bool dock);
        void hideWithdrawIcon();
        void showRedPack(LTRedPackRequest req, ILTRedPackListener listener);
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

        public void getUserCoin(ILTGetUserCoinListener listener) {
            _pltSdk.getUserCoin(listener);
        }

        public void addCoin(int coin, ILTAddCoinListener listener) {
            _pltSdk.addCoin(coin, listener);
        }

        public void showWithdraw() {
            _pltSdk.showWithdraw();
        }

        public void showWithdrawIcon(int styleId, int left, int top, bool pinned, bool dock) {
            _pltSdk.showWithdrawIcon(styleId, left, top, pinned, dock);
        }

        public void hideWithdrawIcon() {
            _pltSdk.hideWithdrawIcon();
        }

        public void showRedPack(LTRedPackRequest req, ILTRedPackListener listener) {
            _pltSdk.showRedPack(req, listener);
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

    [System.Serializable]
    public class LTExtendedShowParams {
        public int coin = 1;
        public int ratio = 1;
        public string custom_close = "";
        public bool custom_logic = false;
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
        void show(int adId, LTExtendedShowParams param);
        void destroy(int adId);
        void updateMyCoin(int adId);
        void updateTitle(int adId, string title);
        void updateVideoButtonTitle(int adId, string title);
        void notify(int adId, int action);
        void setAdListener(ILTExtendedListener listener);
    }

    public class LTExtendedCSSDK : ILTExtendedCSSDK {
        private ILTExtendedCSSDK _pltSdk;

        public LTExtendedCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTExtendedCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTExtendedCSSDK_ios();
            #endif
        }

        public void load(int adId, string param) {
            _pltSdk.load(adId, param);
        }

        public void show(int adId, LTExtendedShowParams param) {
            _pltSdk.show(adId, param);
        }

        public void destroy(int adId) {
            _pltSdk.destroy(adId);
        }

        public void updateMyCoin(int adId) {
            _pltSdk.updateMyCoin(adId);
        }

        public void updateTitle(int adId, string title) {
            _pltSdk.updateTitle(adId, title);
        }

        public void updateVideoButtonTitle(int adId, string title) {
            _pltSdk.updateVideoButtonTitle(adId, title);
        }

        public void notify(int adId, int action) {
            _pltSdk.notify(adId, action);
        }

        public void setAdListener(ILTExtendedListener listener) {
            _pltSdk.setAdListener(listener);
        }
    }
}