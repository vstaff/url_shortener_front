import type { Record } from "@/utils/types";
import axios from "axios";
export function loadRecords(setRecs: React.Dispatch<React.SetStateAction<Record[]>>) {
  axios
    .get(
      "http://localhost:8080/records",
      // "api/records",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("from App.tsx useEffect", res.data);
      setRecs(res.data);
    })
    .catch((err) => console.error("Error fetching records: ", err));
}