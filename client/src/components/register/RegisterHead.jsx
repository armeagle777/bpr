import SearchIcon from '@mui/icons-material/PersonSearch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useCompanies } from '../context/companies';

const RegisterHead = () => {
    const { taxIdInputValue, setTaxIdInputValue, handleSubmitSearch } =
        useCompanies();

    return (
        <Stack
            spacing={2}
            sx={{
                width: '100%',
                alignItems: 'center',
                pt: '20px',
            }}
        >
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '18ch' },
                }}
                noValidate
                autoComplete='off'
            >
                <TextField
                    id='tax_id'
                    label='ՀՎՀՀ'
                    type='search'
                    value={taxIdInputValue}
                    onChange={(e) => setTaxIdInputValue(e.target.value)}
                    autoFocus
                />
                <Button
                    onClick={handleSubmitSearch}
                    variant='contained'
                    size='large'
                    color='primary'
                    sx={{ py: 2 }}
                >
                    <SearchIcon />
                </Button>
            </Box>
        </Stack>
    );
};

export default RegisterHead;
