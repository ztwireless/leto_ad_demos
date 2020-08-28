package com.leto.ad.js.helper;

public interface ISplashListener {
	void onSplashLoaded(int adId, String adInfo);
	void onSplashClose(int adId, String adInfo);
	void onSplashFail(int adId, String errMsg);
	void onSplashShow(int adId, String adInfo);
	void onSplashClick(int adId, String adInfo);
}
