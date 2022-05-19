import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CssBaseline, Fab, Toolbar, Tooltip, useTheme } from "@mui/material";
import ComponentsDrawer from "../ComponentsDrawer";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Assignment } from "@mui/icons-material";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const redirectToForms = useCallback(() => {
    navigate("/forms");
  }, [navigate]);

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
      {location.pathname === "/" ? (
        <>
          {/* fab component which will be used to redirect to forms page */}
          <Tooltip title="See all forms" placement="top">
            <Fab
              onClick={redirectToForms}
              color="primary"
              sx={{
                position: "absolute",
                bottom: theme.spacing(8),
                right: theme.spacing(8),
              }}
            >
              <Assignment />
            </Fab>
          </Tooltip>
        </>
      ) : null}
    </Box>
  );
};

export default Navigation;
