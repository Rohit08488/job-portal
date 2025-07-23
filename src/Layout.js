import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Candidate from "./Componet/Candidate";
import Recruiter from "./Componet/Recruiters";
import StudentManagement from "./Admin/StudentManagement";
import CompanyManagement from "./Admin/CompanyManagement";
import AdminControls from "./Admin/AdminControls";
import JobPosting from "./Pages/Jobposting";
import CandidateNotifications from "./Pages/Notification";
import AdminDashboard from "./Admin/Admindashboard";


function Layout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidates" element={<Candidate />} />
        <Route path="/recruiters" element={<Recruiter />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/companies" element={<CompanyManagement />} />
        <Route path="/settings" element={<AdminControls />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/notification" element={<CandidateNotifications />} />
      </Routes>
    </>
  );
}
export default Layout;
