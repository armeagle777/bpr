import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home.page';
import NotFound from './pages/NotFound.page';
import PersonPage from './pages/Person.page';
import Search from './pages/Search.page';
import WorkPermit from './pages/WorkPermit.page';
import Register from './pages/Register.page';
import Pdf from './pages/Pdf.page';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='pdf' element={<Pdf />} />
                <Route index element={<Home />} />
                <Route path='bpr' element={<Search />} />
                <Route path='bpr/:ssn' element={<PersonPage />} />
                <Route path='workpermit' element={<WorkPermit />} />
                <Route path='register' element={<Register />} />
                <Route path='register/:taxId' element={<Register />} />
                <Route path='/*' element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
