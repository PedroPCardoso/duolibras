const SpotifyControl = require('spotify-control');
var spotify = new SpotifyControl({
    token: "YOUR_SPOTIFY_TOKEN"
});

spotify.connect().then(v => {
    console.log("Started");
    spotify.play("spotify:track:4LYt31Tg51qsQqWOaZn4C6", "spotify:artist:5byg90wTxATnhB6kK253DF").then(v => {
        console.log("Played");
        spotify.startListener(["play", "pause"]).on("event", data => {
            console.log(JSON.stringify(data, null, 4));
        });
    }, err => {
        console.error(err);
    });
}, err => {
    console.error("Failed to start: " + err.message);
})
