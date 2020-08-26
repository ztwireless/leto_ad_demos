package com.leto.ad.js.helper;

import com.leto.ad.js.LTJSBridge;
import com.leto.ad.js.utils.Const;
import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.json.JSONObject;

public class FullVideoHelper extends BaseHelper {
    private final String TAG = getClass().getSimpleName();
    private int _adId;
    private LetoAdApi.FullVideo _ad;

    // for unity
    private IFullVideoListener _cb;

    public FullVideoHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
    }

    public void setAdListener(IFullVideoListener cb) {
        _cb = cb;
    }

    public void initFullVideo(int adId) {
        LTLog.d("initBanner >>> " + adId);

        _adId = adId;
        LetoAdApi api = LTJSBridge.getApi();
        _ad = api.createFullVideoAd(adId);
        if(_ad != null) {
            _ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.FullVideoCallback.LoadedCallbackKey)) {
                        String js = getCallbackName(Const.FullVideoCallback.LoadedCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onFullVideoLoaded(_adId);
                    }
                }
            });
            _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.FullVideoCallback.FailCallbackKey)) {
                        String js = getCallbackName(Const.FullVideoCallback.FailCallbackKey)
                            + "(" + _adId + ",\"" + res.optString("errMsg", "") + "\");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onFullVideoFail(_adId, res.optString("errMsg", ""));
                    }
                }
            });
            _ad.onClick(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.FullVideoCallback.ClickCallbackKey)) {
                        String js = getCallbackName(Const.FullVideoCallback.ClickCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onFullVideoClick(_adId);
                    }
                }
            });
            _ad.onShow(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.FullVideoCallback.ShowCallbackKey)) {
                        String js = getCallbackName(Const.FullVideoCallback.ShowCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onFullVideoShow(_adId);
                    }
                }
            });
            _ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.FullVideoCallback.CloseCallbackKey)) {
                        String js = getCallbackName(Const.FullVideoCallback.CloseCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onFullVideoClose(_adId);
                    }
                }
            });
        }
    }

    public void load(final int adId) {
        LTLog.d("loadBanner >>> " + adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad == null) {
                    initFullVideo(adId);
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

    public void destroy() {
        LTLog.d("destroy >>> " + _adId);
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
