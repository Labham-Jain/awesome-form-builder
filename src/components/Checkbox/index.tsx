import { Control, Controller } from "react-hook-form";
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";

interface Props {
  control: Control;
  name: string;
  label: string;
}

const Checkbox = ({ control, name, label }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...args } }) => (
        <FormControlLabel control={<MUICheckbox {...args} />} label={label} />
      )}
    />
  );
};

export default Checkbox;
