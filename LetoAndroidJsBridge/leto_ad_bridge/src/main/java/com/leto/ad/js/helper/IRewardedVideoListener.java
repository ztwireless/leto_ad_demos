package com.leto.ad.js.helper;

public interface IRewardedVideoListener {
	void onRewardedVideoLoaded(int adId, String adInfo);
	void onRewardedVideoReward(int adId, String adInfo);
	void onRewardedVideoClose(int adId, String adInfo);
	void onRewardedVideoLoadFail(int adId, String errMsg);
	void onRewardedVideoShow(int adId, String adInfo);
	void onRewardedVideoClick(int adId, String adInfo);
}
