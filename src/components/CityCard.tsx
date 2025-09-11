import AnalogClock from '../AnalogClock';
import DigitalClock from '../DigitalClock';
import { Link } from "react-router-dom";
import type { AnalogClockSettings } from '../interfaces/AnalogClock';
import { isValidTimeZone } from "../utils/isValidTimeZone";

interface City {
  city: string;
  country: string;
  timeZone: string;
}

interface CityCardProps {
  city: City;
  settings: AnalogClockSettings;
  onSelect: (cityName: string) => void;
}

export default function CityCard({city, settings, onSelect }: CityCardProps) {
  const imageFileName = city.city.toLowerCase().replace(/\s+/g, '_') + '.jpg';
  const imageUrl = `/images/${imageFileName}`;
  
  return (
    <Link to={`/city/${city.city.toLowerCase()}`} className="clock-card" onClick={() => onSelect(city.city)} style={{ cursor: 'pointer' }}>
      <h2 className="clock-city">{city.city}, {city.country}</h2>

{isValidTimeZone(city.timeZone) ? (
  <>
      <AnalogClock {...settings} timezone={city.timeZone} />
      <DigitalClock timezone={city.timeZone} />
       </>
      ) : (
        <p style={{ color: "red" }}>
          Invalid time zone: {city.timeZone}
        </p>
      )}

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
    </Link>
  );
}