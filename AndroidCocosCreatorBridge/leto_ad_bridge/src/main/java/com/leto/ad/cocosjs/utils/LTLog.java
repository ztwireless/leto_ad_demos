package com.leto.ad.cocosjs.utils;

import android.util.Log;

public class LTLog {
	private static final String TAG = JSPluginUtil.TAG;
	static boolean isDebug = true;

	public static void d(String msg) {
		if (isDebug) {
			Log.e(TAG, msg);
		}
	}

	public static void setLogDebug(boolean debug) {
		isDebug = debug;
	}
}
