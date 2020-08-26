package com.leto.ad.js;

import com.leto.ad.js.helper.FullVideoHelper;
import com.leto.ad.js.helper.IFullVideoListener;
import com.leto.ad.js.utils.LTLog;

import java.util.HashMap;

public class LTFullVideoJSBridge {
    private static final HashMap<Integer, FullVideoHelper> sHelperMap = new HashMap<>();

    private static String listenerJson;
    private static IFullVideoListener _cb; // for unity

    public static void setAdListener(String listener) {
        LTLog.d("full video setAdListener >>> " + listener);
        listenerJson = listener;
    }

    public static void setAdListener(IFullVideoListener cb) {
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
        FullVideoHelper helper = getHelper(adId);
        if (helper != null) {
            helper.setAdListener(listenerJson);
            helper.setAdListener(_cb);
            helper.load(adId);
        }
    }

    public static void show(int adId) {
        FullVideoHelper helper = getHelper(adId);
        if (helper != null) {
            helper.show();
        }
    }

    public static void remove(int adId) {
        FullVideoHelper helper = getHelper(adId);
        if (helper != null) {
            helper.destroy();
            sHelperMap.remove(adId);
        }
    }

    public static boolean isAdReady(int adId) {
        FullVideoHelper helper = getHelper(adId);
        if (helper != null) {
            return helper.isAdReady();
        }
        return false;
    }

    private static FullVideoHelper getHelper(int adId) {
        FullVideoHelper helper;

        if (!sHelperMap.containsKey(adId)) {
            helper = new FullVideoHelper();
            sHelperMap.put(adId, helper);
        } else {
            helper = sHelperMap.get(adId);
        }

        return helper;
    }
}
