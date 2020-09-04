package com.leto.ad.js.helper;

import com.leto.ad.js.LTJSBridge;
import com.leto.ad.js.utils.Const;
import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.json.JSONObject;

public class InterstitialHelper extends BaseHelper {
	private static final String TAG = InterstitialHelper.class.getSimpleName();

	private LetoAdApi.InterstitialAd _ad;
	private int _adId;

	// for unity
	private IInterstitialListener _cb;

	public InterstitialHelper() {
		LTLog.d(TAG + " >>> " + this);
	}

	@Override
	public void setAdListener(final String callbackNameJson) {
		super.setAdListener(callbackNameJson);
	}

	public void setAdListener(IInterstitialListener cb) {
		_cb = cb;
	}

	private void initInterstitial(final int adId) {
		LTLog.d("initInterstitial  >>> " + adId);

		LetoAdApi api = LTJSBridge.getApi();
		_ad = api.createInterstitialAd(adId);
		_adId = adId;
		if(_ad != null) {
			_ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.InterstitialCallback.LoadedCallbackKey)) {
                    	String js = getCallbackName(Const.InterstitialCallback.LoadedCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                    	JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                    	_cb.onInterstitialLoaded(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
			_ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.InterstitialCallback.CloseCallbackKey)) {
                    	String js = getCallbackName(Const.InterstitialCallback.CloseCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                    	JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                    	_cb.onInterstitialClose(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
			_ad.onError(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.InterstitialCallback.LoadFailCallbackKey)) {
                    	String js = getCallbackName(Const.InterstitialCallback.LoadFailCallbackKey)
							+ "(" + _adId + ",\"" + res.optString("errMsg", "") + "\");";
                    	JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                    	_cb.onInterstitialLoadFail(_adId, res.optString("errMsg", ""));
					}
				}
			});
			_ad.onShow(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
					if (hasCallbackName(Const.InterstitialCallback.ShowCallbackKey)) {
						String js = getCallbackName(Const.InterstitialCallback.ShowCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
						JSPluginUtil.runJs(js);
					}
					if(_cb != null) {
						_cb.onInterstitialShow(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
			_ad.onClick(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
					if (hasCallbackName(Const.InterstitialCallback.ClickCallbackKey)) {
						String js = getCallbackName(Const.InterstitialCallback.ClickCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
						JSPluginUtil.runJs(js);
					}
					if(_cb != null) {
						_cb.onInterstitialClick(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
			_ad.onDestroy(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
					if (hasCallbackName(Const.InterstitialCallback.DestroyCallbackKey)) {
						String js = getCallbackName(Const.InterstitialCallback.DestroyCallbackKey)
							+ "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
						JSPluginUtil.runJs(js);
					}
					if(_cb != null) {
						_cb.onInterstitialDestroy(_adId, res.optString("adInfo", "{}"));
					}
				}
			});
		}
	}

	public void load(final int adId) {
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				LTLog.d("loadInterstitial >>> " + adId);
				if(_ad == null) {
					initInterstitial(adId);
				}
				_ad.load();
			}
		});
	}

	public void destroy() {
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				LTLog.d("destroyInterstitial >>> " + _adId);
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
				LTLog.d("showInterstitial >>> " + _adId);
				if(_ad != null) {
					_ad.show();
				} else {
					LTLog.d("showInterstitial error  ..you must call loadInterstitial first, adId: " + _adId);
					if(hasCallbackName(Const.InterstitialCallback.LoadFailCallbackKey)) {
						String js = getCallbackName(Const.InterstitialCallback.LoadFailCallbackKey)
							+ "(" + _adId + ",'" + "you must call loadInterstitial first" + "');";
						JSPluginUtil.runJs(js);
					}
				}
			}
		});
	}

	public boolean isAdReady() {
		LTLog.d("interstitial isAdReady >>> " + _adId);
		if(_ad != null) {
			return _ad.isLoaded();
		} else {
			return false;
		}
	}
}
