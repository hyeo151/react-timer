"use client";

import Box from "./Box";

export default function Daytrack({ track }) {
  const { description, project, duration } = track;

  // Hours calculation
  const hours = Math.floor(duration / 3600);

  // Minutes calculation
  const minutes = Math.floor((duration % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor(duration % 60);

  return (
    <div>
      <Box className="bg-slate-400">
        <div className="flex justify-between">
          <p>Day Tracked</p>
          <p>Day Total Time</p>
        </div>
      </Box>
      <Box>
        <div className="flex gap-2 items-center">
          <input type="text" placeholder="description" value={description} />
          <input
            type="text"
            placeholder="Project"
            className="flex-1"
            value={project}
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
    </div>
  );
}
