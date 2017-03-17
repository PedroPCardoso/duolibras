// app code goes here
// matrix.init()....
//
// have fun
// var Spotify = require('spotify-web-api-js');
// var spotifyApi = new Spotify();
// token = spotifyApi.getAccessToken();
// spotifyApi.setAccessToken(token);

const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyControl = require('spotify-control');

var spotifyApi = new SpotifyWebApi({
  clientId: '5bbdc263f42244bdb1da7ccfd8d33de6',
  clientSecret: '922ba87fb9f64183a27016b1721220c1',
  accessCode: 'NAowChgKB1Nwb3RpZnkSABoGmAEByAEBJWKvy1gSFHNPKPoprAvIKc-jtdcHFsvppHwb'

});

var spotifyControl = new SpotifyControl({
    token: "NAowChgKB1Nwb3RpZnkSABoGmAEByAEBJY-wy1gSFCSkr4L80W3-YpgwNf-UPfyZlJp3"
});

var demographicsPromise = matrix.service('demographics').start();

demographicsPromise.then(function(demographicsData) {
  var emotion = demographicsData.emotion;
  if (emotion === "HAPPY"){
    matrix.led('yellow').render();

  }
  if (emotion === "CONFUSE"){

    matrix.led('red').render();
  }

  if(emotion === "CALM"){

    matrix.led('blue');
  }


  spotifyApi.searchPlaylists(emotion, {
    country: 'BR',
    limit: 10
  }, function (err, data) {

    if(err) return console.log(err);

    var playlists = data.body.playlists.items;
    var playlist_index = Math.floor((Math.random() * 10));

    play(playlists[playlist_index].uri);
  });

});

function play(uri) {

  spotifyControl.connect().then(v => {
      console.log("Started");
      spotifyControl.play(uri).then(v => {
          console.log("playing");
          spotifyControl.startListener(["play", "pause"]).on("event", data => {
              console.log(JSON.stringify(data, null, 4));
          });
      }, err => {
          console.error(err);
      });
  }, err => {
      console.error("Failed to start: " + err.message);
  });
}
