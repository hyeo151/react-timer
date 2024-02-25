import { differenceInSeconds, format } from "date-fns";
import Box from "./Box";
import { track } from "../types/type";
import { useState } from "react";

interface TasktrackProps {
  tracks: track[];
}

export default function Tasktrack({ tracks }: TasktrackProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  let trackElement;

  if (tracks.length > 1) {
    const totalDayDuration = tracks.reduce(
      (accumulator, currentValue) =>
        accumulator +
        differenceInSeconds(
          currentValue.end_date_time,
          currentValue.start_date_time
        ),
      0
    );

    let earliestStartTime!: Date;
    let latestEndTime!: Date;

    tracks.forEach((track, index) => {
      const startDate = new Date(track.start_date_time);
      const endDate = new Date(track.end_date_time);

      if (index === 0) {
        earliestStartTime = startDate;
        latestEndTime = endDate;
        return;
      }
      // Check if the current start date is earlier than the stored earliest start date
      if (startDate < earliestStartTime) {
        earliestStartTime = startDate;
      }

      // Check if the current end date is later than the stored latest end date
      if (endDate > latestEndTime) {
        latestEndTime = endDate;
      }
    });

    trackElement = (
      <Box>
        <div className="flex gap-2 items-center">
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="cursor-pointer"
          >
            {tracks.length}
          </div>
          <input
            type="text"
            placeholder="description"
            value={tracks[0].description}
            readOnly
          />
          <input
            type="text"
            placeholder="Project"
            className="flex-1"
            value={tracks[0].project}
            readOnly
          />
          <div className="inline-block bg-white p-1 px-2">
            {format(earliestStartTime, "HH:mm")} -
            {format(latestEndTime, "HH:mm")}
          </div>
          <div className="inline-block bg-white p-1 px-2">
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
          </div>
          <button className="bg-white hover:bg-neutral-300 p-1 px-2 h-full">
            Start
          </button>
        </div>
      </Box>
    );
  } else {
    const duration = differenceInSeconds(
      tracks[0].end_date_time,
      tracks[0].start_date_time
    );
    // Hours calculation
    const hours = Math.floor(duration / 3600);

    // Minutes calculation
    const minutes = Math.floor((duration % 3600) / 60);

    // Seconds calculation
    const seconds = Math.floor(duration % 60);
    trackElement = (
      <Box>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="description"
            value={tracks[0].description}
            readOnly
          />
          <input
            type="text"
            placeholder="Project"
            className="flex-1"
            value={tracks[0].project}
            readOnly
          />
          <div className="inline-block bg-white p-1 px-2">
            {format(tracks[0].start_date_time, "HH:mm")} -
            {format(tracks[0].end_date_time, "HH:mm")}
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
  }
  return (
    <>
      {trackElement}
      {!isCollapsed &&
        tracks.length > 1 &&
        tracks.map((track) => {
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
            <Box className="bg-slate-200">
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
        })}
    </>
  );
}
