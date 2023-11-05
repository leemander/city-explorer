import Movie from "./Movie";

export default function Movies({ movieData }) {
  return (
    <section className="movies">
      <h3>Movies</h3>
      <div className="movies__wrapper">
        {movieData.map((movie) => {
          return (
            <Movie
              key={Math.floor(Math.random() * 1000)}
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
