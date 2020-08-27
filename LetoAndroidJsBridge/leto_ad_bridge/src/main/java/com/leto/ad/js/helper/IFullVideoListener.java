package com.leto.ad.js.helper;

public interface IFullVideoListener {
	void onFullVideoLoaded(int adId, String adInfo);
	void onFullVideoFail(int adId, String errMsg);
	void onFullVideoClick(int adId, String adInfo);
	void onFullVideoShow(int adId, String adInfo);
	void onFullVideoClose(int adId, String adInfo);
}
