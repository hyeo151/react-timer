"use client";

import Box from "./Box";
import { track } from "../types/type";
import { format } from "date-fns";
import Tasktrack from "./Tasktrack";
const { differenceInSeconds } = require("date-fns");

interface DaytrackProps {
  tracks: track[];
  date: string;
}

export default function Daytrack({ tracks, date }: DaytrackProps) {
  const totalDayDuration = tracks.reduce(
    (accumulator, currentValue) =>
      accumulator +
      differenceInSeconds(
        currentValue.end_date_time,
        currentValue.start_date_time
      ),
    0
  );

  const taskTracksGroup = tracks.reduce((acc, track) => {
    const keyString = track.description + "-" + track.project;
    if (!acc[keyString]) {
      acc[keyString] = [];
    }
    acc[keyString].push(track);
    return acc;
  }, {} as { [task: string]: track[] });

  return (
    <div>
      <Box className="bg-slate-400">
        <div className="flex justify-between">
          <p>{date}</p>
          <p>
            {Math.floor(totalDayDuration / 3600)
              .toString()
              .padStart(2, "0")}
            :
            {Math.floor((totalDayDuration % 3600) / 60)
              .toString()
              .padStart(2, "0")}
            :
            {Math.floor(totalDayDuration % 60)
              .toString()
              .padStart(2, "0")}
          </p>
        </div>
      </Box>
      {Object.entries(taskTracksGroup).map(([taskDescription, taskTracks]) => {
        return <Tasktrack key={taskDescription} tracks={taskTracks} />;
      })}
    </div>
  );
}
