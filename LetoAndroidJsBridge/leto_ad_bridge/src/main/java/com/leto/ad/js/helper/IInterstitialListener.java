package com.leto.ad.js.helper;

public interface IInterstitialListener {
	void onInterstitialLoaded(int adId);
	void onInterstitialClose(int adId);
	void onInterstitialLoadFail(int adId);
	void onInterstitialAdShow(int adId);
}
