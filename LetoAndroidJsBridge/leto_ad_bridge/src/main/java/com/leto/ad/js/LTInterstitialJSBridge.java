package com.leto.ad.js;

import com.leto.ad.js.helper.IInterstitialListener;
import com.leto.ad.js.helper.InterstitialHelper;
import com.leto.ad.js.utils.LTLog;

import java.util.HashMap;

public class LTInterstitialJSBridge {
    private static final HashMap<Integer, InterstitialHelper> sHelperMap = new HashMap<>();

    private static String listenerJson;
    private static IInterstitialListener _cb; // for unity

    public static void setAdListener(String listener) {
        LTLog.d("interstitial setAdListener >>> " + listener);
        listenerJson = listener;
    }

    public static void setAdListener(IInterstitialListener cb) {
        _cb = cb;
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void load(double adId) {
        load((int)adId);
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void show(double adId) {
        show((int)adId);
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void destroy(double adId) {
        destroy((int)adId);
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void isAdReady(double adId) {
        isAdReady((int)adId);
    }

    public static void load(int adId) {
        InterstitialHelper helper = getHelper(adId);
        if (helper != null) {
            helper.setAdListener(listenerJson);
            helper.setAdListener(_cb);
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
