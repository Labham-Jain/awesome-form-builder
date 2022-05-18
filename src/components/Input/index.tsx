import { HelpOutline } from "@mui/icons-material";
import { TextField, Tooltip } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control;
  tooltipText: string;
  label: string;
  type: string;
  required?: boolean;
}

const Input = ({ control, tooltipText, label, type, required }: Props) => {
  return (
    <Controller
      name={label.toLowerCase()}
      control={control}
      render={({ field: { value = "", ...args } }) => (
        <TextField
          variant="outlined"
          label={label}
          type={type}
          required={required}
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
