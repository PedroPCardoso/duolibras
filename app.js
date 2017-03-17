// app code goes here
// matrix.init()....
//
// have fun
// var Spotify = require('spotify-web-api-js');
// var spotifyApi = new Spotify();
// token = spotifyApi.getAccessToken();
// spotifyApi.setAccessToken(token);

var SpotifyWebApi = require('spotify-web-api-node');

var nodemailer = require('nodemailer');


var spotifyApi = new SpotifyWebApi({
  clientId: '5bbdc263f42244bdb1da7ccfd8d33de6',
  clientSecret: '922ba87fb9f64183a27016b1721220c1',
  accessCode: 'NAowChgKB1Nwb3RpZnkSABoGmAEByAEBJWKvy1gSFHNPKPoprAvIKc-jtdcHFsvppHwb'

});

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var email;

matrix.on('emailInput', function(p){
 email = p.value;
});


var demographicsPromise = matrix.service('demographics').start();
var emotion;
demographicsPromise.then(function(demographicsData) {
  emotion = demographicsData.demographics.emotion;
  console.log(emotion);

  var emotions = {"HAPPY": "yellow", "SAD": "red", "CONFUSED": "blue", "ANGRY": "green", "CALM": "white", "SURPRISED": "purple", "DISGUST": "brown"};
  matrix.led(emotions[emotion]).render();
});

var totalink=0;
spotifyApi.searchPlaylists(emotion, {
  country: 'BR',
  limit: 10
}, function (err, data) {

  if(err) return console.log(err);

  var playlists = data.body.playlists.items;
  var playlist_index = Math.floor((Math.random() * 10));
  var j=playlists[playlist_index].uri;
  var res=j;
  for (i=0;i<j.length;i++){
      res = res.replace(":", "/");
  }
  var link =  res.slice(7,res.length);
  totalink= "https://play.spotify.com" + link;

  // detects mood if email is defined and passes on regex test
  if(email && emailRegex.test(email)) {

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'admolizetest@gmail.com',
          pass: 'tapioca123'
        }
    });

    var mailOptions = {
        from: '"Moobify 👻" <Moobify@Moobify.com>', // sender address
        to: email, // list of receivers
        subject: 'playlist✔', // Subject line
        text: 'Your Playlist', // plain text body
        html: '<a href="'+ totalink+'"> " " Sua playlist</a>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info)  {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  } else {

    console.log('email not set');
  }

  matrix.send({playlist: totalink});
});
