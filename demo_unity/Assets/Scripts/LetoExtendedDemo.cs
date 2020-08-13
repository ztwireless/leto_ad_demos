using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using LetoAd;

public class LetoExtendedDemo : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnBackClicked() {
        SceneManager.LoadScene("LetoMainDemo");
    }

    public void OnShowDefaultClicked() {

    }

    public void OnShowCustomLogicClicked() {

    }

    public void OnShowNormalClaimClicked() {

    }

    public void OnShowNoVideoClicked() {
        
    }
}
