package com.leto.ad.cocosjs.helper;

import com.leto.ad.cocosjs.LTJSBridge;
import com.leto.ad.cocosjs.utils.Const;
import com.leto.ad.cocosjs.utils.JSPluginUtil;
import com.leto.ad.cocosjs.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONObject;

public class RewardVideoHelper extends BaseHelper {
    private static final String TAG = RewardVideoHelper.class.getSimpleName();

    private LetoAdApi.RewardedVideo _ad;
    private int _adId;
    private boolean _ready = false;

    public RewardVideoHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
    }

    private void initVideo(final int adId) {
        LTLog.d("initVideo adId >>> " + adId);
        _adId = adId;
        LetoAdApi api = LTJSBridge.getApi();
        _ad = api.createRewardedVideoAd(adId);
        if(_ad != null) {
            _ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.RewardVideoCallback.LoadedCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                _ready = true;
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.RewardVideoCallback.LoadedCallbackKey)
                                    + "(" + _adId + ");");
                            }
                        });
                    }
                }
            });
            _ad.onClose(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(final JSONObject jsonObject) {
                    if (hasCallbackName(Const.RewardVideoCallback.CloseCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                if(jsonObject.optBoolean("isEnded")) {
                                    Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.RewardVideoCallback.RewardCallbackKey)
                                        + "(" + _adId + ");");
                                }
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.RewardVideoCallback.CloseCallbackKey)
                                    + "(" + _adId + ");");
                            }
                        });
                    }
                }
            });
            _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject jsonObject) {
                    if (hasCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                _ready = false;
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)
                                    + "(" + _adId + ");");
                            }
                        });
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
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.RewardVideoCallback.LoadFailCallbackKey)
                                        + "(" + _adId + ",'" + "you must call loadRewardVideo first" + "');");
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
