var SpotifyWebApi = require('spotify-web-api-node');
var nodemailer = require('nodemailer');

var algorithm = 'demographics';
var service = matrix.service(algorithm);

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

service.start().then(function(data) {
    service.stop();
    var emotions = {"HAPPY": "yellow", "SAD": "red", "CONFUSED": "blue", "ANGRY": "green", "CALM": "white", "SURPRISED": "purple", "DISGUST": "brown"};

    if (Object.keys(data.demographics).length > 0) {
        matrix.led(emotions[data.demographics.emotion]).render();
        var emotion = data.demographics.emotion;

        spotifyApi.searchPlaylists(emotion)
        .then(function(response) {
            var playlists = response.body.playlists.items;
            var playlists_index = Math.floor((Math.random() * 10));
            var res = playlists[playlists_index].uri;
            res = res.replace(':', '/');
            res = res.split("spotify");

            var data = { link: "play.spotify.com"+res[1], emotion: emotion };
            var mailOptions = {
                from: '"Porque undefined, @Deus?  👻" <pedro@moodify.com>', // sender address
                to: 'lucas.morais@admobilize.com, pedroecomp@gmail.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                html: "Seu humor é " + data.emotion + " <a> " + data.link + "</a>" // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info)  {
                if(error) {
                    console.log('\n\n 1 ===================================================>');
                    console.log(error);
                    console.log('===================================================>\n\n');
                }

                matrix.send({ playlist: data.link });
            });
        }, function(error) {
            console.log('\n\n 2 ===================================================>');
            console.log(error);
            console.log('===================================================>\n\n');
        });
    }
});
