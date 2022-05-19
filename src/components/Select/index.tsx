import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useState } from "react";
import { FormValue } from "../../Context/FormContext";

interface Props {
  element: FormValue["fields"][0];
}

const Select = ({ element }: Props) => {
  const [selectState, setSelectState] = useState<string>("");

  return (
    <FormControl fullWidth>
      <InputLabel>{element.label}</InputLabel>
      <MUISelect
        label={element.label}
        name={element.name}
        value={selectState}
        onChange={(event) => setSelectState(event.target.value)}
        required={element.required}
      >
        {element.config?.options.map((option) => (
          <MenuItem value={option.value} key={nanoid(12)}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
