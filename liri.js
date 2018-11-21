require("dotenv").config();

const Spotify = require("node-spotify-api");
const keys = require("./keys");
const axios = require("axios");
const moment = require("moment");
const spotify = new Spotify(keys.spotify);
const fs = require('fs');



spotifyThisSong = (songName) => {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
        //   return console.log('Error occurred: ' + err);
            process.argv[3] = "The Sign";
            liri();
        }
       
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name); 
      console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
      console.log("Album: " + data.tracks.items[0].album.name); 
      });
}

movieThis = (movieName) => {
    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    // console.log(queryUrl);
    
    axios.get(queryUrl).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

concertThis = (artist) => {
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response) {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ', ' + response.data[0].venue.region);
            console.log(moment(response.data[0].datetime).format('MM/DD/YYYY'));
        }
    );
}

doWhatItSays = () => {
    fs.readFile("./random.txt", "utf8", function(err, data) {
        if(err) {
            return console.log(err);
        }

        // console.log(data);

        var dataArr = data.split(",");
        process.argv[2] = dataArr[0];
        process.argv[3] = dataArr[1];
        liri();
        // console.log(dataArr);
    })
}

// spotifyThisSong(process.argv[2]);
// console.log(moment());
liri = () => {
    switch(process.argv[2]) {
        case 'spotify-this-song':
            spotifyThisSong(process.argv[3])
        break;
        
        case 'movie-this':
            movieThis(process.argv[3])
        break;
        
        case 'concert-this':
            concertThis(process.argv[3])
        break;
    
        case 'do-what-it-says':
            doWhatItSays();
        break;
    }
}

liri();
