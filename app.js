var SpotifyWebApi = require('spotify-web-api-node');
var nodemailer = require('nodemailer');
var totalink;
var spotifyApi = new SpotifyWebApi({
  clientId: '5bbdc263f42244bdb1da7ccfd8d33de6',
  clientSecret: '922ba87fb9f64183a27016b1721220c1',
  accessCode: 'NAowChgKB1Nwb3RpZnkSABoGmAEByAEBJWKvy1gSFHNPKPoprAvIKc-jtdcHFsvppHwb'

});
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'admolizetest@gmail.com',
     pass: 'tapioca123'
    }
});


var demographicsPromise = matrix.service('demographics').start();
var emotion;
var contador=0;
demographicsPromise.then(function(demographicsData) {
  emotion = demographicsData.demographics.emotion;
  console.log(emotion);

  var emotions = {"HAPPY": "yellow", "SAD": "red", "CONFUSED": "blue", "ANGRY": "green", "CALM": "white", "SURPRISED": "purple", "DISGUST": "brown"};
  matrix.led(emotions[emotion]).render();
  if (contador===0){
    contador++;
    heitor();
  }

});


// use for input email
// matrix.on('testInput', function(p){
//   var text = p.value;
// });


function heitor(){

spotifyApi.searchPlaylists(emotion, {
      country: 'BR',
      limit: 10
    }, function (err, data) {

      if(err) return console.log(err);

      var playlists = data.body.playlists.items;
      var playlist_index = Math.floor((Math.random() * 10));
      var j=playlists[playlist_index].uri;
      var res=j;
      for (i=0;i<j.length;i){
          res = res.replace(":", "/");
      }
      res =  res.split("spotify");


    totalink= "play.spotify.com"+res[1];



    console.log("############");
    console.log(totalink);
    console.log(emotion);
    var mailOptions = {
        from: '"Fred Foo 👻" <pedro@moodify.com>', // sender address
        to: 'pedroecomp@gmail.com, pedroecomp@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Seu humor é '+ emotion, // plain text body
        html: "<a> " + totalink +"</a>" // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info)  {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  });
  contador=0;

}

   // create reusable transporter object using the default SMTP transport




 matrix.send({playlist: totalink});
