const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

const weatherData = require("./data/weather.json");

function filterWeather(lat, lon, searchTerm) {
  return weatherData.find((item) => {
    return (
      item.lat === lat || item.lon === lon || item.city_name === searchTerm
    );
  });
}

app.get("/weather", (req, res) => {
  const { lat, lon, searchTerm } = req.query;
  res.json(filterWeather(lat, lon, searchTerm));
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`));
