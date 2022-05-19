import { useEffect, useState } from "react";
import { Delete, Share } from "@mui/icons-material";
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
import { useTheme } from "@mui/system";
import { useSnackbar } from "notistack";
import API from "../../api";
import { FormValue } from "../../Context/FormContext";
import copy from "../../utils/copyToClipboard";
import "./style.css";
import Select from "../../components/Select";

const Forms = () => {
  const theme = useTheme();
  const [forms, setForms] = useState<FormValue[]>([]);
  const snackbar = useSnackbar();

  const loadData = async () => {
    const responseForms = await (await API.get("form")).json();
    setForms(responseForms.data);
  };
  useEffect(() => {
    const promise = loadData();
    return () => {
      Promise.resolve(promise);
    };
  }, []);

  const shareForm = (id?: string) => {
    if (!id) return;
    copy(`http://localhost:8080/forms/${id}`)
      .then(() => {
        snackbar.enqueueSnackbar("Copied to clipboard!", {
          variant: "success",
        });
      })
      .catch();
  };
  const deleteForm = async (id?: string) => {
    if (!id) return;
    const response = await (await API.delete(`form/${id}`)).json();
    if (response.status !== 200) {
      snackbar.enqueueSnackbar("Some error occurred!", {
        variant: "error",
      });
    } else {
      loadData();
    }
  };

  return (
    <Box sx={{ marginTop: theme.spacing(8), padding: "20px" }}>
      <Typography sx={{ fontSize: 42, marginLeft: "50px", marginTop: "30px" }}>
        Forms
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          marginTop: 2,
          marginLeft: 6,
        }}
      >
        {forms.map((form) => (
          <Box
            sx={{ position: "relative" }}
            className="card-box"
            key={form._id}
          >
            <Button
              className="card-delete-btn card-btn"
              onClick={() => deleteForm(form._id)}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                minWidth: "unset",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                transform: "translate(50%, -50%)",
                zIndex: 1,
              }}
              color="error"
              variant="contained"
            >
              <Delete />
            </Button>
            <Button
              className="card-share-btn card-btn"
              color="info"
              variant="contained"
              onClick={() => shareForm(form._id)}
            >
              <Share />
            </Button>
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
                    key={"forms_" + element.id}
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
                        control={
                          <Checkbox defaultChecked={Boolean(element.value)} />
                        }
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
                        defaultValue={element.value}
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
                        control={
                          <Switch defaultChecked={Boolean(element.value)} />
                        }
                        name={element.name}
                        label={element.label}
                      />
                    ) : null}
                  </Box>
                ))}
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Forms;
