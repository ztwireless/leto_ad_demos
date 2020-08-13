using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoExtendedDemo : MonoBehaviour
{
    public ILTExtendedCSSDK _letoSdk;
    private int _adId = 1;

    void Awake() {
        _letoSdk = new LTExtendedCSSDK();
        _letoSdk.setAdListener(new EventListener(_letoSdk));
    }

    public void OnBackClicked() {
        SceneManager.LoadScene("LetoMainDemo");
    }

    public void OnShowDefaultClicked() {
        _letoSdk.load(_adId);
        _letoSdk.show(_adId, "{\"coin\": 1, \"ratio\": 2}");
    }

    public void OnShowCustomLogicClicked() {
        _letoSdk.load(_adId, @"{
            ""title"": ""自定义标题"",
            ""video_button_title"": ""自定义按钮文字"",
            ""icon"": ""http://download.mgc-games.com/access/upload/20190319/5c909dc73468a.png""
        }");
        _letoSdk.show(_adId, @"{
            ""coin"": 1,
            ""ratio"": 2,
            ""custom_logic"": true
        }");
    }

    public void OnShowNormalClaimClicked() {
        _letoSdk.load(_adId, @"{
            ""title"": ""带普通领取按钮"",
            ""show_my_coin"": true,
            ""show_normal_button"": true
        }");
        _letoSdk.show(_adId, @"{
            ""coin"": 1,
            ""ratio"": 2
        }");
    }

    public void OnShowNoVideoClicked() {
        _letoSdk.load(_adId, @"{
            ""title"": ""比例<=1则无视频, 只能普通领取"",
            ""show_my_coin"": true
        }");
        _letoSdk.show(_adId, @"{
            ""coin"": 1,
            ""ratio"": 1
        }");
    }

    class EventListener : ILTExtendedListener {
        private ILTExtendedCSSDK _letoSdk;

        public EventListener(ILTExtendedCSSDK letoSdk) {
            _letoSdk = letoSdk;
        }

        public void onExtendedLoaded(int adId) {
            Debug.Log("onExtendedLoaded: " + adId);
        }

        public void onExtendedFailed(int adId, string errMsg) {
            Debug.Log("onExtendedFailed: " + adId + ", errmsg: " + errMsg);
        }

        public void onExtendedClose(int adId, string res) {
            Debug.Log("onExtendedClose: " + adId + ", res: " + res);
            _letoSdk.destroy(adId);
        }

        public void onExtendedCustomClose(int adId, string res) {
            Debug.Log("onExtendedCustomClose: " + adId + ", res: " + res);
        }

        public void onExtendedVideoClose(int adId, string res) {
            Debug.Log("onExtendedVideoClose: " + adId + ", res: " + res);
        }

        public void onExtendedNormalClaim(int adId) {
            Debug.Log("onExtendedNormalClaim: " + adId);
        }
    }
}
