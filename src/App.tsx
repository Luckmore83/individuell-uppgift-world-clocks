import './App.css'
import { Routes, Route } from "react-router-dom";
import CityPage from "./pages/CityPage"; // import your new page
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
  }, []);

  const handleCityClick = (cityName: string) => {
  localStorage.setItem("lastVisitedCity", cityName);
  setLastVisitedCity(cityName);
};

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

      <section className="clock-grid" aria-label="City clocks">
        {cities.map((city) => (
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


