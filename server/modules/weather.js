const axios = require("axios");

async function getWeather(req) {
  const searchTerm = req.query.searchTerm;
  const API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&city=${searchTerm}&days=5`;
  const results = await axios.get(API);
  return results.data.data.map((day) => {
    return {
      date: day.datetime,
      desc: day.weather.description,
    };
  });
}
module.exports = getWeather;
