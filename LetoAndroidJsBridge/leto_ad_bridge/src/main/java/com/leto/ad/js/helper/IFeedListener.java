package com.leto.ad.js.helper;

public interface IFeedListener {
	void onFeedLoaded(int adId);
	void onFeedFailed(int adId);
	void onFeedShow(int adId);
	void onFeedHide(int adId);
	void onFeedClick(int adId);
	void onFeedClose(int adId);
}
