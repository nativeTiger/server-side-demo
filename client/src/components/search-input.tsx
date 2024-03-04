import { FC, FormEvent } from "react";
import { debounce } from "@/lib/utils";
import { Form, useSearchParams, useSubmit } from "react-router-dom";

export const DebouncedInput: FC = () => {
  const submit = useSubmit();

  const [searchParams] = useSearchParams();

  const debounceSubmit = debounce((form: HTMLFormElement) => submit(form), 300);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) =>
    debounceSubmit(event.currentTarget);

  return (
    <Form method="get" onChange={handleSubmit}>
      <input
        type="search"
        name="search"
        placeholder="Search"
        className="outline-none mt-1 text-gray-500 border-2 rounded-md px-4 py-1.5 duration-200 focus:border-primary-50"
        defaultValue={searchParams.get("search") || ""}
      />
    </Form>
  );
};
