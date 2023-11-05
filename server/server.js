const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const axios = require("axios");
app.use(cors());

app.get("/weather", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&city=${searchTerm}&days=5`;
  const results = await axios.get(API);
  const wrangledData = results.data.data.map((day) => {
    return {
      date: day.datetime,
      desc: day.weather.description,
    };
  });
  res.json(wrangledData);
});

app.get("/movies", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const API = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${process.env.MOVIE_KEY}`;
  const results = await axios.get(API);

  const wrangledData = results.data.results
    .map((movie) => {
      return {
        title: movie.original_title,
        overview: movie.overview,
        average_vote: movie.vote_average,
        total_votes: movie.vote_count,
        image_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        popularity: movie.popularity,
        released_on: movie.release_date,
      };
    })
    .sort((a, b) => b.popularity - a.popularity)
    .splice(0, 5);
  res.json(wrangledData);
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`));
