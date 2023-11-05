import { useState } from "react";
import "./App.css";

import axios from "axios";
import Error from "./components/Error";
import Weather from "./components/Weather";
import Movies from "./components/Movies";

function App() {
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function getLocation(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${searchTerm}&format=json`
      );
      setLocation(res.data[0]);
      getWeather();
      getMovies();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function getWeather() {
    const res = await axios.get(
      `https://city-explorer-backend-k7kw.onrender.com/weather?searchTerm=${searchTerm}`
    );
    setWeatherData(res.data);
  }

  async function getMovies() {
    const res = await axios.get(
      `https://city-explorer-backend-k7kw.onrender.com/movies?searchTerm=${searchTerm}`
    );
    setMovieData(res.data);
  }
  return (
    <>
      <header>
        <div className="container">
          <h1>City Explorer</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <form onSubmit={(e) => getLocation(e)}>
            <label htmlFor="location">
              City:
              <input
                autoComplete="off"
                id="location"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                // required
                type="text"
              />
            </label>
            <button>Explore!</button>
          </form>
          {location && (
            <section className="result">
              <div>
                <h2>{location.display_name}</h2>
                <img
                  src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${`${location.lat},${location.lon}`}&zoom=12`}
                  alt={`Map of ${location.display_name}`}
                />
              </div>
              <div>
                <h3>Information</h3>
                <ul>
                  <li>Latitude: {location.lat}</li>
                  <li>Longitude: {location.lon}</li>
                </ul>

                {weatherData && <Weather weatherData={weatherData} />}
              </div>
            </section>
          )}
          {movieData && <Movies movieData={movieData} />}
        </div>
      </main>
      {errorMessage && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
    </>
  );
}

export default App;
