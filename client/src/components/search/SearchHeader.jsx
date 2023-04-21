import SearchIcon from '@mui/icons-material/PersonSearch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const SearchHeader = () => {
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
                <TextField id='first_name' label='Անուն' type='search' />
                <TextField id='last_name' label='Ազգանուն' type='search' />
                <TextField id='middle_name' label='Հայրանուն' type='search' />
                <TextField
                    id='birthDate'
                    label='Ծննդ․ թիվ'
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField id='passport' label='Անձնագիր' type='search' />
                <TextField id='psn' label='ՀԾՀ' type='search' />
                <Button
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

export default SearchHeader;
