import WeatherDay from "./WeatherDay";
export default function Weather({ weatherData }) {
  return (
    <>
      <h4>Weather</h4>
      <ul className="weather">
        {weatherData.map(({ date, desc }, index) => {
          return <WeatherDay key={index + 1} date={date} desc={desc} />;
        })}
      </ul>
    </>
  );
}
