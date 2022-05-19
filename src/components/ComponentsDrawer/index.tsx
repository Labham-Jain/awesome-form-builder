import {
  Mail,
  Keyboard,
  Language,
  Numbers,
  Check,
  Texture,
  ExpandMore,
  Key,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  ElementModelCtx,
  ElementTypes,
} from "../../Context/ElementModelContext";
import { ToggleOn } from "@mui/icons-material";

const drawerWidth = 240;

const ComponentsDrawer = () => {
  const { setElementType, setModelTitle } = useContext(ElementModelCtx);
  const location = useLocation();

  const setElementModal = (
    type: ElementTypes,
    modalTitle: string = "Add new element"
  ) => {
    setModelTitle(modalTitle);
    setElementType(type);
  };
  if (location.pathname !== "/") return null;
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List
          subheader={
            <ListSubheader
              component={"h4"}
              style={{ fontSize: 20, margin: "10px", marginLeft: 0 }}
            >
              Input
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => setElementModal("input.text")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Keyboard />
            </ListItemIcon>
            <ListItemText>Text</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => setElementModal("input.password")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Key />
            </ListItemIcon>
            <ListItemText>Password</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => setElementModal("input.number")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Numbers />
            </ListItemIcon>
            <ListItemText>Number</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => setElementModal("input.email")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText>Email</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => setElementModal("input.url")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText>URL</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => setElementModal("input.checkbox")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText>Checkbox</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => setElementModal("input.toggle")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <ToggleOn />
            </ListItemIcon>
            <ListItemText>Toggle</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => setElementModal("input.textarea")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <Texture />
            </ListItemIcon>
            <ListItemText>Textarea</ListItemText>
          </ListItemButton>
        </List>
        <List
          subheader={
            <ListSubheader
              component={"h4"}
              style={{ fontSize: 20, margin: "10px", marginLeft: 0 }}
            >
              Multi Select
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => setElementModal("multi.select")}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>
              <ExpandMore />
            </ListItemIcon>
            <ListItemText>Select</ListItemText>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default ComponentsDrawer;
