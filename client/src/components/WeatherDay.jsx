export default function WeatherDay({ date, desc }) {
  return (
    <li>
      <p className="weather__date">{date}</p>
      <p>{desc}</p>
    </li>
  );
}
