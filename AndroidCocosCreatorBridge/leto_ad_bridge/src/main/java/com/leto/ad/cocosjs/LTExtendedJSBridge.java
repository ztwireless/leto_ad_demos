package com.leto.ad.cocosjs;

import com.leto.ad.cocosjs.helper.ExtendedHelper;
import com.leto.ad.cocosjs.utils.LTLog;

import java.util.HashMap;

public class LTExtendedJSBridge {
	private static String listenerJson;
	private static final HashMap<Integer, ExtendedHelper> sHelperMap = new HashMap<>();

	public static void setAdListener(String listener) {
		LTLog.d("LTExtendedJSBridge setAdListener >>> " + listener);
		listenerJson = listener;
	}

	public static void load(int adId, String params) {
		LTLog.d("LTExtendedJSBridge load >>> " + params);
		ExtendedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.setAdListener(listenerJson);
			helper.load(adId, params);
		}
	}

	public static void show(int adId, String params) {
		LTLog.d("LTExtendedJSBridge show >>> " + adId);
		ExtendedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.show(params);
		}
	}

	public static void destroy(int adId) {
		LTLog.d("LTExtendedJSBridge destroy >>> " + adId);
		ExtendedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.destroy();
			sHelperMap.remove(adId);
		}
	}

	public static void updateMyCoin(int adId) {
		LTLog.d("LTExtendedJSBridge updateMyCoin >>> " + adId);
		ExtendedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.updateMyCoin();
		}
	}

	public static void updateTitle(int adId, String title) {
		LTLog.d("LTExtendedJSBridge updateTitle >>> " + adId);
		ExtendedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.updateTitle(title);
		}
	}

	public static void updateVideoButtonTitle(int adId, String title) {
		LTLog.d("LTExtendedJSBridge updateVideoButtonTitle >>> " + adId);
		ExtendedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.updateVideoButtonTitle(title);
		}
	}

	public static void notify(int adId, int action) {
		LTLog.d("LTExtendedJSBridge notify >>> " + adId);
		ExtendedHelper helper = getHelper(adId);
		if (helper != null) {
			helper.notify(action);
		}
	}

	private static ExtendedHelper getHelper(int adId) {
		ExtendedHelper helper;
		if (!sHelperMap.containsKey(adId)) {
			helper = new ExtendedHelper();
			sHelperMap.put(adId, helper);
		} else {
			helper = sHelperMap.get(adId);
		}
		return helper;
	}
}
