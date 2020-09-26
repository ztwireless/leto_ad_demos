using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd;

#if UNITY_IOS || UNITY_EDITOR

namespace LetoAd.IOS {
    public class LTCSSDK_ios : ILTCSSDK {
        public LTCSSDK_ios() {

        }

        public void initSDK() {
            // TODO
        }

        public void getUserCoin(ILTGetUserCoinListener listener) {

        }

        public void addCoin(int coin, ILTAddCoinListener listener) {

        }

        public void showWithdraw() {

        }

        public void showWithdrawIcon(int styleId, int left, int top, bool pinned, bool dock) {

        }

        public void hideWithdrawIcon() {

        }
        
        public void showRedPack(LTRedPackRequest req, ILTRedPackListener listener) {

        }
    }

    public class LTRewardedVideoCSSDK_ios : ILTRewardedVideoCSSDK {
        public LTRewardedVideoCSSDK_ios() {
        }

        public void load(int adId) {
            // TODO
        }

        public void show(int adId) {
            // TODO
        }

        public void destroy(int adId) {
            // TODO
        }

        public bool isAdReady(int adId) {
            // TODO
            return false;
        }

        public void setAdListener(ILTRewardedVideoListener listener) {
            // TODO
        }
    }

    public class LTInterstitialCSSDK_ios : ILTInterstitialCSSDK {
        public void load(int adId) {
            // TODO
        }

        public void show(int adId) {
            // TODO
        }

        public void destroy(int adId) {
            // TODO
        }

        public bool isAdReady(int adId) {
            // TODO
            return false;
        }

        public void setAdListener(ILTInterstitialListener listener) {
            // TODO
        }
    }

    public class LTFullVideoCSSDK_ios : ILTFullVideoCSSDK {
        public void load(int adId) {
            // TODO
        }

        public void show(int adId) {
            // TODO
        }

        public void destroy(int adId) {
            // TODO
        }

        public bool isAdReady(int adId) {
            // TODO
            return false;
        }

        public void setAdListener(ILTFullVideoListener listener) {
            // TODO
        }
    }

    public class LTSplashCSSDK_ios : ILTSplashCSSDK {
        public void load(int adId) {
            // TODO
        }

        public void show(int adId) {
            // TODO
        }

        public void destroy(int adId) {
            // TODO
        }

        public bool isAdReady(int adId) {
            // TODO
            return false;
        }

        public void setAdListener(ILTSplashListener listener) {
            // TODO
        }
    }

    public class LTBannerCSSDK_ios : ILTBannerCSSDK {
        public void load(int adId) {

        }
        
        public void show(int adId) {

        }

        public void reShow(int adId) {

        }

        public void hide(int adId) {

        }

        public void remove(int adId) {

        }

        public bool isAdReady(int adId) {
            return false;
        }

        public void setAdListener(ILTBannerListener listener) {

        }
    }

    public class LTFeedCSSDK_ios : ILTFeedCSSDK {
        public LTFeedCSSDK_ios() {

        }

        public void load(int adId, LTFeedLoadParams param) {

        }

        public void show(int adId) {

        }

        public void hide(int adId) {

        }

        public void destroy(int adId) {

        }

        public bool isAdReady(int adId) {
            return false;
        }

        public void setAdListener(ILTFeedListener listener) {
            
        }
    }

    public class LTExtendedCSSDK_ios : ILTExtendedCSSDK {
        public void load(int adId, LTExtendedLoadParams param) {

        }

        public void show(int adId, LTExtendedShowParams param) {

        }

        public void destroy(int adId) {

        }

        public void updateMyCoin(int adId) {

        }

        public void updateTitle(int adId, string title) {

        }

        public void updateVideoButtonTitle(int adId, string title) {

        }

        public void notify(int adId, int action) {
            
        }

        public void setAdListener(ILTExtendedListener listener) {
        }
    }
}

#endif