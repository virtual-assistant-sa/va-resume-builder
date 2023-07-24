import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Theme, themes } from "lx-theme";

import Home from "./pages/home";
import Login from "./pages/login";
import EditProfile from "./pages/profile";
import EditResume from "./pages/resume";
import EmployeeList from "./pages/employees";
import EmployerList from "./pages/employers";
import VerifyList from "./pages/verify";
import VerifyEdit from "./pages/verify/edit";
import JobList from "./pages/jobs";
import JobEdit from "./pages/jobs/edit";
import OfferList from "./pages/offers";
import OfferEdit from "./pages/offers/edit";

import Navbar from "./utils/components/Nav";
import { AppBar, Stack } from "@mui/material";

const routes = {
  super: {
    Home: "/",
    Profile: "/profile",
    Employers: "/employers",
    Employees: "/employees",
    Verify: "/verify",
    Jobs: "/jobs",
    Offers: "/offers",
  },
  employer: {
    Home: "/",
    Profile: "/profile",
    Jobs: "/jobs",
    Employees: "/employees",
    Offers: "/offers",
  },
  employee: {
    Home: "/",
    Profile: "/profile",
    Resume: "/resume",
    Jobs: "/jobs",
    Offers: "/offers",
  },
  anon: {
    Home: "/",
  },
};

function App() {
  const user = useSelector((state) => state.login.user);

  return (
    <Theme theme={themes["GENERAL"]}>
      <AppBar position="static">
        <Stack
          direction="row"
          gap={2}
          sx={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Navbar routes={routes[user?.role ?? "anon"] ?? {}} />
          <Login />
        </Stack>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<EditProfile />}></Route>
        <Route exact path="/resume" element={<EditResume />}></Route>
        <Route exact path="/employers" element={<EmployerList />}></Route>
        <Route exact path="/employees" element={<EmployeeList />}></Route>
        <Route exact path="/verify" element={<VerifyList />}></Route>
        <Route exact path="/verify/:id/edit" element={<VerifyEdit />}></Route>
        <Route exact path="/jobs" element={<JobList />}></Route>
        <Route exact path="/jobs/:id/edit" element={<JobEdit />}></Route>
        <Route exact path="/offers" element={<OfferList />}></Route>
        <Route exact path="/offers/:id/edit" element={<OfferEdit />}></Route>
      </Routes>
    </Theme>
  );
}

export default App;
