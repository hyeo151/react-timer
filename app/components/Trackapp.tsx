"use client";

import Newtrack from "./Newtrack";
import Daytrack from "./Daytrack";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase";
import { track } from "../types/type";
import moment from "moment";

export default function Trackapp() {
  const [tracks, setTracks] = useState<track[]>([]);
  const supabase = createClient();

  const insertDataSupabase = async (newTrack: track) => {
    const { data, error } = await supabase
      .from("tracks")
      .insert({
        description: newTrack.description,
        project: "Project 1",
        duration: newTrack.duration,
      })
      .select();
    if (error) {
      console.log(error);
      return;
    }
    return data[0];
  };

  const handleNewTrack = async (newTrack: track) => {
    const data = await insertDataSupabase(newTrack);
    if (data) {
      setTracks([...tracks, data]);
    }
  };

  useEffect(() => {
    const fetchDataSupabase = async () => {
      const { data: tracks } = await supabase
        .from("tracks")
        .select()
        .order("created_at", { ascending: false });

      if (!tracks) {
        return;
      }
      setTracks(tracks);
    };
    fetchDataSupabase();
  }, []);

  const groupedDayTracks = tracks.reduce((acc, track) => {
    const date = track.created_at.slice(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(track);
    return acc;
  }, {} as { [date: string]: track[] });

  const groupedWeekTracks = Object.entries(groupedDayTracks).reduce(
    (acc, dayTrack) => {
      const yearWeek = `${moment(dayTrack[0]).year()}-${moment(
        dayTrack[0]
      ).week()}`;

      if (!acc[yearWeek]) {
        acc[yearWeek] = [];
      }
      acc[yearWeek].push(dayTrack[1]);
      return acc;
    },
    {} as { [key: string]: [track[]?] }
  );
  return (
    <>
      <Newtrack handleNewTrack={handleNewTrack} />
      <div className="mt-10">
        {/* {Object.entries(groupedWeekTracks).map(([weeklyKey, weeklyValues]) => (
          <div>
            {weeklyKey}
            {weeklyValues.map((dailyTracks) => {
              console.log("dailyTracks");
              console.log(dailyTracks);
              return <Daytrack tracks={tracks} date={weeklyKey} />;
            })}
          </div>
        ))} */}

        <div className="flex justify-between mb-5">
          <p>Last Week</p>
          <p>Week Total: Number</p>
        </div>

        <div className="flex flex-col gap-4">
          {Object.entries(groupedDayTracks).map(([date, tracks]) => {
            return <Daytrack key={date} tracks={tracks} date={date} />;
          })}
        </div>
      </div>
    </>
  );
}
