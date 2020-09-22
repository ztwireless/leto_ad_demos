package com.leto.ad.js;

import android.view.ViewGroup;

import com.leto.ad.js.helper.ISplashListener;
import com.leto.ad.js.helper.SplashHelper;
import com.leto.ad.js.utils.LTLog;

import java.util.HashMap;

public class LTSplashJSBridge {
    private static final HashMap<Integer, SplashHelper> sHelperMap = new HashMap<>();

    private static String listenerJson;
    private static ISplashListener _cb; // for unity

    public static void setAdListener(String listener) {
        LTLog.d("splash setAdListener >>> " + listener);
        listenerJson = listener;
    }

    public static void setAdListener(ISplashListener cb) {
        LTLog.d("splash ISplashListener");
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

    public static void load(int adId, ViewGroup container) {
        SplashHelper helper = getHelper(adId);
        if (helper != null) {
            helper.setAdListener(listenerJson);
            helper.setAdListener(_cb);
            helper.load(adId, container);
        }
    }

    public static void load(int adId) {
        load(adId, null);
    }

    public static void show(int adId) {
        SplashHelper helper = getHelper(adId);
        if (helper != null) {
            helper.show();
        }
    }

    public static void destroy(int adId) {
        SplashHelper helper = getHelper(adId);
        if (helper != null) {
            helper.destroy();
            sHelperMap.remove(adId);
        }
    }

    public static boolean isAdReady(int adId) {
        SplashHelper helper = getHelper(adId);
        if (helper != null) {
            return helper.isAdReady();
        }
        return false;
    }

    private static SplashHelper getHelper(int adId) {
        SplashHelper helper;
        if (!sHelperMap.containsKey(adId)) {
            helper = new SplashHelper();
            sHelperMap.put(adId, helper);
        } else {
            helper = sHelperMap.get(adId);
        }
        return helper;
    }
}
