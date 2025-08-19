import { handleOnChange } from "../../utils/handlers";

interface ShortenUrlFormProps {
  url: string,
  setUrl: React.Dispatch<React.SetStateAction<string>>
}

export default function ShortenUrlForm({ url, setUrl,}: ShortenUrlFormProps) {
  return (
    <form
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          // const response = axios.post(
          //   "http://localhost:8080/records",
          //   {
          //     url: url,
          //   },
          //   {
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );
          // console.log("response: ", (await response).data);
        }}
      >
        <input
          name="url"
          id="url"
          type="text"
          value={url}
          onChange={(event) => handleOnChange(event, setUrl)}
        />
        <button type="submit">Go</button>
      </form>
  )
}