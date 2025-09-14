import type { AnalogClockProps } from './interfaces/AnalogClock';
import { useEffect, useRef } from 'react';
import clockAnimation from './utils/clockAnimation';

// Pros to use TypeScript 2:
// If I had done this one in Javascript it wouldn't let me know if it worked properly until you run it.
// Typescript tells you right away as you code that something is wrong, or used improperly.
export default function AnalogClock(props: AnalogClockProps) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.dataset.timezone = props.timezone;

  const raf = clockAnimation({
    canvas: canvasRef.current,
    ...props,
  });

  return () => {
    if (raf && raf.latest) cancelAnimationFrame(raf.latest);
  };
}, [props]);

  return (
    <>
      <div className="clock-container-outer">
        <div className="clock-container">
          <canvas ref={canvasRef} width="200" height="200" className="clock-canvas"></canvas>
        </div>
      </div>
    </>
  );
}