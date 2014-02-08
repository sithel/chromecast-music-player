var reb = {
  chromecastApplicationId: '8A833349',
  start: function() {
    var self = this;
    // var initializeCastApi = function initializeCastApi() {
    //   var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    //   var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    //     sessionListener,
    //     receiverListener);
    //   chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    // };
    // if (!chrome.cast || !chrome.cast.isAvailable) {
    //   setTimeout(initializeCastApi, 1000);
    // } else {
    //   initializeCastApi();
    // }

    $('.cast-button').click(this.startCasting);
    $('.auth-button').click(this.startRdio);
  },
  startRdio: function() {
    R.ready(function() {
      console.info("[Rdio] -- checking the current user " + R.currentUser.get('key'));
      if (R.authenticated()) {
        console.info("[Rdio] I am authenticated : " + R.accessToken());
      } else {
        console.info("[Rdio] I am NOT authenticated");
        R.authenticate(function(authenticated) {
          console.info("[Rdio] authenticated callback -- " , authenticated);
        });
      }
    });
  },
  startCasting: function() {
    sessionRequest = new chrome.cast.SessionRequest(self.chromecastApplicationId);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
      function() {
        console.info("[Chromecast] init : session listener ",arguments);
      },
      function(){
        console.error("[Chromecast] init: receiver listener ",arguments);
      }
    );
    chrome.cast.initialize(apiConfig,
      function() {
        console.info("[Chromecast] session start : on init success ",arguments);
      },
      function(){
        console.error("[Chromecast] session start : on error ",arguments);
      }
    );
  }
};