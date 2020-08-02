package com.leto.ad.cocosjs;

import android.app.Activity;

import com.leto.ad.cocosjs.utils.JSPluginUtil;
import com.leto.ad.cocosjs.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;
import com.mgc.leto.game.base.LetoCore;
import com.mgc.leto.game.base.utils.BaseAppUtil;

public class LTJSBridge {
	private static Activity _act = JSPluginUtil.getActivity();
	private static LetoAdApi _api;

	public static void initSDK() {
		LTLog.d("initSDK:" + BaseAppUtil.getChannelID(_act));
		LetoCore.init(_act.getApplicationContext());
		_api = new LetoAdApi(_act);
	}

	public static void setLogDebug(boolean isDebug) {
		LTLog.d("setLogDebug:" + isDebug);
		LTLog.setLogDebug(isDebug);
	}

	public static LetoAdApi getApi() {
		return _api;
	}
}
