import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import Select from "../../components/Select";
import { FormValue } from "../../Context/FormContext";

interface Props {
  element: FormValue["fields"][0];
  removeElement: (id: string) => void;
}

const GetField = ({ element, removeElement }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
      key={element.id}
    >
      {element.elementType === "checkbox" ? (
        <FormControlLabel
          control={<Checkbox defaultChecked={Boolean(element.value)} />}
          name={element.name}
          label={element.label}
        />
      ) : null}
      {element.elementType === "text" ? (
        <TextField
          multiline={element.type.toLowerCase() === "textarea"}
          minRows={4}
          defaultValue={element.value}
          label={element.label}
          name={element.name}
          type={element.type.toLowerCase()}
        />
      ) : null}
      {element.elementType === "select" ? <Select element={element} /> : null}
      {element.elementType === "toggle" ? (
        <FormControlLabel
          control={<Switch defaultChecked={Boolean(element.value)} />}
          name={element.name}
          label={element.label}
        />
      ) : null}
      <Button
        color="error"
        sx={{ width: "40px", height: "40px", minWidth: "unset" }}
        onClick={() => removeElement(element.id)}
      >
        <Delete />
      </Button>
    </Box>
  );
};

export default GetField;
