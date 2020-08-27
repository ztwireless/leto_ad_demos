package com.leto.ad.js.helper;

public interface IFeedListener {
	void onFeedLoaded(int adId, String adInfo);
	void onFeedFailed(int adId, String errMsg);
	void onFeedShow(int adId, String adInfo);
	void onFeedHide(int adId, String adInfo);
	void onFeedClick(int adId, String adInfo);
	void onFeedClose(int adId, String adInfo);
}
