package com.leto.ad.cocosjs.helper;

import com.leto.ad.cocosjs.LTJSBridge;
import com.leto.ad.cocosjs.utils.Const;
import com.leto.ad.cocosjs.utils.JSPluginUtil;
import com.leto.ad.cocosjs.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONObject;

public class FeedHelper extends BaseHelper {
    private static final String TAG = FeedHelper.class.getSimpleName();

    private LetoAdApi.FeedAd _ad;
    private int _adId;

    public FeedHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
    }

    private void init(final int adId) {
        LTLog.d("initFeed adId >>> " + adId);
        _adId = adId;
        LetoAdApi api = LTJSBridge.getApi();
        _ad = api.createFeedAd(adId);
        _ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
            @Override
            public void onApiEvent(JSONObject res) {
                if (hasCallbackName(Const.FeedCallback.LoadedCallbackKey)) {
                    JSPluginUtil.runOnGLThread(new Runnable() {
                        @Override
                        public void run() {
                            Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.FeedCallback.LoadedCallbackKey)
                                + "(" + _adId + ");");
                        }
                    });
                }
            }
        });
        _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
            @Override
            public void onApiEvent(JSONObject res) {
                if (hasCallbackName(Const.FeedCallback.FailedCallbackKey)) {
                    JSPluginUtil.runOnGLThread(new Runnable() {
                        @Override
                        public void run() {
                            Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.FeedCallback.FailedCallbackKey)
                                + "(" + _adId + ");");
                        }
                    });
                }
            }
        });
    }

    public void load(final int adId) {
        LTLog.d("load >>> " + adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (_ad == null) {
                    init(adId);
                }
                _ad.load();
            }
        });
    }

    public void hide() {
        LTLog.d("hide >>> " + _adId);
        JSPluginUtil.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                if(_ad != null) {
                    _ad.hide();
                } else {
                    LTLog.d("hide error  ..you must call loadFeed first " + _adId);
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
                    _ad.show(null);
                } else {
                    LTLog.d("show error  ..you must call loadFeed first " + _adId);
                    if (hasCallbackName(Const.FeedCallback.FailedCallbackKey)) {
                        JSPluginUtil.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString(getCallbackName(Const.FeedCallback.FailedCallbackKey)
                                        + "(" + _adId + ",'" + "you must call load for feed first" + "');");
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
        LTLog.d("feed isAdReady >>> " + _adId);
        if(_ad != null) {
            return _ad.isLoaded();
        }
        return false;
    }
}
