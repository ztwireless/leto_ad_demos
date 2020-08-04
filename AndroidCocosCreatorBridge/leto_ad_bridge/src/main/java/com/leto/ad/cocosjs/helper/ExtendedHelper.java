package com.leto.ad.cocosjs.helper;

import com.leto.ad.cocosjs.LTJSBridge;
import com.leto.ad.cocosjs.utils.Const;
import com.leto.ad.cocosjs.utils.JSPluginUtil;
import com.leto.ad.cocosjs.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

public class ExtendedHelper extends BaseHelper {
    private static final String TAG = ExtendedHelper.class.getSimpleName();

    private LetoAdApi.ExtendedAd _ad;
    private int _adId;

    public ExtendedHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
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
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.ExtendedCallback.LoadedCallbackKey)
                                    + "(" + _adId + ");");
                            }
                        });
                    }
                }
            });
            _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.FailedCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.ExtendedCallback.FailedCallbackKey)
                                    + "(" + _adId + ",\"" + res.optString("errMsg", "") +  "\");");
                            }
                        });
                    }
                }
            });
            _ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.CloseCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.ExtendedCallback.CloseCallbackKey)
                                    + "(" + _adId + "," + res.toString() + ");");
                            }
                        });
                    }
                }
            });
            _ad.onCustomClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.CustomCloseCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.ExtendedCallback.CustomCloseCallbackKey)
                                    + "(" + _adId + "," + res.toString() + ");");
                            }
                        });
                    }
                }
            });
            _ad.onVideoClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.VideoCloseCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.ExtendedCallback.VideoCloseCallbackKey)
                                    + "(" + _adId + "," + res.toString() + ");");
                            }
                        });
                    }
                }
            });
            _ad.onNormalClaim(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.ExtendedCallback.NormalClaimCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.ExtendedCallback.NormalClaimCallbackKey)
                                    + "(" + _adId + ");");
                            }
                        });
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
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.ExtendedCallback.FailedCallbackKey)
                                        + "(" + _adId + ",'" + "you must call load first" + "');");
                            }
                        });
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
