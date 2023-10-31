export default function Weather({ weatherData }) {
  return (
    <>
      <h4>Weather</h4>
      <ul className="weather">
        {weatherData.map(({ date, description, index }) => {
          return <li key={index + 1}>{`${date}: ${description}`}</li>;
        })}
      </ul>
    </>
  );
}
