﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd;

#if UNITY_IOS || UNITY_EDITOR

namespace LetoAd.IOS {
    public class LTCSSDK_ios : ILTCSSDK {
        public LTCSSDK_ios() {
            // TODO
        }

        public void initSDK() {
            // TODO
        }

        public void getUserCoin(ILTGetUserCoinListener listener) {
            // TODO
        }

        public void addCoin(int coin, ILTAddCoinListener listener) {
            // TODO
        }

        public void showWithdraw() {
            // TODO
        }

        public void showWithdrawIcon(int styleId, int left, int top, bool pinned, bool dock) {
            // TODO
        }

        public void hideWithdrawIcon() {
            // TODO
        }
        
        public void showRedPack(LTRedPackRequest req, ILTRedPackListener listener) {
            // TODO
        }

        public void checkRealName(ILTCheckRealNameListener listener) {
            // TODO
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
        public void load(int adId, string styleJsonStr) {

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