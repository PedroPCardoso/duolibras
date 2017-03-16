// app code goes here
// matrix.init()....
//
// have fun
// var Spotify = require('spotify-web-api-js');
// var spotifyApi = new Spotify();
// token = spotifyApi.getAccessToken();
// spotifyApi.setAccessToken(token);

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

});
