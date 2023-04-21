import { Box } from '@mui/material';
import AddressTable from '../addressTable/AddressTable';
import PassportTable from '../passportTable/PassportTable';

const Documents = () => {
    return (
        <Box>
            <PassportTable />
            <AddressTable />
        </Box>
    );
};
export default Documents;
