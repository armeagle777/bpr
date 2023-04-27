import { useState } from 'react';

import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import SearchRow from './SearchRow';
import SearchAside from './SearchAside';

const minDistance = 10;

const SearchBody = ({ persons = [] }) => {
    return (
        <Stack
            direction='row'
            spacing={1}
            sx={{ justifyContent: 'center', pt: 2 }}
        >
            <SearchAside />
            <Divider orientation='vertical' variant='middle' flexItem />
            <Stack
                spacing={1}
                sx={{ width: '80%', px: 2, pb: 4, alignItems: 'center' }}
            >
                {persons.map((person) => (
                    <Stack
                        width='100%'
                        key={person.id}
                        spacing={1}
                        direction='column'
                    >
                        <SearchRow personInfo={person} />
                        <Divider />
                    </Stack>
                ))}

                <Pagination count={10} shape='rounded' color='primary' />
            </Stack>
        </Stack>
    );
};

export default SearchBody;
