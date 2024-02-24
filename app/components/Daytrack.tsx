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
      {/* {tracks.map((track, i) => {
        const duration = differenceInSeconds(
          track.end_date_time,
          track.start_date_time
        );
        // Hours calculation
        const hours = Math.floor(duration / 3600);

        // Minutes calculation
        const minutes = Math.floor((duration % 3600) / 60);

        // Seconds calculation
        const seconds = Math.floor(duration % 60);
        return (
          <Box key={i}>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="description"
                value={track.description}
                readOnly
              />
              <input
                type="text"
                placeholder="Project"
                className="flex-1"
                value={track.project}
                readOnly
              />
              <div className="inline-block bg-white p-1 px-2">
                {format(track.start_date_time, "HH:mm")} -
                {format(track.end_date_time, "HH:mm")}
              </div>
              <div className="inline-block bg-white p-1 px-2">
                {hours.toString().padStart(2, "0")}:
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </div>
              <button className="bg-white hover:bg-neutral-300 p-1 px-2 h-full">
                Start
              </button>
            </div>
          </Box>
        );
      })} */}
    </div>
  );
}
