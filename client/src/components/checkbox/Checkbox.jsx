import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";

const Checkbox = ({ label, onChange, checked }) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox onChange={onChange} checked={checked} />}
      label={label}
      sx={{ height: "30px" }}
    />
  );
};

export default Checkbox;
