using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd;

namespace LetoAd.IOS {
    public class LTCSSDK_ios : ILTCSSDK {
        public LTCSSDK_ios() {

        }

        public void initSDK() {
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

        public void load(int adId, string param) {

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
}

