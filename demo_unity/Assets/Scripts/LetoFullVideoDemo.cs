using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoFullVideoDemo : MonoBehaviour
{
    private ILTFullVideoCSSDK _letoSdk;
    private int _adId = 1;

    void Awake() {
        _letoSdk = new LTFullVideoCSSDK();
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

    class EventListener : ILTFullVideoListener {
        public void onFullVideoLoaded(int adId) {
            Debug.Log("onFullVideoLoaded: " + adId);
        }

        public void onFullVideoClose(int adId) {
            Debug.Log("onFullVideoClose: " + adId);
        }

        public void onFullVideoFail(int adId, string errMsg) {
            Debug.Log("onFullVideoFail: " + adId);
        }

        public void onFullVideoShow(int adId) {
            Debug.Log("onFullVideoShow: " + adId);
        }

        public void onFullVideoClick(int adId) {
            Debug.Log("onFullVideoClick: " + adId);
        }
    }
}
