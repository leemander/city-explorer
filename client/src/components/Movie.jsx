export default function Movie({ image_url, title, overview }) {
  return (
    <article className="movies__movie">
      <img src={image_url} alt={title} className="movie__poster" />
      <h2>{title}</h2>
      <p>{overview}</p>
    </article>
  );
}
