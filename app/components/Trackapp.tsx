"use client";

import Newtrack from "./Newtrack";
import Daytrack from "./Daytrack";
import { useState } from "react";

export type track = {
  description: string;
  project: string;
  duration: number;
};

export default function Trackapp() {
  const [tracks, setTracks] = useState<track[]>([]);

  const handleNewTrack = (newTrack: track) => {
    setTracks([...tracks, newTrack]);
  };
  return (
    <>
      <Newtrack handleNewTrack={handleNewTrack} />
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <p>Last Week</p>
          <p>Week Total: Number</p>
        </div>

        <div className="flex flex-col gap-4">
          {tracks.map((track, i) => {
            return <Daytrack key={i} track={track} />;
          })}
        </div>
      </div>
    </>
  );
}
