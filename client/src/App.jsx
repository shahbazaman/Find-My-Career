import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";

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
/* Job Marketplace Pages (PUBLIC) */
import JobList from "./recruiter/JobList";
import JobDetails from "./recruiter/JobDetails";
import CompanyProfile from "./recruiter/CompanyProfile";
import Page6 from "./Page6";
/* Recruiter Pages */
import RecruiterLayout from "./components/RecruiterLayout";
import RecruiterDashboard from "./recruiter/RecruiterDashboard";
import AddJobForm from "./pages/AddJobForm";
import JobView from "./pages/JobView";
import "./css/App.css";
import ManageCompany from "./recruiter/ManageCompany";
import CompanyProfileForm from "./recruiter/CompanyProfileForm";
import ApplicantProfile from "./recruiter/ApplicantProfile";
import Applicants from "./recruiter/Applicants";
import SettingsCompany from "./pages/settings/settingsCompany";
import ResetPassword from "./pages/ResetPassword";
import EditJob from "./pages/EditJob"; // adjust path if needed
import ContactUs from "./pages/ContactUs";
import DSA from "./pages/JobPrepMcq/DSA";
import English from "./pages/JobPrepMcq/English";
import Aptitude from "./pages/JobPrepMcq/Aptitude";
import React from "./pages/JobPrepMcq/ReactJs";
import Mern from "./pages/JobPrepMcq/Mern";
import Dbms from "./pages/JobPrepMcq/Dbms";
import Oops from "./pages/JobPrepMcq/Oops";
import DsaNotes from "./pages/JobPrepNotes/DsaNotes";
import DbmsNotes from "./pages/JobPrepNotes/DbmsNotes";
import MernNotes from "./pages/JobPrepNotes/MernNotes";
import EnglishNotes from "./pages/JobPrepNotes/EnglishNotes";
import ReactNotes from "./pages/JobPrepNotes/ReactNotes";
import AptitudeNotes from "./pages/JobPrepNotes/AptitudeNotes";
import OopsNotes from "./pages/JobPrepNotes/OopsNotes";
import ScheduleInterview from "./pages/ScheduleInterviews";
function App() {
  return (
    <BrowserRouter>
      <NavigationBar />

      <Routes>
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
        <Route
  path="/schedule-interview"
  element={<ScheduleInterview />}
/>
        {/* ================= job prep MCQs ================= */}
        <Route path="/dsa" element={<DSA/>}/>
        <Route path="/dbms" element={<Dbms/>}/>
        <Route path="/english" element={<English/>}/>
        <Route path="/oops" element={<Oops/>}/>
        <Route path="/aptitude" element={<Aptitude/>}/>
        <Route path="/react" element={<React/>}/>
        <Route path="/mern" element={<Mern/>}/>
         {/* ================= job prep Notes ================= */}
         <Route path="/dsaNotes" element={<DsaNotes/>}/>
         <Route path="/dbmsNotes" element={<DbmsNotes/>}/>
         <Route path="/oopsNotes" element={<OopsNotes/>}/>
         <Route path="/aptitudeNotes" element={<AptitudeNotes/>}/>
         <Route path="/reactNotes" element={<ReactNotes/>}/>
         <Route path="/englishNotes" element={<EnglishNotes/>}/>
         <Route path="/mernNotes" element={<MernNotes/>}/>
        {/* ================= JOB SEEKER ROUTES ================= */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobPrep" element={<JobPrep />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manageCompany" element={<ManageCompany />} />
        <Route path="/CompanyProfileForm" element={<CompanyProfileForm />} />
        <Route path="/notification" element={<Notification />} />

        {/* ================= JOB MARKETPLACE (PUBLIC) ================= */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/company/:companyId" element={<CompanyProfile />} />

        {/* ================= LEGACY / SHARED ROUTE ================= */}
        {/* This is your existing page – KEEP IT */}
        <Route path="/addJobForm" element={<AddJobForm />} />

        {/* ================= RECRUITER ROUTES ================= */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />

          {/* recruiter-specific add job */}
          <Route path="add-job" element={<AddJobForm />} />
        </Route>

        <Route path="/settings" element={<SettingsLayout />}>

          {/* CHILD PAGES (INSIDE MAIN PAGE) */}
          <Route path="account" element={<AccountSettings />} />
          <Route path="jobs" element={<JobPreferences />} />
          <Route path="applications" element={<ApplicationSettings />} />
          <Route path="help" element={<HelpSettings />} />

        </Route>
        <Route path="/settingsCompany" element={<SettingsCompany />}>

          {/* CHILD PAGES (INSIDE MAIN PAGE) */}
          <Route path="account" element={<AccountSettings />} />
          <Route path="help" element={<HelpSettings />} />

        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
