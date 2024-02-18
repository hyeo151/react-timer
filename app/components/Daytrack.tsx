"use client";

import Box from "./Box";
import { track } from "./Trackapp";

interface DaytrackProps {
  tracks: track[];
  date: string;
}

export default function Daytrack({ tracks, date }: DaytrackProps) {
  return (
    <div>
      <Box className="bg-slate-400">
        <div className="flex justify-between">
          <p>{date}</p>
          <p>Day Total Time</p>
        </div>
      </Box>
      {tracks.map((track, i) => {
        // Hours calculation
        const hours = Math.floor(track.duration / 3600);

        // Minutes calculation
        const minutes = Math.floor((track.duration % 3600) / 60);

        // Seconds calculation
        const seconds = Math.floor(track.duration % 60);
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
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </div>
              <button className="bg-white hover:bg-neutral-300 p-1 px-2 h-full">
                Start
              </button>
            </div>
          </Box>
        );
      })}
    </div>
  );
}
