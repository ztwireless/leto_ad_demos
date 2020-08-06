package com.leto.ad.js;

import com.leto.ad.js.helper.RewardVideoHelper;
import com.leto.ad.js.utils.LTLog;

import java.util.HashMap;

public class LTRewardedVideoJSBridge {
	private static String listenerJson;
	private static final HashMap<Integer, RewardVideoHelper> sHelperMap = new HashMap<>();

	public static void setAdListener(String listener) {
		LTLog.d("LTRewardedVideoJSBridge setAdListener >>> " + listener);
		listenerJson = listener;
	}

	public static void load(int adId) {
		LTLog.d("LTRewardedVideoJSBridge load >>> " + adId);
		RewardVideoHelper helper = getHelper(adId);
		if (helper != null) {
			helper.setAdListener(listenerJson);
			helper.loadRewardedVideo(adId);
		}
	}

	public static void show(int adId) {
		LTLog.d("LTRewardedVideoJSBridge show >>> " + adId);
		RewardVideoHelper helper = getHelper(adId);
		if (helper != null) {
			helper.showVideo();
		}
	}

	public static void destroy(int adId) {
		LTLog.d("LTRewardedVideoJSBridge destroy >>> " + adId);
		RewardVideoHelper helper = getHelper(adId);
		if (helper != null) {
			helper.destroy();
			sHelperMap.remove(adId);
		}
	}

	public static boolean isAdReady(int adId) {
		LTLog.d("LTRewardedVideoJSBridge isAdReady >>> " + adId);
		RewardVideoHelper helper = getHelper(adId);
		if (helper != null) {
			return helper.isAdReady();
		}
		return false;
	}

	private static RewardVideoHelper getHelper(int adId) {
		RewardVideoHelper helper;
		if (!sHelperMap.containsKey(adId)) {
			helper = new RewardVideoHelper();
			sHelperMap.put(adId, helper);
		} else {
			helper = sHelperMap.get(adId);
		}
		return helper;
	}
}
