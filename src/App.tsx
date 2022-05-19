import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import "./app.css";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import ElementModelContext from "./Context/ElementModelContext";
import FormContext from "./Context/FormContext";
import Forms from "./pages/Forms";
import { SnackbarProvider } from "notistack";
import Form from "./pages/Form";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* @ts-ignore */}
      <SnackbarProvider>
        <Router>
          <FormContext>
            <ElementModelContext>
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/forms/:id" element={<Form />} />
              </Routes>
            </ElementModelContext>
          </FormContext>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
