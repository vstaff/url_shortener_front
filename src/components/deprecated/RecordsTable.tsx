import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RecordsContext from "@/context/RecordsContext"
import { useContext } from "react"

export function RecordsTable() {
  const context = useContext(RecordsContext)

  if (!context) {
    throw new Error("no records context")
  }

  const { recs } = context 

  return (
    <Table>
      <TableCaption>Ваши URL.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Origin URL</TableHead>
          <TableHead className="font-semibold text-right">Shortened URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recs.map((record, index) => (
          <TableRow id={`records-table-row-${index}`} key={`records-table-row-${index}`}>
            <TableCell className="font-normal">{record.OriginUrl}</TableCell>
            <TableCell className="font-normal text-right"><a href="">{record.ShortenedUrl}</a></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
