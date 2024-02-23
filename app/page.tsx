import Trackapp from "./components/Trackapp";
// import { lastDayOfWeek, startOfWeek } from "date-fns";
export default function Home() {
  // const result_1 = startOfWeek(new Date("2024-02-24"), { weekStartsOn: 1 });
  // const result_2 = lastDayOfWeek(new Date("2024-02-24"), { weekStartsOn: 1 });
  // console.log(
  //   "start",
  //   result_1.toLocaleString("en-NZ", { timeZone: "Pacific/AUckland" })
  // );
  // console.log(
  //   "end",
  //   result_2.toLocaleString("en-NZ", { timeZone: "Pacific/AUckland" })
  // );
  return (
    <main className="h-full bg-neutral-300 py-[40px] px-7">
      <div className="h-full">
        <Trackapp />
      </div>
    </main>
  );
}
