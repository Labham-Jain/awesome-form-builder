import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tooltip,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import Input from "../Input";
import { FormCtx, FormValue } from "../../Context/FormContext";
import { useContext } from "react";
import SelectElement from "./SelectElement";

interface Props {
  element: "text" | "select" | "checkbox" | "toggle";
  valueType: string;
}
type ValuePair = {
  label: string;
  value: string;
};

const FormElements = ({ element, valueType }: Props) => {
  const { handleSubmit, control, register } = useForm({mode: 'onChange'});
  const { setForm } = useContext(FormCtx);
  const onSubmit = (data: any) => {
    const options: { [x: string]: ValuePair }[] = data.config?.options;
    
    const newConfig: FormValue["fields"][0]["config"] = {
      options: [],
    };

    if(options){
      const keys = Object.keys(options);
  
      keys.forEach((key) => {
        // @ts-ignore
        const option: ValuePair = options[key];
        // validate empty values
        if (option.label === "" || option.value === "") return;
        // put in object
        newConfig.options.push(option);
      });
    }
    const value = {
      ...data,
      config: newConfig,
      id: nanoid(12),
      type: valueType,
      elementType: element,
    };
    setForm((prev) => {
      const newFields = [...prev.fields, value];
      return { title: prev.title, fields: newFields };
    });
  };
  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Input
            control={control}
            tooltipText="This will be shown to the user in text box"
            label="Label"
            type="text"
            required
          />
          <Input
            control={control}
            tooltipText="This will be the parameter sent to server"
            label="Name"
            type="text"
            required
            rules={{
              pattern: {
                value: /^[\d]*[a-z_][a-z\d_]*$/g,
                message: "Only a-z, 0-9, _ are allowed!"
              }
            }}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          {element === "text" ? (
            <Input
              control={control}
              tooltipText="This will be the value of the element"
              label="Value"
              type={valueType}
            />
          ) : null}
        </Box>
        {element === "select" ? <SelectElement register={register} /> : null}
        <Controller
          name={element === "checkbox" ? "checked" : "required"}
          control={control}
          render={({ field: { onChange, value = true } }) => (
            <FormControlLabel
              sx={{ width: "max-content" }}
              control={
                <Tooltip title="Set if this element is required">
                  <Checkbox
                    color="primary"
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                    value={""}
                  />
                </Tooltip>
              }
              label={element === "checkbox" ? "Default checked" : "Required"}
            />
          )}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" type="submit" color="primary">
            Add Element
          </Button>
        </Box>
      </FormGroup>
    </form>
  );
};

export default FormElements;
