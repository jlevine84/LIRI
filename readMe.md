Liri.js is a node application that will take in user input and return information based on the request.
There are 4 methods processed through terminal command lines using process.argv; They are as follows.

1. 'concert-this' 'string'
1. 'spotify-this-song' 'string'
1. 'movie-this' 'string'
1. 'do-what-it-says'

Each of the commands preform different search functions. The 'concert-this' and 'movie-this' commands take in a string and send an axios request to their respective APIs and return data on a concert and movie, respectfully. The 'spotify-this-song' will return information on a song searched. The last command of 'do-what-it-says' will read using 'fs' and preform the action that has been noted in the txt file. Each of the functions that take in a string will also append their searches to log.txt which can be used to as a simple database to see what has been searched.

See these images as an example!
![concert example] (./concert.png)
![spotify example] (./spotify.png)
![movie example] (./movie.png)