package com.leto.ad.cocosjs;

import com.leto.ad.cocosjs.helper.FeedHelper;
import com.leto.ad.cocosjs.utils.LTLog;

import java.util.HashMap;

public class LTFeedJSBridge {
	private static String listenerJson;
	private static final HashMap<Integer, FeedHelper> sHelperMap = new HashMap<>();

	public static void setAdListener(String listener) {
		LTLog.d("LTFeedJSBridge setAdListener >>> " + listener);
		listenerJson = listener;
	}

	public static void load(int adId) {
		LTLog.d("LTFeedJSBridge load >>> " + adId);
		FeedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.setAdListener(listenerJson);
			helper.load(adId);
		}
	}

	public static void show(int adId) {
		LTLog.d("LTFeedJSBridge show >>> " + adId);
		FeedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.show();
		}
	}

	public static void hide(int adId) {
		LTLog.d("LTFeedJSBridge hide >>> " + adId);
		FeedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.hide();
		}
	}

	public static void destroy(int adId) {
		LTLog.d("LTFeedJSBridge destroy >>> " + adId);
		FeedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.destroy();
			sHelperMap.remove(adId);
		}
	}

	public static boolean isAdReady(int adId) {
		LTLog.d("LTFeedJSBridge isAdReady >>> " + adId);
		FeedHelper helper = getHelper(adId);
		if (helper != null) {
			return helper.isAdReady();
		}
		return false;
	}

	private static FeedHelper getHelper(int adId) {
		FeedHelper helper;
		if (!sHelperMap.containsKey(adId)) {
			helper = new FeedHelper();
			sHelperMap.put(adId, helper);
		} else {
			helper = sHelperMap.get(adId);
		}
		return helper;
	}
}
