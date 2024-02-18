"use client";

import Newtrack from "./Newtrack";
import Daytrack from "./Daytrack";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export type track = {
  description: string;
  project: string;
  date: string;
  duration: number;
};

export default function Trackapp() {
  const [tracks, setTracks] = useState<track[]>([]);

  const handleNewTrack = (newTrack: track) => {
    setTracks([...tracks, newTrack]);
    axios.post("http://localhost:8000/tracks", {
      description: newTrack.description,
      project: "Project 1",
      date: newTrack.date,
      duration: newTrack.duration,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get("http://localhost:8000/tracks")
        .then((res) => res.data);
      setTracks(data);
    };
    fetchData();
  }, []);

  const groupedTracks = tracks.reduce((acc, track) => {
    const date = track.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(track);
    return acc;
  }, {} as { [date: string]: track[] });

  return (
    <>
      <Newtrack handleNewTrack={handleNewTrack} />
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <p>Last Week</p>
          <p>Week Total: Number</p>
        </div>

        <div className="flex flex-col gap-4">
          {Object.entries(groupedTracks)
            .reverse()
            .map(([date, tracks]) => {
              return <Daytrack key={date} tracks={tracks} date={date} />;
            })}
        </div>
      </div>
    </>
  );
}
