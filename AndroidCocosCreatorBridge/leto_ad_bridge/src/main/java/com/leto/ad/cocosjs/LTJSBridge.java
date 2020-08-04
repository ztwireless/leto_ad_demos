package com.leto.ad.cocosjs;

import android.app.Activity;
import android.util.Log;

import com.leto.ad.cocosjs.utils.JSPluginUtil;
import com.leto.ad.cocosjs.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;
import com.mgc.leto.game.base.LetoCore;
import com.mgc.leto.game.base.utils.BaseAppUtil;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

public class LTJSBridge {
	private static Activity _act = JSPluginUtil.getActivity();
	private static LetoAdApi _api;
	private static LetoAdApi.WithdrawIcon _withdrawIcon;

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

	public static void getUserCoin() {
		_api.getUserCoin(new LetoAdApi.ILetoAdApiCallback() {
			@Override
			public void onApiEvent(final JSONObject res) {
				JSPluginUtil.runOnGLThread(new Runnable() {
					@Override
					public void run() {
						JSPluginUtil.runOnGLThread(new Runnable() {
							@Override
							public void run() {
								String js = "";
								if(res.optInt("errCode", 0) != 0) {
									js = String.format("LTJSSDK.LTApiSharedListener.onGetUserCoinFail(%s);", res.toString());
								} else {
									js = String.format("LTJSSDK.LTApiSharedListener.onGetUserCoinSuccess(%s);", res.toString());
								}
								Cocos2dxJavascriptJavaBridge.evalString(js);
							}
						});
					}
				});
			}
		});
	}

	public static void addCoin(int coin) {
		_api.addCoin(coin, new LetoAdApi.ILetoAdApiCallback() {
			@Override
			public void onApiEvent(final JSONObject res) {
				JSPluginUtil.runOnGLThread(new Runnable() {
					@Override
					public void run() {
						String js = "";
						if(res.optInt("errCode", 0) != 0) {
							js = String.format("LTJSSDK.LTApiSharedListener.onAddCoinFail(%s);", res.toString());
						} else {
							js = String.format("LTJSSDK.LTApiSharedListener.onAddCoinSuccess(%s);", res.toString());
						}
						Cocos2dxJavascriptJavaBridge.evalString(js);
					}
				});
			}
		});
	}

	public static void showWithdraw() {
		_api.showWithdraw();
	}

	public static void showWithdrawIcon(final int styleId, final int left, final int top, final boolean dock) {
		JSPluginUtil.runOnGLThread(new Runnable() {
			@Override
			public void run() {
				try {
					_withdrawIcon = _api.createWithdrawIcon(styleId);
					JSONObject params = new JSONObject();
					params.put("left", left);
					params.put("top", top);
					params.put("dock", dock);
					_withdrawIcon.show(params);
				} catch(JSONException e) {
				}
			}
		});
	}

	public static void hideWithdrawIcon() {
		JSPluginUtil.runOnGLThread(new Runnable() {
			@Override
			public void run() {
				if(_withdrawIcon != null) {
					_withdrawIcon.hide();
				}
			}
		});
	}

	public static void showSceneRedPack(final String params) {
		JSPluginUtil.runOnGLThread(new Runnable() {
			@Override
			public void run() {
				try {
					JSONObject j = new JSONObject(params);
					LetoAdApi.RedPack redPack = _api.showSceneRedPack(j);
					redPack.onClose(new LetoAdApi.ILetoAdApiCallback() {
						@Override
						public void onApiEvent(final JSONObject res) {
							JSPluginUtil.runOnGLThread(new Runnable() {
								@Override
								public void run() {
									String js = String.format("LTJSSDK.LTApiSharedListener.onRedPackClose(%s);", res.toString());
									Cocos2dxJavascriptJavaBridge.evalString(js);
								}
							});
						}
					});
				} catch(Throwable e) {
					Log.d("test", "ff");
				}
			}
		});
	}
}
