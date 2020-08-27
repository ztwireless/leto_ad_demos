package com.mgc.letobox.happy;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.mgc.leto.game.base.LetoCore;

public class MyApp extends Application {
	@Override
	protected void attachBaseContext(Context base) {
		super.attachBaseContext(base);
		LetoCore.useBiddingAdPolicy(true);
		MultiDex.install(this);
	}
}
