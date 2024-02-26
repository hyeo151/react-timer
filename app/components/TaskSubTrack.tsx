import { differenceInSeconds, format } from "date-fns";
import Box from "./Box";
import { track } from "../types/type";

interface TaskSubTrackProps {
  track: track;
}

export default function TaskSubTrack({ track }: TaskSubTrackProps) {
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
}
