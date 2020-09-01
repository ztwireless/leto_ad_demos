package com.leto.ad.js.helper;

public interface IInterstitialListener {
	void onInterstitialLoaded(int adId, String adInfo);
	void onInterstitialClose(int adId, String adInfo);
	void onInterstitialLoadFail(int adId, String errMsg);
	void onInterstitialShow(int adId, String adInfo);
	void onInterstitialClick(int adId, String adInfo);
	void onInterstitialDestroy(int adId, String adInfo);
}
