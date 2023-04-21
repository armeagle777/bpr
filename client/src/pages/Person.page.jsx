import { useLocation, useParams } from 'react-router-dom';

import PersonInfoPage from '../components/person/PersonInfoPage';
import PersonPageSkeleton from '../components/personPageSkeleton/PersonPageSkeleton';
import useFetchPerson from '../hooks/useFetchPerson';

const PersonPage = () => {
    const {
        state: { personInfo },
    } = useLocation();

    const { ssn } = useParams();
    const { data, loading, isError, error } = useFetchPerson(personInfo, ssn);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(() => false);
    //     }, 2000);
    // });

    return !personInfo ? (
        <PersonPageSkeleton />
    ) : (
        <PersonInfoPage personInfo={data} />
    );
};

export default PersonPage;
