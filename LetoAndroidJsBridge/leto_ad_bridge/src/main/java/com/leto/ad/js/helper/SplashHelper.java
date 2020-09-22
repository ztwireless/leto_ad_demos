package com.leto.ad.js.helper;

import android.view.ViewGroup;

import com.leto.ad.js.LTJSBridge;
import com.leto.ad.js.utils.Const;
import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.json.JSONObject;

public class SplashHelper extends BaseHelper {
	private static final String TAG = SplashHelper.class.getSimpleName();

	private LetoAdApi.SplashAd _ad;
	private int _adId;

	// for unity
	private ISplashListener _cb;

	public SplashHelper() {
		LTLog.d(TAG + " >>> " + this);
	}

	@Override
	public void setAdListener(final String callbackNameJson) {
		super.setAdListener(callbackNameJson);
	}

	public void setAdListener(ISplashListener cb) {
		_cb = cb;
	}

	private void initSplash(final int adId, ViewGroup container) {
		LTLog.d("initSplash  >>> " + adId);

		LetoAdApi api = LTJSBridge.getApi();
		_ad = api.createSplashAd(adId, container);
		_adId = adId;
		if(_ad != null) {
			_ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.SplashCallback.LoadedCallbackKey)) {
                    	String js = getCallbackName(Const.SplashCallback.LoadedCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                    	JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                    	_cb.onSplashLoaded(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
			_ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.SplashCallback.CloseCallbackKey)) {
                    	String js = getCallbackName(Const.SplashCallback.CloseCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                    	JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                    	_cb.onSplashClose(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
			_ad.onError(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.SplashCallback.FailCallbackKey)) {
                    	String js = getCallbackName(Const.SplashCallback.FailCallbackKey)
							+ "(" + _adId + ",\"" + res.optString("errMsg", "") + "\");";
                    	JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                    	_cb.onSplashFail(_adId, res.optString("errMsg", ""));
					}
				}
			});
			_ad.onShow(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
					if (hasCallbackName(Const.SplashCallback.ShowCallbackKey)) {
						String js = getCallbackName(Const.SplashCallback.ShowCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
						JSPluginUtil.runJs(js);
					}
					if(_cb != null) {
						_cb.onSplashShow(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
			_ad.onClick(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
					if (hasCallbackName(Const.SplashCallback.ClickCallbackKey)) {
						String js = getCallbackName(Const.SplashCallback.ClickCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
						JSPluginUtil.runJs(js);
					}
					if(_cb != null) {
						_cb.onSplashClick(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
		}
	}

	public void load(final int adId, final ViewGroup container) {
		LTLog.d("loadSplash >>> " + adId);
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if(_ad == null) {
					initSplash(adId, container);
				}
				_ad.load();
			}
		});
	}

	public void load(int adId) {
		load(adId, null);
	}

	public void destroy() {
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if(_ad != null) {
					_ad.destroy();
					_ad = null;
				}
			}
		});
	}

	public void show() {
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				LTLog.d("showSplash >>> " + _adId);
				if(_ad != null) {
					_ad.show();
				} else {
					LTLog.d("showSplash error  ..you must call load first, unitId" + _adId);
					if(hasCallbackName(Const.SplashCallback.FailCallbackKey)) {
						String js = getCallbackName(Const.SplashCallback.FailCallbackKey)
							+ "(" + _adId + ",'" + "you must call load first" + "');";
						JSPluginUtil.runJs(js);
					}
				}
			}
		});
	}

	public boolean isAdReady() {
		LTLog.d("splash isAdReady >>> " + _adId);
		if(_ad != null) {
			return _ad.isLoaded();
		} else {
			return false;
		}
	}
}
