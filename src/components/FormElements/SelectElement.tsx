import { Add } from "@mui/icons-material";
import { Box, Button, Select, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
}

const SelectElement = ({ register }: Props) => {
  const [optionsCount, setOptionsCount] = useState<string[]>([]);
  const firstUid = useRef(nanoid(12));
  const addOption = () => {
    const id = nanoid(12);
    setOptionsCount((prev) => [...prev, id]);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize="22px">Options</Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={addOption}
          sx={{
            minWidth: "unset",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
        >
          <Add />
        </Button>
      </Box>
      <Box
        sx={{ marginTop: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Option Name"
            required
            sx={{ width: "50%" }}
            {...register(`config.options.${firstUid.current}.label`)}
            variant="outlined"
          />
          <TextField
            label="Option Value"
            required
            sx={{ width: "50%" }}
            {...register(`config.options.${firstUid.current}.value`)}
            variant="outlined"
          />
        </Box>
        {optionsCount.map((uid) => (
          <Box sx={{ display: "flex", gap: 2 }} key={uid}>
            <TextField
              label="Option Name"
              sx={{ width: "50%" }}
              {...register(`config.options.${uid}.label`)}
              variant="outlined"
            />
            <TextField
              label="Option Value"
              sx={{ width: "50%" }}
              {...register(`config.options.${uid}.value`)}
              variant="outlined"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SelectElement;
