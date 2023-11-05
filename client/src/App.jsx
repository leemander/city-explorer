import { useState } from "react";
import "./App.css";

import axios from "axios";
import Error from "./components/Error";
import Weather from "./components/Weather";

function App() {
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function getLocation(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${searchTerm}&format=json`
      );
      setLocation(res.data[0]);
      getWeather(res.data[0]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function getWeather(location) {
    const res = await axios.get(
      `http://localhost:8080/weather?lat=${location.lat}&lon=${location.lon}&searchTerm=${searchTerm}`
    );
    const weatherArray = [];
    res.data.data.forEach((item) => {
      weatherArray.push({
        date: item.datetime,
        description: item.weather.description,
      });
    });
    setWeatherData(weatherArray);
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
            <article>
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
            </article>
          )}
        </div>
      </main>
      {errorMessage && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
    </>
  );
}

export default App;
