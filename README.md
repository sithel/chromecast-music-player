chromecast-music-player
=======================

Play random tracks from Rdio on your TV via the Chromecast.  Not meant, nor able, to really work for other people.  A random weekend project for our home setup.

sithel wrote the sender application
ajklein wrote the receiver application


# Setup

It isn't possible to programatically auth with Rdio on the Chromecast.  To work around this, manually sign in on the Chromecast device so that the cookies are available.

1. Open up the debugger for your Chromecast http://CHROMECAST-IP:9222/  You'll be on the Chromecast home page, but that's totally fine
2. On the console, go to the Rdio signin page
```javascript
window.location = https://www.rdio.com/account/signin/
```
3. In the console, fill out the form information via JQuery
```javascript
$('.type_email').val('YOUR-EMAIL')
$('.type_password').val('YOUR-PASSWORD')
$('.type_password').change()
$('button[name=submit]').click()
```
4. Wait a bit for the page to start loading (you don't need to wait for the whole page to load)

# APIs

Everything for this setup is either an .html or .js page so there's no secret information, which is nice.

## Chromecast

It costs $5 to get a Chromecast dev account, but it's totally worth it.  You have to find the serial number of your device and enter it on the site.  There's a window of ~15 minutes that you need to allow for the device to register. (requires no attention/action though) 

You'll be given a application ID to put in the sender app.  [ **8A833349** ]
You'll need to provide a sender page and a receiver page.
(note that the sender can be a localhost address but the receiver needs to be reachable on the network, presumably by IP address)

## Rdio

Is free, requires access to beta developer site.

You'll be given a client ID to put in the sender app and the receiver app. [ **uJQhJrLf20C_re-6XjUvcA** ]
You'll need to provide a URL and redirect URLs.  Note that the redirect URLs for both the sender and receiver need to be entered, exactly as you provided to the Chromecast.

