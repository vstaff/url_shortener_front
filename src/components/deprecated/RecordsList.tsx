import type { Record } from "../../utils/types"
// import Record from "./Record";

interface RecordsListProps {
  records: Record[]
}

export default function RecordsList({ records }: RecordsListProps) {
  console.log("from records list: ", records)
  return (
    <div id="records-list-container">
      <ul id="records-list">
        {records.map((r, i) => (
          <li className="records-list-item" key={i} id={`records-list-item-${i}`}>
            Origin    url: <code>{r.OriginUrl}</code>
            Shortened url: <code>{r.ShortenedUrl}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}