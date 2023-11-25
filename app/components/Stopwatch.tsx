import React, { useState, useEffect } from "react";

type StopwatchProps = {
  time: number;
  isRunning: boolean;
  setTime: (time: number) => void;
};

export default function Stopwatch({
  time,
  isRunning,
  setTime,
}: StopwatchProps) {
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor(time % 60);

  // Milliseconds calculation
  //   const milliseconds = time % 100;

  // Method to start and stop timer
  //   const startAndStop = () => {
  //     setIsRunning(!isRunning);
  //   };

  // Method to reset timer back to 0
  //   const reset = () => {
  //     setTime(0);
  //   };
  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
