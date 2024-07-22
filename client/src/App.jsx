import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home.page";
import NotFound from "./pages/NotFound.page";
import PersonPage from "./pages/Person.page";
import Search from "./pages/Search.page";
import WorkPermit from "./pages/WorkPermit.page";
import Register from "./pages/Register.page";
import Pdf from "./pages/Pdf.page";
import FileUpload from "./pages/FileUpload.page";
import Statistics from "./pages/Statistics";
import { WorkPermitStats } from "./pages/WorkPermitStats";
import { WpOfficial } from "./pages/WpOfficial";
import { StatisticsProfile } from "./pages/StatisticsProfile";
import { WpReports } from "./pages/WpReports";
import { AsylumReports } from "./pages/AsylumReports";
import { StatisticsCitizenship } from "./pages/StatisticsCitizenship";
import { StatisticsCountryBordercross } from "./pages/StatisticsCountryBordercross";
import { StatisticsPeriodBordercross } from "./pages/StatisticsPeriodBordercross";
import { ApastanTotal } from "./pages/ApastanTotal";
import { ApastanApplications } from "./pages/ApastanApplications";
import { ApastanDecisions } from "./pages/ApastanDecisions";
import { ApastanYears } from "./pages/ApastanYears";
import { Deals } from "./pages/Deals";
import { Login } from "./pages/Login";
import { StatisticsTotalBordercross } from "./pages/StatisticsTotalBordercross";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="pdf" element={<Pdf />} />
        <Route index element={<Home />} />
        <Route path="bpr" element={<Search />} />
        <Route path="bpr/:ssn" element={<PersonPage />} />
        <Route path="workpermit" element={<WorkPermit />}>
          <Route path="ssns-fromfile" element={<FileUpload />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="register/:taxId" element={<Register />} />
        <Route path="statistics" element={<Statistics />}>
          <Route path="work-permit" element={<WorkPermitStats />} />
          <Route path="deals" element={<Deals />} />
          <Route path="profile" element={<StatisticsProfile />} />
          <Route
            path="country-bordercross"
            element={<StatisticsCountryBordercross />}
          />
          <Route
            path="total-bordercross"
            element={<StatisticsTotalBordercross />}
          />
          <Route
            path="period-bordercross"
            element={<StatisticsPeriodBordercross />}
          />
          <Route path="citizenship" element={<StatisticsCitizenship />} />
          <Route path="wp-reports" element={<WpReports />} />
          <Route path="asylum-reports" element={<AsylumReports />} />
          <Route path="apastan-total" element={<ApastanTotal />} />
          <Route
            path="apastan-applications"
            element={<ApastanApplications />}
          />
          <Route path="apastan-decisions" element={<ApastanDecisions />} />
          <Route path="apastan-years" element={<ApastanYears />} />
          <Route path="work-permit-official" element={<WpOfficial />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
