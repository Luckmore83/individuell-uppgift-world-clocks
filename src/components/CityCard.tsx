import AnalogClock from '../AnalogClock';
import DigitalClock from '../DigitalClock';
import type { AnalogClockSettings } from '../interfaces/AnalogClock';

interface City {
  city: string;
  country: string;
  timeZone: string;
}

export default function CityCard({
  city,
  settings,
}: {
  city: City;
  settings: AnalogClockSettings;
}) {
  return (
    <article className="clock-card">
      <h2 className="clock-city">
        {city.city}, {city.country}
      </h2>

      {/* Analog clock */}
      <AnalogClock {...settings} timezone={city.timeZone} />

      {/* Digital clock */}
      <DigitalClock timezone={city.timeZone} />

      {/* Optional: city image */}
      <figure>
        <img
          src={`https://source.unsplash.com/800x450/?${encodeURIComponent(city.city)}`}
          alt={`View of ${city.city}`}
          loading="lazy"
        />
        <figcaption>{city.city}</figcaption>
      </figure>
    </article>
  );
}