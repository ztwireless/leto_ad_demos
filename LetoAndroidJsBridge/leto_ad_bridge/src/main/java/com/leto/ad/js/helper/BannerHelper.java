package com.leto.ad.js.helper;

import com.leto.ad.js.LTJSBridge;
import com.leto.ad.js.utils.Const;
import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.json.JSONObject;

public class BannerHelper extends BaseHelper {
    private final String TAG = getClass().getSimpleName();
    private int _adId;
    private LetoAdApi.BannerAd _ad;

    public BannerHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
    }

    public void initBanner(int adId) {
        LTLog.d("initBanner >>> " + adId);

        _adId = adId;
        LetoAdApi api = LTJSBridge.getApi();
        _ad = api.createBannerAd(adId);
        if(_ad != null) {
            _ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.BannerCallback.LoadedCallbackKey)) {
                        String js = getCallbackName(Const.BannerCallback.LoadedCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                }
            });
            _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.BannerCallback.LoadFailCallbackKey)) {
                        String js = getCallbackName(Const.BannerCallback.LoadFailCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                }
            });
        }
    }

    public void loadBanner(final int adId) {
        LTLog.d("loadBanner >>> " + adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad == null) {
                    initBanner(adId);
                }
            }
        });
    }

    public void show() {
        LTLog.d("show >>> " + _adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad != null) {
                    _ad.show();
                }
            }
        });
    }

    public void reshowBanner() {
        LTLog.d("reshowBanner >>> " + _adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad != null) {
                    _ad.show();
                } else {
                    LTLog.d("reshowBanner error  ..you must call loadBanner first, adId >>> " + _adId);
                }
            }
        });
    }

    public void hideBanner() {
        LTLog.d("hideBanner >>> " + _adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad != null) {
                    _ad.hide();
                } else {
                    LTLog.d("hideBanner error  ..you must call loadBanner first, adId >>> " + _adId);
                }

            }
        });
    }

    public void removeBanner() {
        LTLog.d("removeBanner >>> " + _adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad != null) {
                    _ad.destroy();
                    _ad = null;
                } else {
                    LTLog.d("removeBanner3 >>> no banner need to be removed, adId >>> " + _adId);
                }
            }
        });
    }

    public boolean isAdReady() {
        LTLog.d("banner isAdReady >>> " + _adId);
        return _ad.isLoaded();
    }
}
