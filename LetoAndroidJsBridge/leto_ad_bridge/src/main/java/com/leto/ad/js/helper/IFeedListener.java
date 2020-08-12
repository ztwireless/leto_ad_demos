package com.leto.ad.js.helper;

public interface IFeedListener {
	void onFeedLoaded(int adId);
	void onFeedFailed(int adId);
}
