import React, { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
interface StopwatchProps {
  startTime: Date;
  time: number;
  isRunning: boolean;
  handleTimer: (time: number) => void;
}

export default function Stopwatch({
  startTime,
  time,
  isRunning,
  handleTimer,
}: StopwatchProps) {
  const [triggerUpdate, setTriggerUpdate] = useState<number>(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let currentDate = new Date();

    if (isRunning) {
      intervalId = setInterval(() => {
        console.log(differenceInSeconds(currentDate, startTime));
        handleTimer(differenceInSeconds(currentDate, startTime));
        setTriggerUpdate((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime, triggerUpdate]);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor(time % 60);

  return (
    <div>
      <p>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
