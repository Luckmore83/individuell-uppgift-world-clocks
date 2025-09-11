import AnalogClock from '../AnalogClock';
import DigitalClock from '../DigitalClock';
import type { AnalogClockSettings } from '../interfaces/AnalogClock';

interface City {
  city: string;
  country: string;
  timeZone: string;
}

export default function CityCard({city, settings }: CityCardProps) {
  const imageFileName = city.city.toLowerCase().replace(/\s+/g, '_') + '.jpg';
  const imageUrl = `/images/${imageFileName}`;
  
  return (
    <article className="clock-card">
      <h2 className="clock-city">
        {city.city}, {city.country}
      </h2>

      <AnalogClock {...settings} timezone={city.timeZone} />

      <DigitalClock timezone={city.timeZone} />

      <figure>
        <img
          src={imageUrl}
          alt={`View of ${city.city}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/default.jpg';
          }}
          loading="lazy"
        />
        <figcaption>{city.city}</figcaption>
      </figure>
    </article>
  );
}