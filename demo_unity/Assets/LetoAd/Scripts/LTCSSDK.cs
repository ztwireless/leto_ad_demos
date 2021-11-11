using System.Collections;
using System.Collections.Generic;
using UnityEngine;

#if UNITY_ANDROID || UNITY_EDITOR
    using LetoAd.Android;
#endif

#if UNITY_IOS || UNITY_EDITOR
    using LetoAd.IOS;
#endif

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

    [System.Serializable]
    public class LTAdInfo {
        public string adAppId;
        public string adPlaceId;
        public string adPlatform;
        public int adPlatformId;
        public string adSourceId;
        public string adSourceName;
        public string adSourceTag;
        public int adSourceIndex;
        public int ecpm;
        public bool isDefault;
        public string rewardName;
        public int rewardNumber;
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

    public interface ILTCheckRealNameListener {
        void onCheckRealNameResult(int errCode, string errMsg);
    }
    
    public interface ILTCSSDK {
        void initSDK();
        void getUserCoin(ILTGetUserCoinListener listener);
        void addCoin(int coin, ILTAddCoinListener listener);
        void showWithdraw();
        void showWithdrawIcon(int styleId, int left, int top, bool pinned, bool dock);
        void hideWithdrawIcon();
        void showRedPack(LTRedPackRequest req, ILTRedPackListener listener);
        void checkRealName(ILTCheckRealNameListener listener);
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

        public void checkRealName(ILTCheckRealNameListener listener) {
            _pltSdk.checkRealName(listener);
        }
    }

    public interface ILTRewardedVideoListenerInternal {
        void onRewardedVideoLoaded(int adId, string adInfo);
	    void onRewardedVideoReward(int adId, string adInfo);
	    void onRewardedVideoClose(int adId, string adInfo);
	    void onRewardedVideoLoadFail(int adId, string errMsg);
        void onRewardedVideoShow(int adId, string adInfo);
	    void onRewardedVideoClick(int adId, string adInfo);
    }

    public interface ILTRewardedVideoListener {
        void onRewardedVideoLoaded(int adId, LTAdInfo adInfo);
	    void onRewardedVideoReward(int adId, LTAdInfo adInfo);
	    void onRewardedVideoClose(int adId, LTAdInfo adInfo);
	    void onRewardedVideoLoadFail(int adId, string errMsg);
        void onRewardedVideoShow(int adId, LTAdInfo adInfo);
	    void onRewardedVideoClick(int adId, LTAdInfo adInfo);
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

    public interface ILTInterstitialListenerInternal {
        void onInterstitialLoaded(int adId, string adInfo);
        void onInterstitialClose(int adId, string adInfo);
        void onInterstitialLoadFail(int adId, string errMsg);
        void onInterstitialShow(int adId, string adInfo);
        void onInterstitialClick(int adId, string adInfo);
        void onInterstitialDestroy(int adId, string adInfo);
    }

    public interface ILTInterstitialListener {
        void onInterstitialLoaded(int adId, LTAdInfo adInfo);
        void onInterstitialClose(int adId, LTAdInfo adInfo);
        void onInterstitialLoadFail(int adId, string errMsg);
        void onInterstitialShow(int adId, LTAdInfo adInfo);
        void onInterstitialClick(int adId, LTAdInfo adInfo);
        void onInterstitialDestroy(int adId, LTAdInfo adInfo);
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

    public interface ILTBannerListenerInternal {
        void onBannerLoaded(int adId, string adInfo);
        void onBannerLoadFail(int adId, string errMsg);
        void onBannerClick(int adId, string adInfo);
        void onBannerShow(int adId, string adInfo);
        void onBannerHide(int adId, string adInfo);
        void onBannerClose(int adId, string adInfo);
    }

    public interface ILTBannerListener {
        void onBannerLoaded(int adId, LTAdInfo adInfo);
        void onBannerLoadFail(int adId, string errMsg);
        void onBannerClick(int adId, LTAdInfo adInfo);
        void onBannerShow(int adId, LTAdInfo adInfo);
        void onBannerHide(int adId, LTAdInfo adInfo);
        void onBannerClose(int adId, LTAdInfo adInfo);
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

    [System.Serializable]
    public class LTFeedStyle {
        public int maxHeight;
    }

    [System.Serializable]
    public class LTFeedLoadParams {
        public LTFeedStyle style = new LTFeedStyle();
    }

    public interface ILTFeedListenerInternal {
        void onFeedLoaded(int adId, string adInfo);
        void onFeedFailed(int adId, string errMsg);
        void onFeedShow(int adId, string adInfo);
        void onFeedHide(int adId, string adInfo);
        void onFeedClick(int adId, string adInfo);
        void onFeedClose(int adId, string adInfo);
    }

    public interface ILTFeedListener {
        void onFeedLoaded(int adId, LTAdInfo adInfo);
        void onFeedFailed(int adId, string errMsg);
        void onFeedShow(int adId, LTAdInfo adInfo);
        void onFeedHide(int adId, LTAdInfo adInfo);
        void onFeedClick(int adId, LTAdInfo adInfo);
        void onFeedClose(int adId, LTAdInfo adInfo);
    }

    public interface ILTFeedCSSDK {
        void load(int adId, LTFeedLoadParams param = null);
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

        public void load(int adId, LTFeedLoadParams param) {
            if(param == null) {
                param = new LTFeedLoadParams();
            }
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

    [System.Serializable]
    public class LTExtendedStyle {
        public string icon;
        public string title = "";
        public string video_button_title = "";
        public bool show_my_coin = false;
        public bool show_normal_button = false;
        public string normal_button_title = "";
    }

    [System.Serializable]
    public class LTExtendedLoadParams {
        public LTExtendedStyle style = new LTExtendedStyle();
    }

    public interface ILTExtendedListener {
        void onExtendedLoaded(int adId);
        void onExtendedFailed(int adId, string errMsg);
        void onExtendedShow(int adId);
        void onExtendedClose(int adId, string res);
        void onExtendedCustomClose(int adId, string res);
        void onExtendedVideoClose(int adId, string res);
        void onExtendedNormalClaim(int adId);
    }

    public interface ILTExtendedCSSDK {
        void load(int adId, LTExtendedLoadParams param = null);
        void show(int adId, LTExtendedShowParams param = null);
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

        public void load(int adId, LTExtendedLoadParams param) {
            if(param == null) {
                param = new LTExtendedLoadParams();
            }
            _pltSdk.load(adId, param);
        }

        public void show(int adId, LTExtendedShowParams param) {
            if(param == null) {
                param = new LTExtendedShowParams();
            }
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

    public interface ILTFullVideoListenerInternal {
        void onFullVideoLoaded(int adId, string adInfo);
        void onFullVideoFail(int adId, string errMsg);
        void onFullVideoClick(int adId, string adInfo);
        void onFullVideoShow(int adId, string adInfo);
        void onFullVideoClose(int adId, string adInfo);
    }

    public interface ILTFullVideoListener {
        void onFullVideoLoaded(int adId, LTAdInfo adInfo);
        void onFullVideoFail(int adId, string errMsg);
        void onFullVideoClick(int adId, LTAdInfo adInfo);
        void onFullVideoShow(int adId, LTAdInfo adInfo);
        void onFullVideoClose(int adId, LTAdInfo adInfo);
    }

    public interface ILTFullVideoCSSDK {
        void load(int adId);
        void show(int adId);
        void destroy(int adId);
        bool isAdReady(int adId);
        void setAdListener(ILTFullVideoListener listener);
    }

    public class LTFullVideoCSSDK: ILTFullVideoCSSDK {
        private ILTFullVideoCSSDK _pltSdk;

        public LTFullVideoCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTFullVideoCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTFullVideoCSSDK_ios();
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

        public void setAdListener(ILTFullVideoListener listener) {
            _pltSdk.setAdListener(listener);
        }
    }

    public interface ILTSplashListenerInternal {
        void onSplashLoaded(int adId, string adInfo);
        void onSplashFail(int adId, string errMsg);
        void onSplashClick(int adId, string adInfo);
        void onSplashShow(int adId, string adInfo);
        void onSplashClose(int adId, string adInfo);
    }

    public interface ILTSplashListener {
        void onSplashLoaded(int adId, LTAdInfo adInfo);
        void onSplashFail(int adId, string errMsg);
        void onSplashClick(int adId, LTAdInfo adInfo);
        void onSplashShow(int adId, LTAdInfo adInfo);
        void onSplashClose(int adId, LTAdInfo adInfo);
    }

    public interface ILTSplashCSSDK {
        void load(int adId);
        void show(int adId);
        void destroy(int adId);
        bool isAdReady(int adId);
        void setAdListener(ILTSplashListener listener);
    }

    public class LTSplashCSSDK: ILTSplashCSSDK {
        private ILTSplashCSSDK _pltSdk;

        public LTSplashCSSDK() {
            #if UNITY_ANDROID
                _pltSdk = new LTSplashCSSDK_android();
            #elif UNITY_IOS
                _pltSdk = new LTSplashCSSDK_ios();
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

        public void setAdListener(ILTSplashListener listener) {
            _pltSdk.setAdListener(listener);
        }
    }
}