"use client";

import { MdEditNote, MdOutlineTimer } from "react-icons/md";
import Box from "./Box";
import Stopwatch from "./Stopwatch";
import { useState } from "react";

export default function Newtrack({ handleNewTrack }) {
  const [projectDescription, setProjectDescription] = useState("");
  const [project, setProject] = useState("Project Example 1");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleTimerButton = () => {
    setIsRunning(!isRunning);
    if (projectDescription && isRunning) {
      setProjectDescription("");
      setTime(0);
      handleNewTrack({
        description: projectDescription,
        project: project,
        duration: time,
      });
    }
  };

  const handleTimer = (newTime) => {
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
          <option value="Project Example 1">Project 1</option>
          <option value="Project Example 2">Project 2</option>
          <option value="Project Example 3">Project 3</option>
        </select>
        <div className="inline-block bg-white p-1 px-2">
          <Stopwatch
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
