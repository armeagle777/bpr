import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';

const Checkbox = ({ label }) => {
    return (
        <FormControlLabel
            control={<MuiCheckbox />}
            label={label}
            sx={{ height: '30px' }}
        />
    );
};

export default Checkbox;
