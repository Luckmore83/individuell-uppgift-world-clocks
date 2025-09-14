import './App.css'
import { Routes, Route } from "react-router-dom";
import CityPage from "./pages/CityPage";
import CityCard from './components/CityCard';
import { useState, useEffect } from "react";
import DigitalClock from "./DigitalClock";
import AnalogClock from './AnalogClock';
import type { AnalogClockSettings } from './interfaces/AnalogClock';

// Pros to use Typescript 1:
// I'm using a typescript-specific interface here to make several properties that make up City. 
// and I can add to this later if the need arises.

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

  const [lastVisitedCity, setLastVisitedCity] = useState<string | null>(null);

  useEffect(() => {
    fetch("/json/cityList.json")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error loading cities:", err));

      const savedCity = localStorage.getItem("lastVisitedCity");
  if (savedCity) {
    setLastVisitedCity(savedCity);
  }
    
    const savedCustomCities = localStorage.getItem("customCities");
  if (savedCustomCities) {
    setCustomCities(JSON.parse(savedCustomCities));
  }
  }, []);

  const handleCityClick = (cityName: string) => {
  localStorage.setItem("lastVisitedCity", cityName);
  setLastVisitedCity(cityName);
};

const [customCity, setCustomCity] = useState("");
const [customTimeZone, setCustomTimeZone] = useState("");
const [customCities, setCustomCities] = useState<City[]>([]);

    return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
      <header>
        <h1>World Clocks</h1>
      </header>

      
      {lastVisitedCity && (
        <div className="last-visited">
          <p>
            You last visited{" "}
            <a href={`/city/${lastVisitedCity.toLowerCase()}`}>
              <strong>{lastVisitedCity}</strong>
            </a>
          </p>
        </div>
      )}

      <div className="custom-city-form">
  <h2>Add Your Own City</h2>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (customCity && customTimeZone) {
        const newCity = {
          city: customCity,
          country: "Custom",
          countryCode: "XX",
          timeZone: customTimeZone
        };
        const updated = [...customCities, newCity];
        setCustomCities(updated);
        localStorage.setItem("customCities", JSON.stringify(updated));
        setCustomCity("");
        setCustomTimeZone("");
      }
    }}
  >
    <input className="input-field-city"
      type="text"
      placeholder="City name"
      value={customCity}
      onChange={(e) => setCustomCity(e.target.value)}
      required
    />
    <input className="input-field-tz"
      type="text"
      placeholder="IANA Time Zone (e.g. Europe/London)"
      value={customTimeZone}
      onChange={(e) => setCustomTimeZone(e.target.value)}
      required
    />
    <button type="submit">Add City</button>
  </form>
  <p className="help-link">
  IANA time zones here:
  <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank" className="IANA"> IANA Time Zones</a>
</p>
</div>

      <section className="clock-grid" aria-label="City clocks">
        {[...cities, ...customCities].map((city) => (
          <CityCard 
          key={city.city} 
          city={city} 
          settings={analogSettings}
          onSelect={handleCityClick} />
        ))}
      </section>
    </main>
        }
    />
    <Route path="/city/:name" element={<CityPage />} />
    </Routes>
  );
}


