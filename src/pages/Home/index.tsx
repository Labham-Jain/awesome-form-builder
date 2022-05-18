import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useContext } from "react";
import { FormCtx } from "../../Context/FormContext";

const Home = () => {
  const theme = useTheme();
  const { form, setForm } = useContext(FormCtx);

  const removeElement = (id: string) => {
    const filteredForm = form.fields.filter((element) => element.id !== id);
    setForm((prevForm) => ({ title: prevForm.title, fields: filteredForm }));
  };

  const saveFrom = () => {
    const fields = form.fields.map(
      ({ id, name, label, required, type, config }) => ({
        name,
        id,
        label,
        required: required === undefined ? true : required,
        type: type.toUpperCase(),
        config,
      })
    );
    const data = { title: form.title, fields };
    // console.log(data);
  };

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, title: value }));
  };

  if (!form.fields.length) return null;
  return (
    <Box
      sx={{
        marginTop: theme.spacing(8),
        marginLeft: "240px",
        padding: "20px",
        height: "100%",
      }}
    >
      <Typography component={"h3"} fontSize="32px">
        Preview Form
      </Typography>
      <Box sx={{ marginTop: theme.spacing(5), marginLeft: theme.spacing(5) }}>
        <Card
          sx={{
            width: 400,
            padding: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            value={form.title}
            onChange={onTitleChange}
            style={{
              fontSize: 32,
              textAlign: "center",
              outline: "none",
              border: "none",
              marginBottom: 20,
            }}
          />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {form.fields.map((element) => (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {element.elementType === "checkbox" ? (
                  <FormControlLabel
                    control={<Checkbox />}
                    name={element.name}
                    label={element.label}
                  />
                ) : null}
                {element.elementType === "text" ? (
                  <TextField
                    label={element.label}
                    name={element.name}
                    type={element.type}
                  />
                ) : null}
                {element.elementType === "select" ? (
                  <Select label={element.label} name={element.name} />
                ) : null}
                {element.elementType === "toggle" ? (
                  <TextField
                    label={element.label}
                    name={element.name}
                    type={element.type}
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
            ))}
            <Button color="primary" variant="contained" sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </Box>
        </Card>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" onClick={saveFrom}>
          Save Form
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
