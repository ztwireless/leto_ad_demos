package com.leto.ad.js.helper;

public interface IFullVideoListener {
	void onFullVideoLoaded(int adId);
	void onFullVideoFail(int adId, String errMsg);
	void onFullVideoClick(int adId);
	void onFullVideoShow(int adId);
	void onFullVideoClose(int adId);
}
