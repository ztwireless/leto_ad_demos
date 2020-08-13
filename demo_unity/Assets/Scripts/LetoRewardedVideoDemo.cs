using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoRewardedVideoDemo : MonoBehaviour
{
    private LTRewardedVideoCSSDK _letoSdk;
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
        public void onRewardedVideoLoaded(int adId) {
            Debug.Log("onRewardedVideoLoaded: " + adId);
        }

	    public void onRewardedVideoReward(int adId) {
            Debug.Log("onRewardedVideoReward: " + adId);
        }

	    public void onRewardedVideoClose(int adId, string res) {
            Debug.Log("onRewardedVideoClose: " + adId + ", response: " + res);
        }

	    public void onRewardedVideoLoadFail(int adId) {
            Debug.Log("onRewardedVideoLoadFail: " + adId);
        }
    }
}
