package com.leto.ad.js;

import com.leto.ad.js.helper.BannerHelper;
import com.leto.ad.js.utils.LTLog;

import java.util.HashMap;

public class LTBannerJSBridge {
    private static final HashMap<Integer, BannerHelper> sHelperMap = new HashMap<>();

    private static String listenerJson;

    public static void setAdListener(String listener) {
        LTLog.d("banner setAdListener >>> " + listener);
        listenerJson = listener;
    }

    public static void load(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.setAdListener(listenerJson);
            helper.loadBanner(adId);
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
            helper.hideBanner();
        }
    }

    public static void reshow(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.reshowBanner();
        }
    }

    public static void remove(int adId) {
        BannerHelper helper = getHelper(adId);
        if (helper != null) {
            helper.removeBanner();
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
