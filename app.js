var SpotifyWebApi = require('spotify-web-api-node');
var nodemailer = require('nodemailer');
var async = require('async');
var spotifyApi = new SpotifyWebApi({
  clientId: '5bbdc263f42244bdb1da7ccfd8d33de6',
  clientSecret: '922ba87fb9f64183a27016b1721220c1',
  accessCode: 'NAowChgKB1Nwb3RpZnkSABoGmAEByAEBJWKvy1gSFHNPKPoprAvIKc-jtdcHFsvppHwb'
});
var totalLink  = '';

var algorithm = 'demographics';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'admolizetest@gmail.com',
     pass: 'tapioca123'
    }
});
function detect(){
    async.waterfall([
        function(callback){
            matrix.service(algorithm).start().then(function(data){
                var emotions = {"HAPPY": "yellow", "SAD": "red", "CONFUSED": "blue", "ANGRY": "green", "CALM": "white", "SURPRISED": "purple", "DISGUST": "brown"};
                if (Object.keys(data.demographics).length > 0){
                    matrix.led(emotions[data.demographics.emotion]).render();
                    matrix.service('demographics').stop();
                    return callback(null, data.demographics.emotion);
                }
                return callback("No demographics");
            });
        }, function(emotion, callback) {
            matrix.service(algorithm).stop();
            spotifyApi.searchPlaylists(emotion)
                .then(function(data){
                    var playlists = data.body.playlists.items;
                    var playlists_index = Math.floor((Math.random() * 10));
                    var res = playlists[playlists_index].uri;
                    res = res.replace(':', '/');
                    res = res.split("spotify");

                    totalLink = "play.spotify.com"+res[1];

                    return callback(null, { link: totalLink, emotion: emotion });
                }, function(error) {
                    return callback(error);
                });
        }, function(data, callback) {
            var mailOptions = {
                from: '"Fred Foo 👻" <pedro@moodify.com>', // sender address
                to: 'lucas.morais@admobilize.com, pedroecomp@gmail.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Seu humor é '+ data.emotion, // plain text body
                html: "<a> " + data.totalLink +"</a>" // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info)  {
                if (error) return callback(error);
                console.log('Message %s sent: %s', info.messageId, info.response);
                return callback(null, data.totalLink);
            });
        }
        ], function(error, data){
            if (error) return callback(error);
            matrix.send({ playlist: data.totalLink });
        });
}

detect();
matrix.send({playlist: totalLink});
