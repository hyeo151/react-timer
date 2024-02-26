import { differenceInSeconds, format } from "date-fns";
import Box from "./Box";
import { track } from "../types/type";
import { useState } from "react";
import TaskSubTrack from "./TaskSubTrack";

interface TasktrackProps {
  tracks: track[];
}

function SumTracksDuration(tracks: track[]) {
  const totalDayDuration = tracks.reduce(
    (accumulator, currentValue) =>
      accumulator +
      differenceInSeconds(
        currentValue.end_date_time,
        currentValue.start_date_time
      ),
    0
  );
  return totalDayDuration;
}

function getEarliestLatestTime(tracks: track[]) {
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

  return [earliestStartTime, latestEndTime];
}

export default function Tasktrack({ tracks }: TasktrackProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const track = tracks[0];
  const isCollapsible = tracks.length > 1;

  const trackDuration = isCollapsible
    ? SumTracksDuration(tracks)
    : differenceInSeconds(track.end_date_time, track.start_date_time);

  const [starTime, endTime] = isCollapsible
    ? getEarliestLatestTime(tracks)
    : [track.start_date_time, track.end_date_time];
  let trackElement = (
    <Box>
      <div className="flex gap-2 items-center">
        {isCollapsible && (
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="cursor-pointer"
          >
            {tracks.length}
          </div>
        )}
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
          {format(starTime, "HH:mm")} -{format(endTime, "HH:mm")}
        </div>
        <div className="inline-block bg-white p-1 px-2">
          {Math.floor(trackDuration / 3600)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor((trackDuration % 3600) / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(trackDuration % 60)
            .toString()
            .padStart(2, "0")}
        </div>
        <button className="bg-white hover:bg-neutral-300 p-1 px-2 h-full">
          Start
        </button>
      </div>
    </Box>
  );
  return (
    <>
      {trackElement}
      {!isCollapsed &&
        tracks.length > 1 &&
        tracks.map((track, index) => (
          <TaskSubTrack key={index} track={track} />
        ))}
    </>
  );
}
