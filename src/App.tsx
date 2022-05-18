import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import "./app.css";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import ElementModelContext from "./Context/ElementModelContext";
import FormContext from "./Context/FormContext";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <FormContext>
          <ElementModelContext>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </ElementModelContext>
        </FormContext>
      </Router>
    </ThemeProvider>
  );
};

export default App;
