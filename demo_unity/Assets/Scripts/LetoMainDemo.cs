using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LetoAd;
using UnityEngine.SceneManagement;

public class LetoMainDemo : MonoBehaviour {
    private ILTCSSDK _letoSdk;

    void Awake() {
        _letoSdk = new LTCSSDK();
        _letoSdk.initSDK();
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnRewardedVideoClicked() {
        SceneManager.LoadScene("LetoRewardedVideoDemo");
    }

    public void OnInterstitialClicked() {
        SceneManager.LoadScene("LetoInterstitialDemo");
    }

    public void OnBannerClicked() {
        SceneManager.LoadScene("LetoBannerDemo");
    }

    public void OnFeedClicked() {
        SceneManager.LoadScene("LetoFeedDemo");
    }

    public void OnCoinClicked() {
        SceneManager.LoadScene("LetoCoinDemo");
    }

    public void OnRedPackClicked() {
        SceneManager.LoadScene("LetoRedPackDemo");
    }

    public void OnExtendedClicked() {
        SceneManager.LoadScene("LetoExtendedDemo");
    }

    public void OnFullVideoClicked() {
        SceneManager.LoadScene("LetoFullVideoDemo");
    }
}
