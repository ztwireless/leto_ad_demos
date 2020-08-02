package com.leto.ad.cocosjs.utils;

public class Const {
    public static class RewardVideoCallback {
        public static final String LoadedCallbackKey = "RewardedVideoLoaded";
        public static final String LoadFailCallbackKey = "RewardedVideoLoadFail";
        public static final String CloseCallbackKey = "RewardedVideoClose";
        public static final String RewardCallbackKey = "RewardedVideoReward";
    }

    public static class InterstitialCallback {
        public static final String LoadedCallbackKey = "InterstitialLoaded";
        public static final String LoadFailCallbackKey = "InterstitialLoadFail";
        public static final String CloseCallbackKey = "InterstitialClose";
        public static final String ShowCallbackKey = "InterstitialAdShow";
    }

    public static class BannerCallback {
        public static final String LoadedCallbackKey = "BannerLoaded";
        public static final String LoadFailCallbackKey = "BannerLoadFail";
    }
}