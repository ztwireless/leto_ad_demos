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

    public static class FeedCallback {
        public static final String LoadedCallbackKey = "FeedLoaded";
        public static final String FailedCallbackKey = "FeedFailed";
    }

    public static class ExtendedCallback {
        public static final String LoadedCallbackKey = "ExtendedLoaded";
        public static final String FailedCallbackKey = "ExtendedFailed";
        public static final String CloseCallbackKey = "ExtendedClose";
        public static final String CustomCloseCallbackKey = "ExtendedCustomClose";
        public static final String VideoCloseCallbackKey = "ExtendedVideoClose";
        public static final String NormalClaimCallbackKey = "ExtendedNormalClaim";
    }
}
