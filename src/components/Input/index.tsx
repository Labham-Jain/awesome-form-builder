import { HelpOutline } from "@mui/icons-material";
import { TextField, Tooltip, Typography } from "@mui/material";
import { Control, Controller, ControllerProps } from "react-hook-form";

interface Props {
  control: Control;
  tooltipText: string;
  label: string;
  type: string;
  required?: boolean;
  rules?: ControllerProps['rules']
}

const Input = ({ control, tooltipText, label, type, required, rules }: Props) => {
  return (
    <Controller
      name={label.toLowerCase()}
      control={control}
      rules={rules}
      render={({ field: { value = "", ...args }, fieldState: {error} }) => (
        <TextField
          variant="outlined"
          label={label}
          type={type}
          required={required}
          helperText={error?.message}
          error={Boolean(error?.message)}
          InputProps={{
            endAdornment: (
              <Tooltip title={tooltipText} placement="top">
                <HelpOutline />
              </Tooltip>
            ),
            ...args,
            value,
            role: "presentation",
          }}
        />
      )}
    />
  );
};

export default Input;
