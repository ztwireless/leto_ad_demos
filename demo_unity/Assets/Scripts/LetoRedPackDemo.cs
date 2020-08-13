using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoRedPackDemo : MonoBehaviour
{
    private ILTCSSDK _letoSdk;

    void Awake() {
        _letoSdk = new LTCSSDK();
    }

    public void OnBackClicked() {
        SceneManager.LoadScene("LetoMainDemo");
    }

    public void OnRedPack1Clicked() {
        LTRedPackRequest req = new LTRedPackRequest();
        req.workflow = 1;
        req.local_limits = new LTLocalLimit[] {
            new LTLocalLimit(1000, 5, 1, 2),
            new LTLocalLimit(2000, 4, 1, 3),
            new LTLocalLimit(3000, 2, 1, 4)
        };
        _letoSdk.showRedPack(req, new EventListener());
    }

    public void OnRedPack2Clicked() {
        LTRedPackRequest req = new LTRedPackRequest();
        req.workflow = 2;
        req.local_limits = new LTLocalLimit[] {
            new LTLocalLimit(1000, 5, 1, 2),
            new LTLocalLimit(2000, 4, 1, 3),
            new LTLocalLimit(3000, 2, 1, 4)
        };
        _letoSdk.showRedPack(req, new EventListener());
    }

    class EventListener : ILTRedPackListener {
        public void onRedPackClose(LTRedPackResult result) {
            Debug.Log("onRedPackClose, success: " + result.success + ", abort: " + result.abort + ", add_coin: " + result.add_coin);
        }
    }
}
