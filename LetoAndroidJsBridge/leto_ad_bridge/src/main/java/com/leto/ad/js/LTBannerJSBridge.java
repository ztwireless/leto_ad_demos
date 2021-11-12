package com.leto.ad.js;

import com.leto.ad.js.helper.BannerHelper;
import com.leto.ad.js.helper.IBannerListener;
import com.leto.ad.js.utils.LTLog;

import java.util.HashMap;

public class LTBannerJSBridge {
    private static final HashMap<Integer, BannerHelper> sHelperMap = new HashMap<>();

    private static String listenerJson;
    private static IBannerListener _cb; // for unity

    public static void setAdListener(String listener) {
        LTLog.d("banner setAdListener >>> " + listener);
        listenerJson = listener;
    }

    public static void setAdListener(IBannerListener cb) {
        _cb = cb;
    }


    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void load(double adId, String styleJson) {
        load((int)adId, styleJson);
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
    public static void hide(double adId) {
        hide((int)adId);
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void reshow(double adId) {
        reshow((int)adId);
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void remove(double adId) {
        remove((int)adId);
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void destroy(double adId) {
        remove((int)adId);
    }

    /**
     * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
     */
    public static void isAdReady(double adId) {
        isAdReady((int)adId);
    }

    public static void load(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.setAdListener(listenerJson);
            helper.setAdListener(_cb);
            helper.load(adId);
        }
    }
    public static void load(int adId, String styleJson) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.setAdListener(listenerJson);
            helper.setAdListener(_cb);
            helper.load(adId, styleJson);
        }
    }

    public static void show(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.show();
        }
    }

    public static void hide(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.hide();
        }
    }

    public static void reShow(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.reShow();
        }
    }

    public static void remove(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.remove();
            sHelperMap.remove(adId);
        }
    }

    public static boolean isAdReady(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            return helper.isAdReady();
        }
        return false;
    }

    private static BannerHelper getHelper(int adId) {
        BannerHelper helper;

        if (!sHelperMap.containsKey(adId)) {
            helper = new BannerHelper();
            sHelperMap.put(adId, helper);
        } else {
            helper = sHelperMap.get(adId);
        }

        return helper;
    }
}
