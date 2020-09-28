package com.leto.ad.js.utils;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class JSPluginUtil {
	public static final String TAG = "LTJSBridge";
	public static Handler _handler = new Handler(Looper.getMainLooper());

	private static final String COCOS_ACTIVITY_CLASS = "org.cocos2dx.lib.Cocos2dxActivity";
	private static final String LAYA_CONCH_JNI_CLASS = "layaair.game.browser.ConchJNI";
	private static final String LAYA_CONCH5_CLASS = "layaair.game.conch.LayaConch5";
	private static final String COCOS_JS_BRIDGE_CLASS = "org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge";
	private static final String UNITY_PLAYER_CLASS = "com.unity3d.player.UnityPlayer";
	private static Class _cocosActClass = null;
	private static Method _cocosActGetContext = null;
	private static Method _cocosActRunGLThread = null;
	private static Class _cocosJsBridgeClass = null;
	private static Method _cocosJsBridgeEvalString = null;
	private static Class _layaConchJNIClass = null;
	private static Method _layaConchJNIRunJs = null;
	private static Class _layaConch5Class = null;
	private static Method _layaConch5GetInstance = null;
	private static Field _layaConch5Ctx = null;
	private static Class _unityPlayerClass = null;
	private static Method _unityPlayerCurrentActivity = null;

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
		if(_layaConchJNIClass == null) {
			try {
				_layaConchJNIClass = Class.forName(LAYA_CONCH_JNI_CLASS);
				_layaConchJNIRunJs = _layaConchJNIClass.getDeclaredMethod("RunJS", String.class);
			} catch(Throwable e) {
				_layaConchJNIClass = null;
			}
		}
		if(_layaConch5Class == null) {
			try {
				_layaConch5Class = Class.forName(LAYA_CONCH5_CLASS);
				_layaConch5GetInstance = _layaConch5Class.getDeclaredMethod("GetInstance");
				_layaConch5Ctx = _layaConch5Class.getDeclaredField("mCtx");
			} catch(Throwable e) {
				_layaConch5Class = null;
			}
		}
		if(_unityPlayerClass == null) {
			try {
				_unityPlayerClass = Class.forName(UNITY_PLAYER_CLASS);
				_unityPlayerCurrentActivity = _unityPlayerClass.getDeclaredMethod("currentActivity");
			} catch(Throwable e) {
				_unityPlayerClass = null;
			}
		}
	}

	public static Activity getActivity() {
		if(_cocosActGetContext != null) {
			try {
				return (Activity)_cocosActGetContext.invoke(_cocosActClass);
			} catch(Throwable e) {
				return null;
			}
		}
		if(_layaConch5GetInstance != null && _layaConch5Ctx != null) {
			try {
				Object conch5 = _layaConch5GetInstance.invoke(_layaConch5Class);
				if(conch5 != null) {
					return (Activity)_layaConch5Ctx.get(conch5);
				}
			} catch(Throwable e) {
				return null;
			}
		}
		if(_unityPlayerCurrentActivity != null) {
			try {
				return (Activity)_unityPlayerCurrentActivity.invoke(_unityPlayerClass);
			} catch(Throwable e) {
				return null;
			}
		}
		return null;
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
			} else if(_layaConchJNIClass != null) {
				_layaConchJNIRunJs.invoke(_layaConchJNIClass, js);
			}
		} catch(Throwable e) {
		}
	}

	public static void runOnGLThread(Runnable runnable) {
		try {
			if(_cocosActClass != null) {
				_cocosActRunGLThread.invoke(getActivity(), runnable);
			} else if(_layaConchJNIClass != null) {
				_handler.post(runnable);
			}
		} catch(Throwable e) {
		}
	}
}
