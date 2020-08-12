package com.leto.ad.js.helper;

public interface IRewardedVideoListener {
	void onRewardedVideoLoaded(int adId);
	void onRewardedVideoReward(int adId);
	void onRewardedVideoClose(int adId, String res);
	void onRewardedVideoLoadFail(int adId);
}
