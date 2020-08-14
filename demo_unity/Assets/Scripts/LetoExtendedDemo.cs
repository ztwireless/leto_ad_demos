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
        LTExtendedShowParams p = new LTExtendedShowParams();
        p.coin = 1;
        p.ratio = 2;
        _letoSdk.show(_adId, p);
    }

    public void OnShowCustomLogicClicked() {
        _letoSdk.load(_adId, @"{
            ""title"": ""自定义标题"",
            ""video_button_title"": ""自定义按钮文字"",
            ""icon"": ""http://download.mgc-games.com/access/upload/20190319/5c909dc73468a.png""
        }");
        LTExtendedShowParams p = new LTExtendedShowParams();
        p.coin = 1;
        p.ratio = 2;
        p.custom_logic = true;
        _letoSdk.show(_adId, p);
    }

    public void OnShowNormalClaimClicked() {
        _letoSdk.load(_adId, @"{
            ""title"": ""带普通领取按钮"",
            ""show_my_coin"": true,
            ""show_normal_button"": true
        }");
        LTExtendedShowParams p = new LTExtendedShowParams();
        p.coin = 1;
        p.ratio = 2;
        _letoSdk.show(_adId, p);
    }

    public void OnShowNoVideoClicked() {
        _letoSdk.load(_adId, @"{
            ""title"": ""比例<=1则无视频, 只能普通领取"",
            ""show_my_coin"": true
        }");
        LTExtendedShowParams p = new LTExtendedShowParams();
        p.coin = 1;
        p.ratio = 1;
        _letoSdk.show(_adId, p);
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
