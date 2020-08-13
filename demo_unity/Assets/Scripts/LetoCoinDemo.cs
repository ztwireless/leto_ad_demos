using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoCoinDemo : MonoBehaviour
{
    public Text label;
    private ILTCSSDK _letoSdk;
    private int coin { set; get; }

    void Awake() {
        _letoSdk = new LTCSSDK();
    }

    void Update() {
        label.text = "User Coin: " + coin;
    }

    public void updateCoinLabel(int coin) {
        
    }

    public void OnBackClicked() {
        SceneManager.LoadScene("LetoMainDemo");
    }

    public void OnGetUserCoinClicked() {
        _letoSdk.getUserCoin(new GetUserCoinEventListener(this));
    }

    public void OnAddCoinClicked() {
        _letoSdk.addCoin(1, new AddCoinEventListener(this));
    }

    public void OnShowWithdrawClicked() {
        _letoSdk.showWithdraw();
    }

    public void OnShowFloat1Clicked() {
        _letoSdk.showWithdrawIcon(1, 10, 10, false, true);
    }

    public void OnShowFloat2Clicked() {
        _letoSdk.showWithdrawIcon(2, 10, 10, false, true);
    }

    public void OnHideFloatClicked() {
        _letoSdk.hideWithdrawIcon();
    }

    class GetUserCoinEventListener : ILTGetUserCoinListener {
        private LetoCoinDemo _scene;

        public GetUserCoinEventListener(LetoCoinDemo scene) {
            _scene = scene;
        }

	    public void onGetUserCoinFail(string errMsg) {
            Debug.Log("onGetUserCoinFail: " + errMsg);
        }

	    public void onGetUserCoinSuccess(LTGetCoinResult result) {
            Debug.Log("onGetUserCoinSuccess: " + result.coin);
            _scene.coin = result.coin;
        }
    }

    class AddCoinEventListener : ILTAddCoinListener {
        private LetoCoinDemo _scene;

        public AddCoinEventListener(LetoCoinDemo scene) {
            _scene = scene;
        }

        public void onAddCoinFail(string errMsg) {
            Debug.Log("onAddCoinFail: " + errMsg);
        }

	    public void onAddCoinSuccess(LTAddCoinResult result) {
            Debug.Log("onAddCoinSuccess: " + result.coin);
            _scene.OnGetUserCoinClicked(); // update coin
        }
    }
}
