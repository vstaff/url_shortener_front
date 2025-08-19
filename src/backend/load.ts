import type { Record } from "@/utils/types";
import axios from "axios";

export async function loadRecords(): Promise<Record[]> {
  const res = await axios.get("http://localhost:8080/records", {headers: {"Content-Type": "application/json"}})
  return Array.isArray(res.data) ? res.data : []
}