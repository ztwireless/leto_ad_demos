using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoFeedDemo : MonoBehaviour
{
    private ILTFeedCSSDK _letoSdk;
    private int _adId = 1;

    void Awake() {
        _letoSdk = new LTFeedCSSDK();
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

    public void OnHideClicked() {
        _letoSdk.hide(_adId);
    }

    public void OnDestroyClicked() {
        _letoSdk.destroy(_adId);
    }

    class EventListener : ILTFeedListener {
        public void onFeedLoaded(int adId) {
            Debug.Log("onFeedLoaded: " + adId);
        }

        public void onFeedFailed(int adId) {
            Debug.Log("onFeedFailed: " + adId);
        }
    }
}
