import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";

/* Admin */
import AdminRoutes from "./admin/AdminRoutes";

/* Public & User Pages */
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./pages/Profile";
import JobPrep from "./pages/JobPrep";
import Companies from "./pages/Companies";
import Roles from "./pages/Roles";
import Manage from "./pages/Manage";
import Notification from "./pages/Notification";
import SettingsLayout from "./pages/settings/SettingsLayout";
import AccountSettings from "./pages/settings/AccountSettings";
import JobPreferences from "./pages/settings/JobPreferences";
import ApplicationSettings from "./pages/settings/ApplicationSettings";
import HelpSettings from "./pages/settings/HelpSettings";

import JobList from "./recruiter/JobList";
import JobDetails from "./recruiter/JobDetails";
import CompanyProfile from "./recruiter/CompanyProfile";
import Page6 from "./Page6";
import RecruiterLayout from "./components/RecruiterLayout";
import RecruiterDashboard from "./recruiter/RecruiterDashboard";
import AddJobForm from "./pages/AddJobForm";
import JobView from "./pages/JobView";
import ManageCompany from "./recruiter/ManageCompany";
import CompanyProfileForm from "./recruiter/CompanyProfileForm";
import ApplicantProfile from "./recruiter/ApplicantProfile";
import Applicants from "./recruiter/Applicants";
import SettingsCompany from "./pages/settings/settingsCompany";
import ResetPassword from "./pages/ResetPassword";
import EditJob from "./pages/EditJob";
import ContactUs from "./pages/ContactUs";
import ScheduleInterview from "./pages/ScheduleInterviews";
import MernMcq from "./pages/JobPrepMcq/Mern";
import ReactMcq from "./pages/JobPrepMcq/React";
import DbmsMcq from "./pages/JobPrepMcq/Dbms";
import OopsMcq from "./pages/JobPrepMcq/Oops";
import DSAMcq from "./pages/JobPrepMcq/DSA";
import AptitudeMcq from "./pages/JobPrepMcq/Aptitude";
import EnglishMcq from "./pages/JobPrepMcq/English";
import AptitudeNotes from "./pages/JobPrepNotes/AptitudeNotes";
import OopsNotes from "./pages/JobPrepNotes/OopsNotes";
import EnglishNotes from "./pages/JobPrepNotes/EnglishNotes";
import DbmsNotes from "./pages/JobPrepNotes/DbmsNotes";
import ReactNotes from "./pages/JobPrepNotes/ReactNotes";
import MernNotes from "./pages/JobPrepNotes/MernNotes";
import DSANotes from "./pages/JobPrepNotes/DsaNotes"
import "./css/App.css";

/* Hide NavigationBar on /admin routes */
const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavigationBar />}

      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/recruiter/applications/:id" element={<ApplicantProfile />}/>
        <Route path="/jobs/:jobId" element={<JobView />} />
        <Route path="/recruiter/applicants/:jobId" element={<Applicants />}/>
        <Route path="/edit-job/:jobId" element={<EditJob />} />
        <Route path="/page6" element={<Page6/>}/>
        <Route path="/contactUs" element={<ContactUs/>}/>
        <Route path="/schedule-interview" element={<ScheduleInterview />} />
        <Route path="/dsaNotes" element={<DSANotes />} />
<Route path="/dsa" element={<DSAMcq />} />

<Route path="/aptitudeNotes" element={<AptitudeNotes />} />
<Route path="/aptitude" element={<AptitudeMcq />} />

<Route path="/oopsNotes" element={<OopsNotes />} />
<Route path="/oops" element={<OopsMcq />} />

<Route path="/englishNotes" element={<EnglishNotes />} />
<Route path="/english" element={<EnglishMcq />} />

<Route path="/dbmsNotes" element={<DbmsNotes />} />
<Route path="/dbms" element={<DbmsMcq />} />

<Route path="/reactNotes" element={<ReactNotes />} />
<Route path="/react" element={<ReactMcq />} />

<Route path="/mernNotes" element={<MernNotes />} />
<Route path="/mern" element={<MernMcq />} />

        {/* ================= JOB SEEKER ROUTES ================= */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobPrep" element={<JobPrep />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manageCompany" element={<ManageCompany />} />
        <Route path="/CompanyProfileForm" element={<CompanyProfileForm />} />
        <Route path="/notification" element={<Notification />} />

        {/* ================= JOB MARKETPLACE ================= */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/company/:companyId" element={<CompanyProfile />} />

        <Route path="/addJobForm" element={<AddJobForm />} />

        {/* ================= RECRUITER ================= */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="add-job" element={<AddJobForm />} />
        </Route>

        {/* ================= SETTINGS ================= */}
        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="account" element={<AccountSettings />} />
          <Route path="jobs" element={<JobPreferences />} />
          <Route path="applications" element={<ApplicationSettings />} />
          <Route path="help" element={<HelpSettings />} />
        </Route>

        <Route path="/settingsCompany" element={<SettingsCompany />}>
          <Route path="account" element={<AccountSettings />} />
          <Route path="help" element={<HelpSettings />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
