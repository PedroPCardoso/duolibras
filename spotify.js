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

spotifyApi.searchPlaylists('HAPPY', {
  country: 'BR',
  limit: 10
}, function (err, data) {

  if(err) return console.log(err);

  var playlists = data.body.playlists.items;
  var playlist_index = Math.floor((Math.random() * 10));

  play(playlists[playlist_index].uri);
});

function play(uri) {

  spotifyControl.connect().then(v => {
      console.log("Started");
      console.log("aquiiiiiiiiiii #######");
      console.log(v);
      console.log("aquiiiiiiiiiii #######");
      spotifyControl.play(uri).then(v => {
          console.log("playing");
          console.log("aquiiiiiiiiiii ######2#");
          console.log(v);
          console.log("aquiiiiiiiiiii #######");
          spotifyControl.startListener(["play", "pause"]).on("event", data => {
              console.log(JSON.stringify(data, null, 4));

          });
      },
       err => {
          console.error(err);
      });
  }, err => {
      console.error("Failed to start: " + err.message);
  });

}
