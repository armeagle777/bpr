import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home.page';
import NotFound from './pages/NotFound.page';
import PersonPage from './pages/Person.page';
import Search from './pages/Search.page';
import WorkPermit from './pages/WorkPermit.page';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='search' element={<Search />} />
                <Route path='search/:ssn' element={<PersonPage />} />
                <Route path='workpermit' element={<WorkPermit />} />
                <Route path='/*' element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
