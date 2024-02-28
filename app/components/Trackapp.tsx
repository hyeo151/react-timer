"use client";

import Newtrack from "./Newtrack";
import Daytrack from "./Daytrack";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase";
import { track } from "../types/type";
import { format, lastDayOfWeek, startOfWeek } from "date-fns";
import { differenceInSeconds } from "date-fns";

export default function Trackapp() {
  const [tracks, setTracks] = useState<track[]>([]);
  const supabase = createClient();

  const insertDataSupabase = async (newTrack: track) => {
    const { data, error } = await supabase
      .from("tracks")
      .insert({
        description: newTrack.description,
        project: newTrack.project,
        start_date_time: newTrack.start_date_time,
        end_date_time: newTrack.end_date_time,
      })
      .select();
    if (error) {
      console.log(error);
      return;
    }
    return data[0];
  };

  const handleNewTrack = async (newTrack: any) => {
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
    const startDateOfWeek = format(
      startOfWeek(track.start_date_time, {
        weekStartsOn: 1,
      }),
      "MM/dd/yyyy"
    );
    const endDateOfWeek = format(
      lastDayOfWeek(track.start_date_time, {
        weekStartsOn: 1,
      }),
      "MM/dd/yyyy"
    );

    const weekString = startDateOfWeek + "-" + endDateOfWeek;

    const trackDate = format(track.start_date_time, "MM/dd/yyyy");

    if (!acc[weekString]) {
      acc[weekString] = {};
    }
    if (!acc[weekString][trackDate]) {
      acc[weekString][trackDate] = [];
    }
    acc[weekString][trackDate].push(track);
    return acc;
  }, {} as { [week: string]: { [date: string]: track[] } });

  return (
    <>
      <Newtrack handleNewTrack={handleNewTrack} />
      <div className="mt-10">
        {Object.entries(groupedDayTracks).map(([key, values]) => {
          const weekDurationArray = Object.values(values).map((dayTracks) => {
            const totalDayDuration = dayTracks.reduce(
              (accumulator, currentValue) =>
                accumulator +
                differenceInSeconds(
                  currentValue.end_date_time,
                  currentValue.start_date_time
                ),
              0
            );
            return totalDayDuration;
          });
          const weekDurationSum = weekDurationArray.reduce((a, b) => a + b, 0);
          return (
            <div key={key}>
              <div className="flex justify-between mb-5 mt-5">
                <p>{key}</p>
                <p>
                  Week Total:{" "}
                  {Math.floor(weekDurationSum / 3600)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {Math.floor((weekDurationSum % 3600) / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {Math.floor(weekDurationSum % 60)
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              {Object.entries(values).map(([trackKey, trackValues]) => {
                return (
                  <div key={trackKey} className="flex flex-col gap-4">
                    <Daytrack
                      key={trackKey}
                      tracks={trackValues}
                      date={trackKey}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
