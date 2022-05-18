import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ElementModelCtx, ElementTypes } from "..";
import Elements from "./Elements";

interface Props {
  type: ElementTypes;
  modelTitle: string;
}
const ElementModel = ({ type, modelTitle }: Props) => {
  const { setElementType } = useContext(ElementModelCtx);
  return (
    <Modal
      open
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card sx={{ outline: "none", minWidth: 350 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize="24px">{modelTitle}</Typography>
            <IconButton onClick={() => setElementType(undefined)}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ margin: "10px 0px" }} />
          <Elements type={type} />
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ElementModel;
