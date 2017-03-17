
var SpotifyWebApi = require('spotify-web-api-node');
var SpotifyControl = require('spotify-control');

var spotifyApi = new SpotifyWebApi({
  clientId: '5bbdc263f42244bdb1da7ccfd8d33de6',
  clientSecret: '922ba87fb9f64183a27016b1721220c1',
  accessCode: 'NAowChgKB1Nwb3RpZnkSABoGmAEByAEBJWKvy1gSFHNPKPoprAvIKc-jtdcHFsvppHwb'

});

spotifyApi.searchPlaylists("happy", {
  country: 'BR',
  limit: 10
}, function (err, data) {

  if(err) return console.log(err);

  var playlists = data.body.playlists.items;
  var playlist_index = Math.floor((Math.random() * 10));
  var j=playlists[playlist_index].uri;
  var res=j;
  for (i=0;i<j.length;i++){
  var res = res.replace(":", "/");
  }

  console.log(res);

});
