import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import DigitalClock from "../DigitalClock";
import AnalogClock from "../AnalogClock";
import type { AnalogClockSettings } from "../interfaces/AnalogClock";
import cities from "../../public/json/cityList.json";
import { isValidTimeZone } from "../utils/isValidTimeZone";

const analogSettings: AnalogClockSettings = {
  faceColor: '#f4f4f4',
  borderColor: '#800000',
  lineColor: '#000000',
  largeColor: '#800000',
  secondColor: '#ff7f50'
};

export default function CityPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const city = cities.find(c => c.city.toLowerCase() === name?.toLowerCase());

  useEffect(() => {
  if (city) {
    localStorage.setItem("lastVisitedCity", city.city); 
  }
}, [city]);
  
    if (!city) return <p>City not found</p>;

  const imageFileName = city.city.toLowerCase().replace(/\s+/g, "_") + ".jpg";

  return (
    <main className="city-page">
        <button onClick={() => navigate("/")} className="back-button">← Back</button>
      <h1>{city.city}, {city.country}</h1>
      <img
        src={`/images/${imageFileName}`}
        alt={`View of ${city.city}`}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "1rem" }}
      />

      {!isValidTimeZone(city.timeZone) ? (
  <p style={{ color: "red" }}>Invalid time zone: {city.timeZone}</p>
) : (
    <>
      <AnalogClock {...analogSettings} timezone={city.timeZone} />
      <DigitalClock timezone={city.timeZone} />
      </>
      )}
    </main>
  );
}