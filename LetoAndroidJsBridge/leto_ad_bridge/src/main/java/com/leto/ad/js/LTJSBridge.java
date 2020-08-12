package com.leto.ad.js;

import android.app.Activity;
import android.util.Log;

import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;
import com.mgc.leto.game.base.LetoCore;
import com.mgc.leto.game.base.utils.BaseAppUtil;

import org.json.JSONException;
import org.json.JSONObject;

public class LTJSBridge {
	private static Activity _act = null;
	private static LetoAdApi _api = null;
	private static LetoAdApi.WithdrawIcon _withdrawIcon;

	public static void initSDK() {
		if(_act == null) {
			JSPluginUtil.init();
			_act = JSPluginUtil.getActivity();
			LetoCore.init(_act.getApplicationContext());
			_api = new LetoAdApi(_act);
			LTLog.d("initSDK:" + BaseAppUtil.getChannelID(_act));
		}
	}

	public static void initSDK(Activity act) {
		if(_act == null) {
			_act = act;
			LetoCore.init(_act.getApplicationContext());
			_api = new LetoAdApi(_act);
			LTLog.d("initSDK:" + BaseAppUtil.getChannelID(_act));
			JSPluginUtil.init();
		} else {
			_act = act;
		}
	}

	public static void setLogDebug(boolean isDebug) {
		LTLog.d("setLogDebug:" + isDebug);
		LTLog.setLogDebug(isDebug);
	}

	public static LetoAdApi getApi() {
		return _api;
	}

	public static void getUserCoin() {
		_api.getUserCoin(new LetoAdApi.ILetoAdApiCallback() {
			@Override
			public void onApiEvent(JSONObject res) {
				String js = "";
				if(res.optInt("errCode", 0) != 0) {
					js = String.format("LTJSSDK.LTApiSharedListener.onGetUserCoinFail(%s);", res.toString());
				} else {
					js = String.format("LTJSSDK.LTApiSharedListener.onGetUserCoinSuccess(%s);", res.toString());
				}
				JSPluginUtil.runJs(js);
			}
		});
	}

	/**
	 * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
	 */
	public static void addCoin(double coin) {
		addCoin((int)coin);
	}

	public static void addCoin(int coin) {
		_api.addCoin(coin, new LetoAdApi.ILetoAdApiCallback() {
			@Override
			public void onApiEvent(JSONObject res) {
				String js = "";
				if(res.optInt("errCode", 0) != 0) {
					js = String.format("LTJSSDK.LTApiSharedListener.onAddCoinFail(%s);", res.toString());
				} else {
					js = String.format("LTJSSDK.LTApiSharedListener.onAddCoinSuccess(%s);", res.toString());
				}
				JSPluginUtil.runJs(js);
			}
		});
	}

	public static void showWithdraw() {
		_api.showWithdraw();
	}

	/**
	 * Laya的jsbridge封装只支持double类型的参数, 所以定义一个double类型的重载
	 */
	public static void showWithdrawIcon(double styleId, double left, double top, boolean pinned, boolean dock) {
		showWithdrawIcon((int)styleId, (int)left, (int)top, pinned, dock);
	}

	public static void showWithdrawIcon(final int styleId, final int left, final int top, final boolean pinned, final boolean dock) {
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				try {
					_withdrawIcon = _api.createWithdrawIcon(styleId);
					JSONObject params = new JSONObject();
					params.put("left", left);
					params.put("top", top);
					params.put("pinned", pinned);
					params.put("dock", dock);
					_withdrawIcon.show(params);
				} catch(JSONException e) {
				}
			}
		});
	}

	public static void hideWithdrawIcon() {
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if(_withdrawIcon != null) {
					_withdrawIcon.hide();
				}
			}
		});
	}

	public static void showSceneRedPack(final String params) {
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				try {
					JSONObject j = new JSONObject(params);
					LetoAdApi.RedPack redPack = _api.showSceneRedPack(j);
					redPack.onClose(new LetoAdApi.ILetoAdApiCallback() {
						@Override
						public void onApiEvent(final JSONObject res) {
							String js = String.format("LTJSSDK.LTApiSharedListener.onRedPackClose(%s);", res.toString());
							JSPluginUtil.runJs(js);
						}
					});
				} catch(Throwable e) {
					Log.d("test", "ff");
				}
			}
		});
	}
}
