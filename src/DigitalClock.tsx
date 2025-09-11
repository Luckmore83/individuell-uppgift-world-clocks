import { useState, useEffect } from 'react';

interface DigitalClockProps {
  timezone: string;
}

export default function DigitalClock({ timezone }: DigitalClockProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // set to true if you prefer 12-hour clocks
        timeZone: timezone,
      });
      setTime(formatter.format(now));
    };

    updateTime(); // run once immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="clock-digital">
      <span>{time}</span>
    </div>
  );
}