package com.leto.ad.js.helper;

import com.leto.ad.js.LTJSBridge;
import com.leto.ad.js.utils.Const;
import com.leto.ad.js.utils.JSPluginUtil;
import com.leto.ad.js.utils.LTLog;
import com.mgc.leto.game.base.LetoAdApi;

import org.json.JSONException;
import org.json.JSONObject;

public class FeedHelper extends BaseHelper {
    private static final String TAG = FeedHelper.class.getSimpleName();

    private LetoAdApi.FeedAd _ad;
    private int _adId;

    // for unity
    private IFeedListener _cb;

    public FeedHelper() {
        LTLog.d(TAG + " >>> " + this);
    }

    @Override
    public void setAdListener(final String callbackNameJson) {
        super.setAdListener(callbackNameJson);
    }

    public void setAdListener(IFeedListener cb) {
        _cb = cb;
    }

    private void init(final int adId, String params) {
        try {
            LTLog.d("initFeed adId >>> " + adId);
            _adId = adId;
            LetoAdApi api = LTJSBridge.getApi();
            JSONObject j = new JSONObject(params);
            j.put("adId", adId);
            _ad = api.createFeedAd(j);
            _ad.onLoad(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.FeedCallback.LoadedCallbackKey)) {
                        String js = getCallbackName(Const.FeedCallback.LoadedCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onFeedLoaded(_adId);
                    }
                }
            });
            _ad.onError(new LetoAdApi.ILetoAdApiCallback() {
                @Override
                public void onApiEvent(JSONObject res) {
                    if (hasCallbackName(Const.FeedCallback.FailedCallbackKey)) {
                        String js = getCallbackName(Const.FeedCallback.FailedCallbackKey)
                            + "(" + _adId + ");";
                        JSPluginUtil.runJs(js);
                    }
                    if(_cb != null) {
                        _cb.onFeedFailed(_adId);
                    }
                }
            });
        } catch(JSONException e) {
        }
    }

    public void load(final int adId, final String params) {
        LTLog.d("load >>> " + adId);
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

    public void hide() {
        LTLog.d("hide >>> " + _adId);
        JSPluginUtil.runOnUiThread(new Runnable() {
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
                        String js = getCallbackName(Const.FeedCallback.FailedCallbackKey)
                            + "(" + _adId + ",'" + "you must call load for feed first" + "');";
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
        LTLog.d("feed isAdReady >>> " + _adId);
        if(_ad != null) {
            return _ad.isLoaded();
        }
        return false;
    }
}
