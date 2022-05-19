import { Assignment, Delete } from "@mui/icons-material";
import { Box, Button, Card, Typography, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import { ChangeEvent, useContext } from "react";
import API from "../../api";
import { FormCtx } from "../../Context/FormContext";
import GetField from "./GetField";
const Home = () => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const { form, setForm } = useContext(FormCtx);
  const removeElement = (id: string) => {
    const filteredForm = form.fields.filter((element) => element.id !== id);
    setForm((prevForm) => ({ title: prevForm.title, fields: filteredForm }));
  };

  const saveFrom = () => {
    const fields = form.fields.map(
      ({ id, name, label, required, type, config, elementType }) => ({
        name,
        id,
        label,
        required: required === undefined ? true : required,
        type: type.toUpperCase(),
        config,
        elementType,
      })
    );
    const data = { title: form.title, fields };
    API.post("form", { json: data }).then((result) => {
      snackbar.enqueueSnackbar("Successfully saved form!", {
        variant: "success",
      });
    });
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
              <GetField
                element={element}
                removeElement={removeElement}
                key={nanoid(12)}
              />
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
