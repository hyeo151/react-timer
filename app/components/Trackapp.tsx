"use client";

import Newtrack from "./Newtrack";
import Daytrack from "./Daytrack";
import { useState } from "react";

type track = {
  description: string;
  project: string;
  duration: number;
};

export default function Trackapp() {
  const [tracks, setTracks] = useState<track[]>([]);
  return (
    <>
      <Newtrack />
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <p>Last Week</p>
          <p>Week Total: Number</p>
        </div>

        <div className="flex flex-col gap-4">
          <Daytrack />
          <Daytrack />
          <Daytrack />
        </div>
      </div>
    </>
  );
}
