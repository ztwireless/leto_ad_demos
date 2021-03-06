package com.leto.ad.js.helper;

import com.leto.ad.js.LTJSBridge;
import com.leto.ad.js.utils.Const;
import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.json.JSONObject;

public class RewardVideoHelper extends BaseHelper {
    private static final String TAG = RewardVideoHelper.class.getSimpleName();

    private LetoAdApi.RewardedVideo _ad;
    private int _adId;
    private boolean _ready = false;

    // for unity
    private IRewardedVideoListener _cb;

    public RewardVideoHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
    }

    public void setAdListener(IRewardedVideoListener cb) {
        _cb = cb;
    }

    private void initVideo(final int adId) {
        LTLog.d("initVideo adId >>> " + adId);
        _adId = adId;
        LetoAdApi api = LTJSBridge.getApi();
        _ad = api.createRewardedVideoAd(adId);
        if(_ad != null) {
            _ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.RewardVideoCallback.LoadedCallbackKey)) {
                        String js = getCallbackName(Const.RewardVideoCallback.LoadedCallbackKey)
                            + "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onRewardedVideoLoaded(_adId, res.optString("adInfo", "{}"));
                    }
                }
            });
            _ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if(res.optBoolean("isEnded")) {
                        if (hasCallbackName(Const.RewardVideoCallback.RewardCallbackKey)) {
                            String js = getCallbackName(Const.RewardVideoCallback.RewardCallbackKey)
                                + "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                            JSPluginUtil.runJs(js);
                        }
                        if(_cb != null) {
                            _cb.onRewardedVideoReward(_adId, res.optString("adInfo", "{}"));
                        }
                    }
                    if (hasCallbackName(Const.RewardVideoCallback.CloseCallbackKey)) {
                        String js = getCallbackName(Const.RewardVideoCallback.CloseCallbackKey)
                            + "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onRewardedVideoClose(_adId, res.optString("adInfo", "{}"));
                    }
                }
            });
            _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)) {
                        String js = getCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)
                            + "(" + _adId + ",\"" + res.optString("errMsg", "") + "\");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onRewardedVideoLoadFail(_adId, res.optString("errMsg", ""));
                    }
                }
            });
            _ad.onShow(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.RewardVideoCallback.ShowCallbackKey)) {
                        String js = getCallbackName(Const.RewardVideoCallback.ShowCallbackKey)
                            + "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onRewardedVideoShow(_adId, res.optString("adInfo", "{}"));
                    }
                }
            });
            _ad.onClick(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.RewardVideoCallback.ClickCallbackKey)) {
                        String js = getCallbackName(Const.RewardVideoCallback.ClickCallbackKey)
                            + "(" + _adId + "," + res.optString("adInfo", "{}") + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onRewardedVideoClick(_adId, res.optString("adInfo", "{}"));
                    }
                }
            });
        }
    }

    public void loadRewardedVideo(final int adId) {
        LTLog.d("loadRewardedVideo >>> " + adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad == null) {
                    initVideo(adId);
                }
                _ad.load();
            }
        });
    }

    public void showVideo() {
        LTLog.d("showVideo >>> " + _adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad != null) {
                    _ready = false;
                    _ad.show();
                } else {
                    LTLog.d("showVideo error  ..you must call loadRewardVideo first " + _adId);
                    if (hasCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)) {
                        String js = getCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)
                            + "(" + _adId + ",'" + "you must call loadRewardVideo first" + "');";
                        JSPluginUtil.runJs(js);
                    }
                }
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

    public boolean isAdReady() {
        LTLog.d("video isAdReady >>> " + _adId);
        try {
            if (_ad != null) {
                boolean isAdReady = _ad.isLoaded();
                LTLog.d("video isAdReady >>> " + _adId + ", " + isAdReady);
                return isAdReady;
            } else {
                LTLog.d("video isAdReady error  ..you must call loadRewardedVideo first " + _adId);
            }
            LTLog.d("video isAdReady >end>> " + _adId);
        } catch (Throwable e) {
            LTLog.d("video isAdReady >Throwable>> " + e.getMessage());
            return _ready;
        }
        return _ready;
    }
}
