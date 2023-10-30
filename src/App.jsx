import { useState } from "react";
import "./App.css";

import axios from "axios";

function App() {
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function getLocation(e) {
    e.preventDefault();
    const res = await axios.get(
      `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${searchTerm}&format=json`
    );
    setLocation(res.data[0]);
  }

  return (
    <>
      <main>
        <form onSubmit={(e) => getLocation(e)}>
          <label htmlFor="location">
            City:
            <input
              autoComplete="off"
              id="location"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              required
              type="text"
            />
          </label>
          <button>Explore!</button>
        </form>
        {location && (
          <article>
            <h2>{location.display_name}</h2>
            <ul>
              <li>Latitude: {location.lat}</li>
              <li>Longitude: {location.lon}</li>
            </ul>
          </article>
        )}
      </main>
    </>
  );
}

export default App;
