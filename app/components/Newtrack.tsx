"use client";

import { MdEditNote, MdOutlineTimer } from "react-icons/md";
import Box from "./Box";
import Stopwatch from "./Stopwatch";
import { useRef, useState } from "react";
import { track } from "../types/type";
import { createClient } from "../utils/supabase";

interface NewtrackProps {
  handleNewTrack: (newTrack: track) => void;
}

export default function Newtrack({ handleNewTrack }: NewtrackProps) {
  const [projectDescription, setProjectDescription] = useState("");
  const [project, setProject] = useState("Project Example 1");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  let startDateTime_ref = useRef<Date>(new Date());
  let endDateTime_ref = useRef<Date>(new Date());

  const supabase = createClient();

  const insertStartTimeSupabase = async (newTrack: any) => {
    const { data, error } = await supabase
      .from("tracks")
      .insert({
        start_date_time: newTrack.start_date_time,
      })
      .select();
    if (error) {
      console.log(error);
      return;
    }
    return data[0];
  };

  const handleTimerButton = async () => {
    if (!isRunning) {
      startDateTime_ref.current = new Date();
      const { id } = await insertStartTimeSupabase({
        start_date_time: startDateTime_ref.current,
      });
    }
    setIsRunning(!isRunning);
    if (projectDescription && isRunning) {
      endDateTime_ref.current = new Date();

      setProjectDescription("");
      setTime(0);

      handleNewTrack({
        description: projectDescription,
        project: project,
        start_date_time: startDateTime_ref.current,
        end_date_time: endDateTime_ref.current,
      });
    }
  };

  const handleTimer = (newTime: number) => {
    setTime(newTime);
  };

  return (
    <Box>
      <div className="flex gap-2 items-center">
        <input
          className="p-2 flex-grow"
          type="text"
          value={projectDescription}
          onChange={(e) => {
            setProjectDescription(e.target.value);
          }}
          placeholder="What are you doing for today's Project ?"
        />
        <select
          name="projects-list"
          id="projects-list"
          className="p-2"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="Project 1">Project 1</option>
          <option value="Project 2">Project 2</option>
          <option value="Project 3">Project 3</option>
        </select>
        <div className="inline-block bg-white p-1 px-2">
          <Stopwatch
            startTime={startDateTime_ref.current}
            time={time}
            isRunning={isRunning}
            handleTimer={handleTimer}
          />
        </div>
        <button
          className="bg-white hover:bg-neutral-300 p-1 px-2 h-full"
          onClick={handleTimerButton}
        >
          {isRunning ? <p>Stop</p> : <p>Start</p>}
        </button>
        <div className="inline-block">
          <div className="flex flex-col justify-center">
            <MdOutlineTimer size={20} />
            <MdEditNote size={20} />
          </div>
        </div>
      </div>
    </Box>
  );
}
