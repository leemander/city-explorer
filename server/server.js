const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const axios = require("axios");
app.use(cors());

// function filterWeather(lat, lon, searchTerm) {
//   return weatherData.find((item) => {
//     return (
//       item.lat === lat || item.lon === lon || item.city_name === searchTerm
//     );
//   });
// }

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

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`));
