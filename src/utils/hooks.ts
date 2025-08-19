// import axios from "axios";
// import { useEffect, useState } from "react";
// import type { Record } from "./types";

// export default function useRecords() {
//   let r: Record[] = []

//   axios.get("http://localhost:8080/records", {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(res => {
//       const rawRecs: { OriginUrl: string, ShortenedUrl: string, }[] = res.data
//       r = rawRecs
//     })
//     .catch(err => console.error("Error fetching records: ", err))

//   const [recs, setRecs] = useState(r)
//   return [recs, setRecs] as const
// }