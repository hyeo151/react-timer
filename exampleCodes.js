//Get start and end of the week and print them out
//https://copyprogramming.com/howto/how-to-convert-a-utc-time-to-local-time-javascript
import { lastDayOfWeek, startOfWeek } from "date-fns";

const result_1 = startOfWeek(new Date("2024-02-24"), { weekStartsOn: 1 });
const result_2 = lastDayOfWeek(new Date("2024-02-24"), { weekStartsOn: 1 });
console.log(
  "start",
  result_1.toLocaleString("en-NZ", { timeZone: "Pacific/AUckland" })
);
console.log(
  "end",
  result_2.toLocaleString("en-NZ", { timeZone: "Pacific/AUckland" })
);
