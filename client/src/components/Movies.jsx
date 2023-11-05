import Movie from "./Movie";

export default function Movies({ movieData }) {
  console.log(movieData);
  return (
    <section className="movies">
      <h3>Movies</h3>
      <div className="movies__wrapper">
        {movieData.map((movie) => {
          return (
            <Movie
              image_url={movie.image_url}
              title={movie.title}
              overview={movie.overview}
            />
          );
        })}
      </div>
    </section>
  );
}
