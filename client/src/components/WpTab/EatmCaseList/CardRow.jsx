import { Typography } from "@mui/material";

const CardRow = ({ label, text }) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <small>{label}</small> : <strong>{text}</strong>
    </Typography>
  );
};

export default CardRow;
