var { expect } = require('chai')
const module = angular.mock.module //wepack exposes a module function, which overwrites angular.mock.module


describe('omdb service', () => {
    let movieData = { "Search": [{ "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977" }], "totalResults": "1", "Response": "True" }
    let movieDataById = { "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "Rated": "PG", "Released": "25 May 1977", "Runtime": "121 min", "Genre": "Action, Adventure, Fantasy", "Director": "George Lucas", "Writer": "George Lucas", "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing", "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.", "Language": "English", "Country": "USA", "Awards": "Won 6 Oscars. Another 50 wins & 28 nominations.", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.7/10" }, { "Source": "Rotten Tomatoes", "Value": "93%" }, { "Source": "Metacritic", "Value": "92/100" }], "Metascore": "92", "imdbRating": "8.7", "imdbVotes": "963,318", "imdbID": "tt0076759", "Type": "movie", "DVD": "21 Sep 2004", "BoxOffice": "N/A", "Production": "20th Century Fox", "Website": "http://www.starwars.com/episode-iv/", "Response": "True" }
    var omdbApi;
    var $httpBackend;


    beforeEach(module('omdb'));

    beforeEach(inject((_omdbApi_, _$httpBackend_) => {
        omdbApi = _omdbApi_;

        $httpBackend = _$httpBackend_;
    }));

    it('should handle errors', () => {
        var response;
        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759')
            .respond(500);

        omdbApi.find('tt0076759')
            .catch(function () {
                response = 'Error!';
            });

        $httpBackend.flush();

        expect(response).to.deep.equal('Error!');

    });

    it('should return search movie data', () => {
        var response
        var expectedUrl = 'http://www.omdbapi.com/?v=1&s=star%20wars';

        $httpBackend.when('GET', expectedUrl)
            .respond(200, movieData);

        omdbApi.search('star wars')
            .then(data => response = data)

        $httpBackend.flush();
        expect(response).to.deep.equal(movieData);

    });

    it('should return  movie by id', () => {
        var response;
        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759')
            .respond(200, movieDataById);

        omdbApi.find('tt0076759')
            .then(data => response = data);


        $httpBackend.flush();
        expect(response).to.deep.equal(movieDataById);
    });

});