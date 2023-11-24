import Box from "./Box";

export default function Daytrack() {
  return (
    <div>
      <Box className="bg-slate-400">
        <div className="flex justify-between">
          <p>Day Tracked</p>
          <p>Day Total Time</p>
        </div>
      </Box>
      <Box>
        <div className="flex gap-2 items-center">
          <input type="text" placeholder="description" />
          <input type="text" placeholder="Project" className="flex-1" />
          <div className="inline-block bg-white p-1 px-2">00:00</div>
          <button className="bg-white hover:bg-neutral-300 p-1 px-2 h-full">
            Start
          </button>
        </div>
      </Box>
    </div>
  );
}
