import { createTheme } from "@mui/material/styles";
import { blue, common, green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: common.white,
    },
    secondary: {
      main: common.white,
      contrastText: blue[500],
    },
  },
});

export default theme;
