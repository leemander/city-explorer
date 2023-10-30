import { useState } from "react";
import "./App.css";

import axios from "axios";
import Error from "./components/Error";

function App() {
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapURL, setMapURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function getLocation(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${searchTerm}&format=json`
      );
      setLocation(res.data[0]);
      setMapURL(
        `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${`${res.data[0].lat},${res.data[0].lon}`}&zoom=12`
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
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
                <img src={mapURL} alt={`Map of ${location.display_name}`} />
              </div>
              <div>
                <h3>Information</h3>
                <ul>
                  <li>Latitude: {location.lat}</li>
                  <li>Longitude: {location.lon}</li>
                </ul>
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
