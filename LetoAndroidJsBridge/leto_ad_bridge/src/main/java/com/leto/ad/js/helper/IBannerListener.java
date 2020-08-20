package com.leto.ad.js.helper;

public interface IBannerListener {
	void onBannerLoaded(int adId);
	void onBannerLoadFail(int adId, String errMsg);
	void onBannerClick(int adId);
	void onBannerShow(int adId);
	void onBannerHide(int adId);
	void onBannerClose(int adId);
}
