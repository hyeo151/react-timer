import Box from "./components/Box";
import { MdOutlineTimer } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import Daytrack from "./components/Daytrack";

export default function Home() {
  return (
    <main className="h-full bg-neutral-300 py-[40px] px-7">
      <div className="h-full">
        <Box>
          <div className="flex gap-2 items-center">
            <input
              className="p-2 flex-grow"
              type="text"
              placeholder="What are you doing for today's Project ?"
            />
            <select name="projects-list" id="projects-list" className="p-2">
              <option value="Project Example 1">Project</option>
            </select>
            <div className="inline-block bg-white p-1 px-2">00:00</div>
            <button className="bg-white hover:bg-neutral-300 p-1 px-2 h-full">
              Start
            </button>
            <div className="inline-block">
              <div className="flex flex-col justify-center">
                <MdOutlineTimer size={20} />
                <MdEditNote size={20} />
              </div>
            </div>
          </div>
        </Box>

        <div className="mt-10">
          <div className="flex justify-between mb-5">
            <p>Last Week</p>
            <p>Week Total: Number</p>
          </div>

          <div className="flex flex-col gap-4">
            <Daytrack />
            <Daytrack />
            <Daytrack />
            <Daytrack />
            <Daytrack />
            <Daytrack />
            <Daytrack />
          </div>
        </div>
      </div>
    </main>
  );
}
