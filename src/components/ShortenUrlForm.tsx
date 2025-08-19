"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { handleOnChange } from "@/utils/handlers";
import axios from "axios";
import { loadRecords } from "@/backend/load";
import { useContext } from "react";
import RecordsContext from "@/context/RecordsContext";

const FormSchema = z.object({
  url: z.string().min(2, {
    message: "URL должен быть длиной хотя-бы 2 символа.",
  }),
});

interface ShortenUrlFormProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function ShortenUrlForm({ url, setUrl }: ShortenUrlFormProps) {
  const context = useContext(RecordsContext)
  if (!context) {
    throw new Error("no records context")
  }
  const { setRecs, setAlertMessage } = context 
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("submitting form", data);

    axios
      .post("http://localhost:8080/records", {
        URL: data.url,
      })
      .then((res) => {
        console.log(res);
        loadRecords(setRecs)
      })
      .catch((err) => {
        setAlertMessage(err.response.data)
      });

    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>URL</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="URL"
                  {...field}
                  value={url}
                  onChange={(event) => {
                    const { value: newUrl } = event.target 
                    setUrl(newUrl)
                    field.onChange(event)
                  }}
                  // style={{ padding: "10px", }}
                />
              </FormControl>
              <FormDescription>
                Введите URL, чтобы получить короткую ссылку.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >
          Готово
        </Button>
      </form>
    </Form>
  );
}
