using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoInterstitialDemo : MonoBehaviour
{
    private LTInterstitialCSSDK _letoSdk;
    private int _adId = 1;

    void Awake() {
        _letoSdk = new LTInterstitialCSSDK();
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

    class EventListener : ILTInterstitialListener {
        public void onInterstitialLoaded(int adId) {
            Debug.Log("onInterstitialLoaded: " + adId);
        }

        public void onInterstitialClose(int adId) {
            Debug.Log("onInterstitialClose: " + adId);
        }

        public void onInterstitialLoadFail(int adId) {
            Debug.Log("onInterstitialLoadFail: " + adId);
        }

        public void onInterstitialAdShow(int adId) {
            Debug.Log("onInterstitialAdShow: " + adId);
        }
    }
}
