const getMovies = app.get("/movies", async (req, res) => {
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

module.exports = getMovies;
