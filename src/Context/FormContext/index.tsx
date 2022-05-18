import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const FormCtx = createContext<{
  form: FormValue;
  setForm: Dispatch<SetStateAction<FormValue>>;
}>({
  form: { fields: [], title: "" },
  setForm: () => {},
});

interface Props {
  children: ReactNode;
}

export interface FormValue {
  title: string;
  fields: {
    name: string;
    label: string;
    id: string;
    required: boolean;
    elementType: "text" | "checkbox" | "select" | "toggle";
    type: string;
    config?: {
      value: string;
      label: string;
    }[];
  }[];
}

const FormContext = ({ children }: Props) => {
  const [form, setForm] = useState<FormValue>({
    title: "Form Name",
    fields: [
      {
        id: "",
        elementType: "text",
        label: "Name",
        name: "name",
        required: true,
        type: "text",
      },
    ],
  });

  return (
    <FormCtx.Provider value={{ setForm, form }}>{children}</FormCtx.Provider>
  );
};

export default FormContext;
