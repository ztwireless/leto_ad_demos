package com.leto.ad.cocosjs;

import com.leto.ad.cocosjs.helper.InterstitialHelper;
import com.leto.ad.cocosjs.utils.LTLog;

import java.util.HashMap;

public class LTInterstitialJSBridge {
    private static final HashMap<Integer, InterstitialHelper> sHelperMap = new HashMap<>();

    private static String listenerJson;

    public static void setAdListener(String listener) {
        LTLog.d("interstitial setAdListener >>> " + listener);
        listenerJson = listener;
    }

    public static void load(int adId) {
        InterstitialHelper helper = getHelper(adId);
        if (helper != null) {
            helper.setAdListener(listenerJson);
            helper.loadInterstitial(adId);
        }
    }

    public static void show(int adId) {
        InterstitialHelper helper = getHelper(adId);
        if (helper != null) {
            helper.showInterstitial();
        }
    }

    public static void destroy(int adId) {
        InterstitialHelper helper = getHelper(adId);
        if (helper != null) {
            helper.destroy();
            sHelperMap.remove(adId);
        }
    }

    public static boolean isAdReady(int adId) {
        InterstitialHelper helper = getHelper(adId);
        if (helper != null) {
            return helper.isAdReady();
        }
        return false;
    }

    private static InterstitialHelper getHelper(int adId) {
        InterstitialHelper helper;
        if (!sHelperMap.containsKey(adId)) {
            helper = new InterstitialHelper();
            sHelperMap.put(adId, helper);
        } else {
            helper = sHelperMap.get(adId);
        }
        return helper;
    }
}
