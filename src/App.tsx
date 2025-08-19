import { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import ShortenUrlForm from "./components/ShortenUrlForm";
// import { RecordsTable } from "./components/deprecated/RecordsTable";
// import { loadRecords } from "./backend/load";
import RecordsContext from "./context/RecordsContext";
import type { Record } from "./utils/types";
import { loadRecords } from "./backend/load";
import RecordsTable from "./components/RecordsTable";
import Alert from "./components/Alert";

function App() {
  const [url, setUrl] = useState("");
  const [recs, setRecs] = useState<Record[]>([]);
  useEffect(() => {
    loadRecords(setRecs);
  }, []);
  const [alertMessage, setAlertMessage] = useState("")
  const alertRef = useRef<HTMLButtonElement>(null)


  // alert показывается только если возникает какая-то ошибка
  // когда ошибок нет alertMessage - пустая строка, в противном случае 
  // каждая ошибка на беке сопровождается сообщением, которое хранится в alertMessage
  useEffect(() => {
    if (!alertMessage) return 

    alertRef.current?.click()
  }, [alertMessage])
  return (
    <div id="app">
      <main className="flex flex-col justify-center items-center gap-y-10 w-[40%] h-[100dvh]">
        <RecordsContext.Provider value={{ recs, setRecs, setAlertMessage }}>
          <ShortenUrlForm setUrl={setUrl} url={url} />
          <RecordsTable />
          <Alert message={alertMessage} ref={alertRef} />
        </RecordsContext.Provider>

      </main>
    </div>
  );
}

export default App;
