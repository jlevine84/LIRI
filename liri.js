//Initialize variables and requirements
//TODO: Markdown 
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment")
const Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = "";

for (i = 3; i < process.argv.length; i++) {
    if (i > 3) {
        input = input + "+" + process.argv[i]
    } else {
        input = process.argv[i]
    }
}

//Function to preform API search and display concert information based off the band's name
function concertSearch(bandName) {
    //Axios search of the band
    var queryUrl = "https://rest.bandsintown.com/artists/"+bandName+"/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function (response) {
        console.log(response.data[0].lineup + " will next be playing live at: ")
        console.log(response.data[0].venue.name)
        console.log(response.data[0].venue.city+", "+response.data[0].venue.region)
        let date = moment(response.data[0].datetime)
        console.log(date.format( "MM/DD/YY hh:mm A")) 

    }).catch(function(err){
        console.log(err)
    })

}

//Function to preform API search for a song name and display its' info
function songSearch(songName) {
    if (songName === "") {
        songName = "the+sign"
    } else {
        songName = songName
    }
    spotify.search({type: "track", query: songName, limit: 1}, function(err, data) {
        if (err) {
            return console.log(err)
        }
        console.log("\nArtist Name: " + data.tracks.items[0].album.artists[0].name)
        console.log("Album Name: " + data.tracks.items[0].album.name)
        console.log(data.tracks.items[0].album.artists[0].external_urls.spotify)
    })

}

//Function to preform API search of a movie title and display its' info
function movieSearch(movieName) {
    if (movieName === ""){
        movieName = "Mr+Nobody"
    } else {
        movieName = movieName
    }

    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t="+movieName
    axios.get(queryUrl).then(function (response) {

        console.log("\nMovie Title: "+ response.data.Title)
        console.log("Year released: "+ response.data.Year)
        console.log("IMDB Rating: "+ response.data.imdbRating)
        console.log("Rotten Tomatoes Rating: "+ response.data.Ratings[1].Value)
        console.log("Produced in: " + response.data.Country)
        console.log("Language: "+ response.data.Language)
        console.log("Plot: "+ response.data.Plot)
        console.log("Actors: "+ response.data.Actors)

    }).catch(function(err){
        console.log(err)
    })

}

//Function to read text file and preform the text's search parameters
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err)
        }
        dataArray = data.split(",")
        var commandData = dataArray[0];
        var inputData = dataArray[1].replace(/"/g,"")
        var inputData = inputData.split(" ").join("+")
        run(commandData, inputData)
    })
}

//Function that records all user's input
function addToLog(command, input) {
    input = input.split("+");
    input = input.join(" ")
    var textToAdd = command + ", " + input + "||"
    
    fs.appendFile("log.txt", textToAdd, function (err){
        if (err) {
            console.log(err)
        }
    })
}

//Function to run the command and input of the user's argv arguements
function run(command, input) {
    switch(command){
        case "concert-this":
        concertSearch(input)
        addToLog(command, input)
        break;

        case "spotify-this-song":
        songSearch(input)
        addToLog(command, input)
        break;

        case "movie-this":
        movieSearch(input)
        addToLog(command, input)
        break;

        case "do-what-it-says":
        doWhatItSays();
        break;

        default: "do-what-it-says"
    }
}

run(command, input);
