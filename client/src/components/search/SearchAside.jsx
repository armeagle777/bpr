import { useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import Checkbox from '../checkbox/Checkbox';

const minDistance = 10;

const SearchAside = () => {
    const [value, setValue] = useState([20, 37]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    const valuetext = (value) => {
        return `${value}°C`;
    };

    return (
        <Stack sx={{ width: '15%' }}>
            <Box sx={{ width: '100%', mb: 2 }}>
                <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                    Տարիքը
                </Typography>
                <Slider
                    getAriaLabel={() => 'Age range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                    getAriaValueText={valuetext}
                />
            </Box>
            <Box sx={{ width: '100%', mb: 2 }}>
                <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Սեռը</Typography>
                <FormGroup>
                    <Checkbox label='Արական' />
                    <Checkbox label='Իգական' />
                </FormGroup>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Մարզ</Typography>
                <FormGroup>
                    <Checkbox label='Երևան' />
                    <Checkbox label='Արագածոտն' />
                    <Checkbox label='Արարատ' />
                    <Checkbox label='Արմավիր' />
                    <Checkbox label='Գեղարքունիք' />
                    <Checkbox label='Կոտայք' />
                    <Checkbox label='Լոռի' />
                    <Checkbox label='Շիրակ' />
                    <Checkbox label='Սյունիք' />
                    <Checkbox label='Տավուշ' />
                    <Checkbox label='Վայոց ձոր' />
                    <Checkbox label='Անհայտ' />
                </FormGroup>
            </Box>
        </Stack>
    );
};

export default SearchAside;
