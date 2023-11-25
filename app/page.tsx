import Box from "./components/Box";
import { MdOutlineTimer } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import Daytrack from "./components/Daytrack";
import Newtrack from "./components/Newtrack";
import Trackapp from "./components/Trackapp";

export default function Home() {
  return (
    <main className="h-full bg-neutral-300 py-[40px] px-7">
      <div className="h-full">
        <Trackapp />
      </div>
    </main>
  );
}
