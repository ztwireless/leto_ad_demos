using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoRewardedVideoDemo : MonoBehaviour
{
    private ILTRewardedVideoCSSDK _letoSdk;
    private int _adId = 1;

    void Awake() {
        _letoSdk = new LTRewardedVideoCSSDK();
        _letoSdk.setAdListener(new EventListener());
    }

    public void OnBackClicked() {
        SceneManager.LoadScene("LetoMainDemo");
    }

    public void OnLoadClicked() {
        _letoSdk.load(_adId);
    }

    public void OnShowClicked() {
        _letoSdk.show(_adId);
    }

    public void OnReadyClicked() {
        bool ready = _letoSdk.isAdReady(_adId);
        Debug.Log("OnReadyClicked, ready: " + ready);
    }

    class EventListener : ILTRewardedVideoListener {
        public void onRewardedVideoLoaded(int adId, LTAdInfo adInfo) {
            string s = JsonUtility.ToJson(adInfo);
            Debug.Log("onRewardedVideoLoaded: " + adId + ", adInfo: " + s);
        }

	    public void onRewardedVideoReward(int adId, LTAdInfo adInfo) {
            Debug.Log("onRewardedVideoReward: " + adId);
        }

	    public void onRewardedVideoClose(int adId, LTAdInfo adInfo) {
            Debug.Log("onRewardedVideoClose: " + adId);
        }

	    public void onRewardedVideoLoadFail(int adId, string errMsg) {
            Debug.Log("onRewardedVideoLoadFail: " + adId + ", errMsg: " + errMsg);
        }

        public void onRewardedVideoShow(int adId, LTAdInfo adInfo) {
            Debug.Log("onRewardedVideoShow: " + adId);
        }

	    public void onRewardedVideoClick(int adId, LTAdInfo adInfo) {
            Debug.Log("onRewardedVideoClick: " + adId);
        }
    }
}
