"use client";

import { MdEditNote, MdOutlineTimer } from "react-icons/md";
import Box from "./Box";

import Stopwatch from "./Stopwatch";
import { useState } from "react";

export default function Newtrack() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleStartAndStop = () => {
    setIsRunning(!isRunning);
  };
  return (
    <Box>
      <div className="flex gap-2 items-center">
        <input
          className="p-2 flex-grow"
          type="text"
          placeholder="What are you doing for today's Project ?"
        />
        <select name="projects-list" id="projects-list" className="p-2">
          <option value="Project Example 1">Project 1</option>
          <option value="Project Example 1">Project 2</option>
          <option value="Project Example 1">Project 3</option>
        </select>
        <div className="inline-block bg-white p-1 px-2">
          <Stopwatch time={time} isRunning={isRunning} setTime={setTime} />
        </div>
        <button
          className="bg-white hover:bg-neutral-300 p-1 px-2 h-full"
          onClick={handleStartAndStop}
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
