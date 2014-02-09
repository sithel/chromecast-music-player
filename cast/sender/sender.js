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
    _.bindAll(this, 'startCasting', 'startRdio', 'handleNewSession', 'sendMessage');
    $('.cast-button').click(this.startCasting);
    $('.auth-button').click(this.startRdio);
  },
  handleNewSession: function(s) {
    var self = this;
    s.addMessageListener('urn:x-cast:duck', function(s1, s2) {
      console.info("[Chromecast] just received a message! " , arguments);
      if (s2 == 'requestAccessToken') {
        self.startRdio();
      }
    });
  },
  sendMessage: function(msg) {
    this._session.sendMessage('urn:x-cast:duck', msg, 
      function() {
        console.info("[Chromecast] msg send : success ",arguments);
      },
      function() {
        console.info("[Chromecast] msg send : failure ",arguments);
      }
    );
  },
  startRdio: function() {
    var self = this;
    R.ready(function() {
      console.info("[Rdio] -- checking the current user " + R.currentUser.get('key'));
      if (R.authenticated()) {
        console.info("[Rdio] I am authenticated : " + R.accessToken());
        self.sendMessage(JSON.stringify({ type: 'accessToken', value: R.accessToken() }));
      } else {
        console.info("[Rdio] I am NOT authenticated");
        R.authenticate(function(authenticated) {
          console.info("[Rdio] authenticated callback -- " , authenticated);
        });
      }
    });
  },
  startCasting: function() {
    var self = this;
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

    chrome.cast.requestSession(
      function(s){
        console.error("[Chromecast] request session : success ",arguments);
        self._session = s;
        self.handleNewSession(s);
      },
      function(){
        console.error("[Chromecast] on launch error ",arguments);
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

*/