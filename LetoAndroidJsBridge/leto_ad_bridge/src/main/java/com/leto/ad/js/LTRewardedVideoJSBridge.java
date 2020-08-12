package com.leto.ad.js;

import com.leto.ad.js.helper.IRewardedVideoListener;
import com.leto.ad.js.helper.RewardVideoHelper;
import com.leto.ad.js.utils.LTLog;

import java.util.HashMap;

public class LTRewardedVideoJSBridge {
	private static String listenerJson;
	private static IRewardedVideoListener _cb; // for Unity
	private static final HashMap<Integer, RewardVideoHelper> sHelperMap = new HashMap<>();

	public static void setAdListener(String listener) {
		LTLog.d("LTRewardedVideoJSBridge setAdListener >>> " + listener);
		listenerJson = listener;
	}

	/**
	 * 用于unity端设置一个事件回调
	 */
	public static void setAdListener(IRewardedVideoListener cb) {
		LTLog.d("LTRewardedVideoJSBridge setAdListener IRewardedVideoCallback");
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
		LTLog.d("LTRewardedVideoJSBridge load >>> " + adId);
		RewardVideoHelper helper = getHelper(adId);
		if (helper != null) {
			helper.setAdListener(listenerJson);
			helper.setAdListener(_cb);
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
