import type { Record } from "@/utils/types";
import { createContext } from "react";

interface RecordsContextType {
  recs: Record[],
  setRecs: React.Dispatch<React.SetStateAction<Record[]>>
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

const RecordsContext =  createContext<RecordsContextType | null>(null)

export default RecordsContext

