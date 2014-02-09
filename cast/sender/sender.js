R.accessToken('PlVfWxWA3xeEP9qwxAXg_A');

R.on('change:accessToken', function() {
  console.log("we just saw the access token change ",arguments);
})

R.on('change:authenticated', function() {
  console.log("we just saw the authentication change ",arguments);
})

R.on('change:ready', function() {
  console.log("the app is ready ",arguments);
})

R.on('cookieError', function() {
  console.log("i see a cookie error ",arguments);
})


var reb = {
  chromecastApplicationId: '8A833349',
  start: function() {
    _.bindAll(this, 'startCasting', 'startRdio');
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
    sessionRequest = new chrome.cast.SessionRequest(this.chromecastApplicationId);
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

/*

// rebecca http://192.168.42.114:8000/cast/receiver/
// adam    http://192.168.42.66:8000/cast/receiver/

R.currentUser.get('key')
R.player.play({ source: 't12523' })

R.player.playingSource().get('duration')



https://www.rdio.com/oauth2/authorize?response_type=token&client_id=uJQhJrLf20C_re-6XjUvcA&redirect_uri=http://localhost:8000/cast/sender/


token: """"
ts: "1391934461"
uid: "309113"
""

https://www.rdio.com/account/signin/RD10cca7abba5848386746294d3a4254b01b/?secure=True&uid=1391934461&ts=1391934724&next=http://localhost:8000/cast/sender/

R.Api.request({
  method: 'getAutologinParams',
  success: function(){
    console.log(" success ", arguments)
  },
  error: function(){
    console.log(" failure ", arguments)
  }
});
*/