package com.leto.ad.js.helper;

import com.leto.ad.js.LTJSBridge;
import com.leto.ad.js.utils.Const;
import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.json.JSONException;
import org.json.JSONObject;

public class ExtendedHelper extends BaseHelper {
    private static final String TAG = ExtendedHelper.class.getSimpleName();

    private LetoAdApi.ExtendedAd _ad;
    private int _adId;

    // for unity
    private IExtendedListener _cb;

    public ExtendedHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
    }

    public void setAdListener(IExtendedListener cb) {
        _cb = cb;
    }

    private void init(int adId, final String params) {
        try {
            _adId = adId;
            JSONObject j = new JSONObject(params);
            j.put("adId", adId);
            LTLog.d("initExtended adId >>> " + _adId);
            LetoAdApi api = LTJSBridge.getApi();
            _ad = api.createExtendedAd(j);
            _ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.LoadedCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.LoadedCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onExtendedLoaded(_adId);
                    }
                }
            });
            _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.FailedCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.FailedCallbackKey)
                            + "(" + _adId + ",\"" + res.optString("errMsg", "") +  "\");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onExtendedFailed(_adId, res.optString("errMsg", ""));
                    }
                }
            });
            _ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.CloseCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.CloseCallbackKey)
                            + "(" + _adId + "," + res.toString() + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onExtendedClose(_adId, res.toString());
                    }
                }
            });
            _ad.onCustomClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.CustomCloseCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.CustomCloseCallbackKey)
                            + "(" + _adId + "," + res.toString() + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onExtendedCustomClose(_adId, res.toString());
                    }
                }
            });
            _ad.onVideoClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.VideoCloseCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.VideoCloseCallbackKey)
                            + "(" + _adId + "," + res.toString() + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onExtendedVideoClose(_adId, res.toString());
                    }
                }
            });
            _ad.onNormalClaim(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.NormalClaimCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.NormalClaimCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onExtendedNormalClaim(_adId);
                    }
                }
            });
            _ad.onShow(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.ExtendedCallback.ShowCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.ShowCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onExtendedShow(_adId);
                    }
                }
            });
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void load(final int adId, final String params) {
        LTLog.d("load >>> " + params);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad == null) {
                    init(adId, params);
                }
                _ad.load();
            }
        });
    }

    public void show(final String params) {
        LTLog.d("show >>> " + _adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                boolean ok = false;
                try {
                    if (_ad != null) {
                        JSONObject j = new JSONObject(params);
                        j.put("adId", _adId);
                        _ad.show(j);
                        ok = true;
                    }
                } catch(JSONException e) {
                }

                // if failed
                if(!ok) {
                    LTLog.d("show error  ..you must call load first " + _adId);
                    if (hasCallbackName(Const.ExtendedCallback.FailedCallbackKey)) {
                        String js = getCallbackName(Const.ExtendedCallback.FailedCallbackKey)
                            + "(" + _adId + ",'" + "you must call load first" + "');";
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

    public void updateMyCoin() {
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(_ad != null) {
                    _ad.updateMyCoin();
                }
            }
        });
    }

    public void updateTitle(final String title) {
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(_ad != null) {
                    _ad.updateTitle(title);
                }
            }
        });
    }

    public void updateVideoButtonTitle(final String title) {
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(_ad != null) {
                    _ad.updateVideoButtonTitle(title);
                }
            }
        });
    }

    public void notify(final int action) {
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(_ad != null) {
                    _ad.notify(action);
                }
            }
        });
    }
}
