export default function Weather({ weatherData }) {
  return (
    <>
      <h4>Weather</h4>
      <ul className="weather">
        {weatherData.map(({ date, desc }) => {
          return (
            <li key={Math.floor(Math.random() * 1000)}>{`${date}: ${desc}`}</li>
          );
        })}
      </ul>
    </>
  );
}
