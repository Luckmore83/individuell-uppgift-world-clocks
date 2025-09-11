import type { AnalogClockProps } from './interfaces/AnalogClock';
import { useEffect, useRef } from 'react';
import clockAnimation from './utils/clockAnimation';

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