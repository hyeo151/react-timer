import React, { useState, useEffect } from "react";

export default function Stopwatch({ time, isRunning, handleTimer }) {
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isRunning) {
      intervalId = setInterval(() => handleTimer(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor(time % 60);

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
