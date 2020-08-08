package com.leto.ad.js.utils;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;

import java.lang.reflect.Method;

public class JSPluginUtil {
	public static final String TAG = "LTJSBridge";
	public static Handler _handler = new Handler(Looper.getMainLooper());

	private static final String COCOS_ACTIVITY_CLASS = "org.cocos2dx.lib.Cocos2dxActivity";
	private static final String LAYA_CONCH_CLASS = "layaair.game.browser.ConchJNI";
	private static final String COCOS_JS_BRIDGE_CLASS = "org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge";
	private static Class _cocosActClass = null;
	private static Method _cocosActGetContext = null;
	private static Method _cocosActRunGLThread = null;
	private static Class _cocosJsBridgeClass = null;
	private static Method _cocosJsBridgeEvalString = null;
	private static Class _layaConchClass = null;
	private static Method _layaConchRunJs = null;

	public static void init() {
		if(_cocosActClass == null) {
			try {
				_cocosActClass = Class.forName(COCOS_ACTIVITY_CLASS);
				_cocosJsBridgeClass = Class.forName(COCOS_JS_BRIDGE_CLASS);
				_cocosActGetContext = _cocosActClass.getDeclaredMethod("getContext");
				_cocosActRunGLThread = _cocosActClass.getDeclaredMethod("runOnGLThread", Runnable.class);
				_cocosJsBridgeEvalString = _cocosJsBridgeClass.getDeclaredMethod("evalString", String.class);
			} catch(Throwable e) {
				_cocosActClass = null;
				_cocosJsBridgeClass = null;
			}
		}
		if(_layaConchClass == null) {
			try {
				_layaConchClass = Class.forName(LAYA_CONCH_CLASS);
				_layaConchRunJs = _layaConchClass.getDeclaredMethod("RunJS", String.class);
			} catch(Throwable e) {
				_layaConchClass = null;
			}
		}
	}

	public static Activity getActivity() {
		try {
			return (Activity)_cocosActGetContext.invoke(_cocosActClass);
		} catch(Throwable e) {
			return null;
		}
	}

	public static void runOnUiThread(final Runnable runnable) {
		try {
			_handler.post(runnable);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public static void runJs(final String js) {
		try {
			if(_cocosActClass != null) {
				_cocosActRunGLThread.invoke(getActivity(), new Runnable() {
					@Override
					public void run() {
						try {
							_cocosJsBridgeEvalString.invoke(_cocosJsBridgeClass, js);
						} catch(Throwable e) {
						}
					}
				});
			} else if(_layaConchClass != null) {
				_layaConchRunJs.invoke(_layaConchClass, js);
			}
		} catch(Throwable e) {
		}
	}

	public static void runOnGLThread(Runnable runnable) {
		try {
			if(_cocosActClass != null) {
				_cocosActRunGLThread.invoke(getActivity(), runnable);
			} else if(_layaConchClass != null) {
				_handler.post(runnable);
			}
		} catch(Throwable e) {
		}
	}
}
