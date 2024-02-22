"use client";

import Newtrack from "./Newtrack";
import Daytrack from "./Daytrack";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type track = {
  id: number;
  description: string;
  project: string;
  created_at: string;
  duration: number;
};

export default function Trackapp() {
  const [tracks, setTracks] = useState<track[]>([]);
  const supabase = createClient();

  const insertDataSupabase = async (newTrack: track) => {
    console.log("inserting data");
    const { error } = await supabase.from("tracks").insert({
      description: newTrack.description,
      project: "Project 1",
      duration: newTrack.duration,
    });

    if (error) {
      console.log(error);
    }
  };

  const fetchDataSupabase = async () => {
    console.log("fetching data");
    const { data: tracks } = await supabase.from("tracks").select();
    if (!tracks) {
      return;
    }
    setTracks(tracks);
  };

  const handleNewTrack = (newTrack: track) => {
    insertDataSupabase(newTrack);
    fetchDataSupabase();
  };

  useEffect(() => {
    const fetchDataSupabase = async () => {
      const { data: tracks } = await supabase.from("tracks").select();
      if (!tracks) {
        return;
      }
      setTracks(tracks);
    };
    fetchDataSupabase();
  }, []);

  const groupedTracks = tracks.reduce((acc, track) => {
    const date = track.created_at.slice(0, 10);
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
