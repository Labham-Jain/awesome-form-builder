import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CssBaseline, Toolbar } from "@mui/material";
import ComponentsDrawer from "../ComponentsDrawer";

const Navigation = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Awesome Form Builder
          </Typography>
        </Toolbar>
      </AppBar>
      <ComponentsDrawer />
    </Box>
  );
};

export default Navigation;
