import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import useThemeConstants from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { CancelIcon } from "../../../assets/Icon/Icon.tsx";
import {
  DEFAULT_CONFIRMATION_MESSAGE,
  DEFAULT_DELETE_MESSAGE,
} from "./messages.ts";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string; // Optional custom message to display in the modal
  confirmMessage?: string;
}

function DeleteConfirmationModal(props: DeleteConfirmationModalProps) {
  const { open, onClose, onConfirm, message, confirmMessage } = props;
  const { theme } = useThemeContext();
  const { ERROR_MAIN } = useThemeConstants({ theme });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-13px",
          }}
        >
          <IconButton onClick={onClose}>
            <Box
              sx={{
                background: ERROR_MAIN,
                height: "35px",
                width: "35px",
                borderRadius: "50%",
              }}
            >
              <Box sx={{ marginTop: "5px" }}>
                <CancelIcon />
              </Box>
            </Box>
          </IconButton>
        </Box>
        <Box>
          <Typography
            id="delete-modal-description"
            sx={{
              mt: 1,
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "1.25rem",
            }}
          >
            {message || DEFAULT_DELETE_MESSAGE}
          </Typography>
          <Typography
            sx={{
              lineHeight: "1.25rem",
              textAlign: "center",
            }}
            variant="caption"
            display="block"
          >
            {confirmMessage || DEFAULT_CONFIRMATION_MESSAGE}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            sx={{ width: "88.7px" }}
            onClick={onConfirm}
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmationModal;
