import { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import ShortenUrlForm from "./components/ShortenUrlForm";
import RecordsContext from "./context/RecordsContext";
import type { Record } from "./utils/types";
import { loadRecords } from "./backend/load";
import RecordsTable from "./components/RecordsTable";
import Alert from "./components/Alert";

function App() {
  const [url, setUrl] = useState("");
  const [recs, setRecs] = useState<Record[]>([]);

  const [alertMessage, setAlertMessage] = useState("");
  const alertRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (alertMessage) alertRef.current?.click();
  }, [alertMessage]);

  useEffect(() => {
    loadRecords()
      .then(setRecs)
      .catch((err) => setAlertMessage(err.response?.data || "Ошибка загрузки записей с базы данных"));
  }, []);
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
