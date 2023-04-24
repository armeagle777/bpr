import { Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import QkagDocument from '../qkagDocument/QkagDocument';

import useFetchQkag from '../../hooks/useFetchQkag';
import DocumentNotFound from './DocumentNotFound';
import ListScileton from '../listSceleton/ListScileton';

const Family = ({ ssn }) => {
    const { data: documents, isLoading, isError, error } = useFetchQkag(ssn);

    if (isLoading) {
        return <ListScileton />;
    }

    if (isError) {
        return error.request.status === 404 ? (
            <DocumentNotFound />
        ) : (
            <MuiAlert severity='error'>{error.message}</MuiAlert>
        );
    }

    return (
        <Box>
            {documents.map((doc) => (
                <QkagDocument key={doc.tracking_id} document={doc} />
            ))}
        </Box>
    );
};

export default Family;
