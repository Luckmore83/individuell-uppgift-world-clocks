import type { AnalogClockProps } from './interfaces/AnalogClock';
import { useState, useEffect, useRef } from 'react';
import AnalogSettings from './AnalogSettings';
import clockAnimation from './utils/clockAnimation';

export default function AnalogClock(props: AnalogClockProps) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const requestAnimationFrameHolder =
      clockAnimation({
        canvas: canvasRef.current,
        ...props // includes timezone now
      });

    return () => cancelAnimationFrame(requestAnimationFrameHolder.latest);
  }, [props]); // re-run if timezone or settings change

  return (
    <>
      {showSettings ? (
        <AnalogSettings {...{ ...props, setShowSettings }} />
      ) : (
        <button
          className="clock-settings"
          onClick={(e) => {
            setShowSettings(!showSettings);
            e.stopPropagation();
          }}
        >
          Set colors
        </button>
      )}
      <div className="clock-container-outer">
        <div className="clock-container">
          <canvas ref={canvasRef} width="500" height="500"></canvas>
        </div>
      </div>
    </>
  );
}