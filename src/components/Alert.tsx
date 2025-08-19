import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import RecordsContext from "@/context/RecordsContext"
import { useContext } from "react"

interface AlertProps {
  message: string,
  ref: React.RefObject<HTMLButtonElement | null>
}

export default function Alert({ message, ref }: AlertProps) {
  const context = useContext(RecordsContext)

  if (!context) {
    throw new Error("no records context")
  }

  const { setAlertMessage } = context
  return (
    <AlertDialog onOpenChange={open => !open && setAlertMessage("")}>
      <AlertDialogTrigger asChild className="invisible" ref={ref}>
        <Button variant="outline">Показать</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ошибка</AlertDialogTitle>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
