// Code from:
// https://github.com/thegirlcoderr/animated-clock
// (slightly modified from JS to TS and with sweeping seconds)

import type { AnalogClockAnimationArgs } from "../interfaces/AnalogClock";

const requestAnimationFrameHolder = { latest: 0 };

export default function clockAnimation({
  canvas, faceColor, borderColor,
  lineColor, largeColor, secondColor
}: AnalogClockAnimationArgs) {

  function getTimePartsInTimeZone(timeZone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const timeParts = Object.fromEntries(parts.map(p => [p.type, parseInt(p.value) || 0]));
  return {
    hr: (timeParts.hour ?? 0) % 12,
    mins: timeParts.minute ?? 0,
    secs: timeParts.second ?? 0
  };
}
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const canvasSize = canvas.width;
  const center = canvasSize / 2;

  // setting up canvas
  context.save(); // this will save the default state
  context.clearRect(0, 0, canvasSize, canvasSize); // to clear the rectangle
  context.translate(center, center); // to move canvas to the middle
  context.rotate(-Math.PI / 2); // to rotate -90 degrees

  // to set default styles
  context.strokeStyle = ' #000000';
  context.fillStyle = '#f4f4f4';
  context.lineWidth = 5;
  context.lineCap = 'round';

  // draw clock face/border
  context.save();
  context.beginPath();
  context.lineWidth = 14;
  context.strokeStyle = borderColor;
  context.fillStyle = faceColor;
  context.arc(0, 0, center - 8, 0, Math.PI * 2, true);
  context.stroke(); //this will make the face of the clock appear
  context.fill();
  context.restore();

  // draw hour lines
  context.save();
  context.strokeStyle = lineColor;
  for (let i = 0; i < 12; i++) {
    context.beginPath();
    context.rotate(Math.PI / 6);
    context.moveTo(95, 0);
    context.lineTo(80, 0);
    context.stroke();
  }
  context.restore();

  // draw minutes lines
  context.save();
  context.strokeStyle = lineColor;
  context.lineWidth = 4;

  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      context.beginPath();
      context.moveTo(90, 0);
      context.lineTo(85, 0);
      context.stroke();
    }
    context.rotate(Math.PI / 30);
  }
  context.restore();

  // get current time
  const { hr, mins, secs } = getTimePartsInTimeZone(canvas.dataset.timezone ?? "UTC");

  // draw hour hand
  context.save();
  context.rotate((Math.PI / 6) * hr + (Math.PI / 360) * mins + (Math.PI / 21600) * secs);
  context.strokeStyle = largeColor;
  context.lineWidth = 14;
  context.beginPath();
  context.moveTo(-20, 0);
  context.lineTo(70, 0);
  context.stroke();
  context.restore();

  // draw the min hand
  context.save();
  context.rotate((Math.PI / 30) * mins + (Math.PI / 1800) * secs);
  context.strokeStyle = largeColor;
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(-28, 0);
  context.lineTo(100, 0);
  context.stroke();
  context.restore();

  // draw sec hand
  context.save();
  context.rotate((Math.PI / 30) * secs);
  context.strokeStyle = secondColor;
  context.fillStyle = secondColor;
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(-30, 0);
  context.lineTo(100, 0);
  context.stroke();
  context.beginPath();
  context.arc(0, 0, 10, 0, Math.PI * 2, true);
  context.fill();
  context.restore();

  context.restore(); //this restores default state

  // Remember the latest call to requestAnimationFrame
  // so we can cancel it (in a useEffect in AnalogClock.tsx)
  requestAnimationFrameHolder.latest =
    requestAnimationFrame(() => clockAnimation(
      { canvas, faceColor, borderColor, lineColor, largeColor, secondColor }
    ));

  return requestAnimationFrameHolder;
}

