package com.leto.ad.js.helper;

public interface IExtendedListener {
	void onExtendedLoaded(int adId);
	void onExtendedFailed(int adId, String errMsg);
	void onExtendedClose(int adId, String res);
	void onExtendedCustomClose(int adId, String res);
	void onExtendedVideoClose(int adId, String res);
	void onExtendedNormalClaim(int adId);
}
