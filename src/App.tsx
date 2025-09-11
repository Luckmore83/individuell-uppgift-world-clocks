import './App.css'
import CityCard from './components/CityCard';
import { useState, useEffect } from "react";
import DigitalClock from "./DigitalClock";
import AnalogClock from './AnalogClock';
import type { AnalogClockSettings } from './interfaces/AnalogClock';

interface City {
  city: string;
  country: string;
  countryCode: string;
  timeZone: string;
}

export default function App() {
  const [cities, setCities] = useState<City[]>([]);

  const analogSettings: AnalogClockSettings = {
    faceColor: '#f4f4f4',
    borderColor: '#800000',
    lineColor: '#000000',
    largeColor: '#800000',
    secondColor: '#ff7f50'
  };

  useEffect(() => {
    fetch("/json/cityList.json")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error loading cities:", err));
  }, []);

    return (
    <>
      <header>
        <h1>World Clocks</h1>
      </header>
    
    <main>
      <section className="clock-grid" aria-label="City clocks">
        {cities.map((city) => (
          <CityCard key={city.city} city={city} settings={analogSettings} />
        ))}
      </section>
    </main>
    </>
  );
}


