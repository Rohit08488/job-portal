// Mobile Menu Toggle Functionality
// Add this to your AdminDashboard.jsx component

import { useState, useEffect } from "react";
import "../css files/AdminDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
  });

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on window resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total students
        const studentResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/getstudentdata`
        );
        if (!studentResponse.ok) {
          throw new Error("Failed to fetch student data");
        }
        const studentData = await studentResponse.json();

        // Fetch total companies
        const companyResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/getcompanydata`
        );
        if (!companyResponse.ok) {
          throw new Error("Failed to fetch company data");
        }
        const companyData = await companyResponse.json();

        // Fetch total job postings
        const jobResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/getjobpostingdata`
        );
        if (!jobResponse.ok) {
          throw new Error("Failed to fetch job data");
        }
        const jobData = await jobResponse.json();

        setStats({
          totalStudents: studentData?.data?.length || 0,
          totalCompanies: companyData?.message?.length || 0,
          totalJobs: jobData?.message?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    auth.setIsAuthenticated(false);
    navigate("/login");
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  return (
    <div className="admin-container">
      {/* Mobile Menu Toggle Button */}
      <button
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      ></div>

      {/* Admin Navigation */}
      <div className={`admin-buttons ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link 
          to="/admin/dashboard" 
          onClick={handleLinkClick}
          aria-label="Go to Dashboard"
        >
          Dashboard
        </Link>
        <Link 
          to="/students" 
          onClick={handleLinkClick}
          aria-label="View Students"
        >
          Students
        </Link>
        <Link 
          to="/companies" 
          onClick={handleLinkClick}
          aria-label="View Companies"
        >
          Companies
        </Link>
        <Link 
          to="/settings" 
          onClick={handleLinkClick}
          aria-label="Go to Settings"
        >
          Settings
        </Link>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
          }}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Content */}
      <div className={`admin-dashboard-wrapper ${isMobileMenuOpen ? 'shifted' : ''}`}>
        <h1 className="admin-heading">Admin Dashboard</h1>

        <div className="stats-grid">
          <StatCard
            title="Total Students"
            count={stats.totalStudents}
            color="bg-blue"
          />
          <StatCard
            title="Total Companies"
            count={stats.totalCompanies}
            color="bg-green"
          />
          <StatCard
            title="Total Job Openings"
            count={stats.totalJobs}
            color="bg-orange"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, count, color }) => (
  <div className={`stat-card ${color}`}>
    <h3 className="stat-title">{title}</h3>
    <p className="stat-count">{count}</p>
  </div>
);

export default AdminDashboard;