using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoBannerDemo : MonoBehaviour
{
    private ILTBannerCSSDK _letoSdk;
    private int _adId = 1;

    void Awake() {
        _letoSdk = new LTBannerCSSDK();
        _letoSdk.setAdListener(new EventListener());
    }

    public void OnBackClicked() {
        SceneManager.LoadScene("LetoMainDemo");
    }

    public void OnLoadClicked() {
        _letoSdk.load(_adId);
    }

    public void OnReadyClicked() {
        bool ready = _letoSdk.isAdReady(_adId);
        Debug.Log("OnReadyClicked, ready: " + ready);
    }

    public void OnShowClicked() {
        _letoSdk.show(_adId);
    }

    public void OnRemoveClicked() {
        _letoSdk.remove(_adId);
    }

    public void OnReshowClicked() {
        _letoSdk.reShow(_adId);
    }

    public void OnHideClicked() {
        _letoSdk.hide(_adId);
    }

    class EventListener : ILTBannerListener {
        public void onBannerLoaded(int adId, LTAdInfo adInfo) {
            Debug.Log("onBannerLoaded: " + adId);
        }

        public void onBannerLoadFail(int adId, string errMsg) {
            Debug.Log("onBannerLoadFail: " + adId + ", errMsg: " + errMsg);
        }

        public void onBannerClick(int adId, LTAdInfo adInfo) {
            Debug.Log("onBannerClick: " + adId);
        }

        public void onBannerShow(int adId, LTAdInfo adInfo) {
            Debug.Log("onBannerShow: " + adId);
        }

        public void onBannerHide(int adId, LTAdInfo adInfo) {
            Debug.Log("onBannerHide: " + adId);
        }

        public void onBannerClose(int adId, LTAdInfo adInfo) {
            Debug.Log("onBannerClose: " + adId);
        }
    }
}
