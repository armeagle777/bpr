import { Box, Modal as MuiModal } from "@mui/material";

const Modal = ({ children, isOpen, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: "50%" }}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
