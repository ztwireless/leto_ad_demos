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

	public InterstitialHelper() {
		LTLog.d(TAG + " >>> " + this);
	}

	@Override
	public void setAdListener(final String callbackNameJson) {
		super.setAdListener(callbackNameJson);
	}

	private void initInterstitial(final int adId) {
		LTLog.d("initInterstitial  >>> " + adId);

		LetoAdApi api = LTJSBridge.getApi();
		_ad = api.createInterstitialAd(adId);
		_adId = adId;
		if(_ad != null) {
			_ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.InterstitialCallback.LoadedCallbackKey)) {
                    	String js = getCallbackName(Const.InterstitialCallback.LoadedCallbackKey)
							+ "(" + _adId + ");";
                    	JSPluginUtil.runJs(js);
                    }
				}
			});
			_ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.InterstitialCallback.CloseCallbackKey)) {
                    	String js = getCallbackName(Const.InterstitialCallback.CloseCallbackKey)
							+ "(" + _adId + ");";
                    	JSPluginUtil.runJs(js);
                    }
				}
			});
			_ad.onError(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.InterstitialCallback.LoadFailCallbackKey)) {
                    	String js = getCallbackName(Const.InterstitialCallback.LoadFailCallbackKey)
							+ "(" + _adId + ");";
                    	JSPluginUtil.runJs(js);
                    }
				}
			});
			_ad.onShow(new LetoAdApi.ILetoAdApiCallback() {
				@Override
				public void onApiEvent(JSONObject res) {
					if (hasCallbackName(Const.InterstitialCallback.ShowCallbackKey)) {
						String js = getCallbackName(Const.InterstitialCallback.ShowCallbackKey)
							+ "(" + _adId + ");";
						JSPluginUtil.runJs(js);
					}
				}
			});
		}
	}

	public void loadInterstitial(final int adId) {
		LTLog.d("loadInterstitial >>> " + adId);
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
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
				if(_ad != null) {
					_ad.destroy();
					_ad = null;
				}
			}
		});
	}

	public void showInterstitial() {
		LTLog.d("showInterstitial >>> " + _adId);
		JSPluginUtil.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if(_ad != null) {
					_ad.show();
				} else {
					LTLog.d("showInterstitial error  ..you must call loadRewardVideo first, unitId" + _adId);
					if(hasCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)) {
						String js = getCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)
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
