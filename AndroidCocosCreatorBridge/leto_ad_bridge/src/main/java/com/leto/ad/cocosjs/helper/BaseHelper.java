package com.leto.ad.cocosjs.helper;

import android.text.TextUtils;

import com.leto.ad.cocosjs.utils.LTLog;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class BaseHelper {
    private static final String TAG = BaseHelper.class.getSimpleName();

    private JSONObject mCallbackJsonObject;
    private String mCallbackNameJson;

    protected boolean hasCallbackName(String key) {
        return mCallbackJsonObject != null && mCallbackJsonObject.has(key);
    }

    protected String getCallbackName(String key) {
        try {
            return mCallbackJsonObject.optString(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public void setAdListener(final String callbackNameJson) {
        if (!TextUtils.equals(mCallbackNameJson, callbackNameJson) && !TextUtils.isEmpty(callbackNameJson)) {
            try {
                mCallbackJsonObject = new JSONObject(callbackNameJson);
                mCallbackNameJson = callbackNameJson;
                LTLog.d(TAG + " setAdListener success... " + callbackNameJson);
            } catch (JSONException e) {
                e.printStackTrace();
                LTLog.d(TAG + " setAdListener error>>> " + e.getMessage());
            }
        }
    }

    protected Map<String, Object> getJsonMap(String json) {
        Map<String, Object> map = new HashMap<>();
        try {
            JSONObject jsonObject = new JSONObject(json);
            Iterator iterator = jsonObject.keys();
            String key;
            while (iterator.hasNext()) {
                key = (String) iterator.next();
                map.put(key, jsonObject.get(key));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }
}
