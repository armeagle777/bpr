import { useLocation, useParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

import PersonInfoPage from '../components/person/PersonInfoPage';
import PersonPageSkeleton from '../components/personPageSkeleton/PersonPageSkeleton';
import useFetchPerson from '../hooks/useFetchPerson';
import PersonNotFound from '../components/person/PersonNotFound';

const PersonPage = () => {
    const { state } = useLocation();
    const personInfo = state?.personInfo || null;

    const { ssn } = useParams();
    const { data, isLoading, isError, error } = useFetchPerson(personInfo, ssn);

    if (isLoading) {
        return <PersonPageSkeleton />;
    }

    if (isError) {
        return error.request.status === 404 ? (
            <PersonNotFound />
        ) : (
            <MuiAlert severity='error'>{error.message}</MuiAlert>
        );
    }

    return <PersonInfoPage personInfo={data} />;
};

export default PersonPage;
