package com.leto.ad.js.helper;

public interface IBannerListener {
	void onBannerLoaded(int adId, String adInfo);
	void onBannerLoadFail(int adId, String errMsg);
	void onBannerClick(int adId, String adInfo);
	void onBannerShow(int adId, String adInfo);
	void onBannerHide(int adId, String adInfo);
	void onBannerClose(int adId, String adInfo);
}
