import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home.page";
import NotFound from "./pages/NotFound.page";
import PersonPage from "./pages/Person.page";
import Search from "./pages/Search.page";
import Register from "./pages/Register.page";
import Pdf from "./pages/Pdf.page";
import { Login } from "./pages/Login";

import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import Likes from "./pages/Likes/Likes";
import Shares from "./pages/Shares/Shares";
import Roles from "./pages/Roles/Roles";
import RequirePermission from "./components/requirePermission/RequirePermission";
import { permissionsMap } from "./utils/constants";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth fallbackPath={"/login"}>
            <Layout />
          </RequireAuth>
        }
      >
        {/* <Route path="pdf" element={<Pdf />} /> */}
        {/* <Route index element={<Home />} /> */}
        <Route
          index
          element={
            <RequirePermission
              permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
            >
              <Search />
            </RequirePermission>
          }
        />
        <Route
          path="bpr/:ssn"
          element={
            <RequirePermission
              permissions={[permissionsMap.BPR.uid, permissionsMap.ADMIN.uid]}
            >
              <PersonPage />
            </RequirePermission>
          }
        />
        {/* <Route path="workpermit" element={<WorkPermit />}>
          <Route path="ssns-fromfile" element={<FileUpload />} />
        </Route> */}
        <Route
          path="register"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.PETREGISTER.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Register />
            </RequirePermission>
          }
        />
        <Route
          path="register/:taxId"
          element={
            <RequirePermission
              permissions={[
                permissionsMap.PETREGISTER.uid,
                permissionsMap.ADMIN.uid,
              ]}
            >
              <Register />
            </RequirePermission>
          }
        />
        <Route path="profile" element={<Profile />} />
        <Route path="likes" element={<Likes />} />
        <Route path="shares" element={<Shares />} />
        <Route
          path="users"
          element={
            <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
              <Users />
            </RequirePermission>
          }
        />
        <Route
          path="roles"
          element={
            <RequirePermission permissions={[permissionsMap.ADMIN.uid]}>
              <Roles />
            </RequirePermission>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
