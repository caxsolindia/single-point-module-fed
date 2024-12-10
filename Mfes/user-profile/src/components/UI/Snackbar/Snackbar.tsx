import { ReactNode } from "react";
import { Snackbar } from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbarStore } from "../../../Store/ToasterStore.ts";

type SnackbarStore = {
  message: string | ReactNode;
  open: boolean;
  clearMessage: () => void;
};

const mainWhite = "#ffffff"; // Define your color
const Toast = styled(Snackbar)`
  .MuiSnackbar-root {
    top: 80px !important;
  }
  .MuiSnackbarContent-root {
    position: absolute;
    top: 65px !important;
    background: #007fff !important;
    width: 400px;
  }
  .MuiSnackbarContent-message {
    padding: 0px;
    color: ${mainWhite};
  }
`;

export default function PositionedSnackbar() {
  const { message, open, clearMessage } = useSnackbarStore() as SnackbarStore;

  const handleClose = () => {
    clearMessage();
  };

  return (
    <div>
      <Toast
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={open}
        onClose={handleClose}
        message={message}
        key="top-right"
      />
    </div>
  );
}
