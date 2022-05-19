import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import Select from "../../components/Select";
import { FormValue } from "../../Context/FormContext";

const Form = () => {
  const [form, setForm] = useState<FormValue>({
    title: "",
    fields: [
      {
        elementType: "text",
        id: "",
        label: "",
        name: "",
        required: false,
        type: "",
      },
    ],
  });
  const param = useParams();
  useEffect(() => {
    (async () => {
      const response = await (await API.get(`form/${param.id}`)).json();
      setForm(response.data);
    })();
  }, [param.id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: 400,
          padding: 4,
          height: "max-content",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Typography
          style={{
            fontSize: 32,
            textAlign: "center",
            outline: "none",
            border: "none",
            marginBottom: 20,
          }}
        >
          {form.title}
        </Typography>
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
              key={"form_" + element.id}
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
                  sx={{ width: "max-content" }}
                />
              ) : null}
              {element.elementType === "text" ? (
                <TextField
                  multiline={element.type.toLowerCase() === "textarea"}
                  minRows={4}
                  label={element.label}
                  name={element.name}
                  type={element.type.toLowerCase()}
                  sx={{ width: "100%" }}
                />
              ) : null}
              {element.elementType === "select" ? (
                <Select element={element} />
              ) : null}
              {element.elementType === "toggle" ? (
                <FormControlLabel
                  control={<Switch defaultChecked={element.value === true} />}
                  name={element.name}
                  label={element.label}
                />
              ) : null}
            </Box>
          ))}
          <Button color="primary" variant="contained" sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Form;
