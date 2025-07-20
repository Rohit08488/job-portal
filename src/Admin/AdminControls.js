import { useState, useEffect } from "react";
import "../css files/AdminControls.css";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Import xlsx library
import { useAuth } from "../contexts/AuthContext";

const AdminControls = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  // Admin Profile State
  const [admin, setAdmin] = useState({
    email: "rohit@gmail.com", // Fixed email for admin
    password: "",
    confirmPassword: "",
  });

  const [students, setStudents] = useState([]); // State to store students
  const [companies, setCompanies] = useState([]); // State to store companies
  const [loading, setLoading] = useState(false); // Loading state for API call

  // Fetch students and companies data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const studentResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/getstudentdata`
        );
        const studentData = await studentResponse.json();

        const companyResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/getcompanydata`
        );
        const companyData = await companyResponse.json();

        if (studentData && Array.isArray(studentData.data)) {
          setStudents(studentData.data); // Set fetched student data
        } else {
          setStudents([]); // If no valid student data
        }

        if (companyData && Array.isArray(companyData.message)) {
          setCompanies(companyData.message); // Set fetched company data
        } else {
          setCompanies([]); // If no valid company data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false); // Stop loading
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Function to download Excel file
  const exportExcel = (data, filename) => {
    // Remove the password field from each student/company object
    const cleanedData = data.map(({ password, ...item }) => item);

    const worksheet = XLSX.utils.json_to_sheet(cleanedData); // Convert JSON to sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Append sheet to workbook
    XLSX.writeFile(workbook, filename); // Write to file
  };

  // Save changes to the admin profile (password update)
  const handleSaveChanges = async () => {
    if (admin.password !== admin.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const fixedEmail = "rohit@gmail.com";
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/authcontrolleradminupdate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: fixedEmail, // Send the fixed email
            newPassword: admin.password,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        alert("Admin profile updated successfully!");
      } else {
        alert("Error updating profile!");
      }
    } catch (error) {
      console.error("Error updating admin profile:", error);
    }
  };

  // Logout
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

      <div className="admin-section">
        <div className="admin-controls-container">
          <h1 className="admin-heading">Admin Controls</h1>

          {/* Export Data Section */}
          <h2>Export Data</h2>
          <button
            className="button"
            onClick={() => exportExcel(students, "students.xlsx")}
            disabled={loading || students.length === 0}
          >
            {loading ? "Loading..." : "Export Students"}
          </button>
          <button
            className="button"
            onClick={() => exportExcel(companies, "companies.xlsx")}
            disabled={loading || companies.length === 0}
          >
            {loading ? "Loading..." : "Export Companies"}
          </button>

          {/* Admin Settings Section */}
          <h2 style={{ marginTop: "20px" }}>Admin Settings</h2>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={admin.email} readOnly />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={admin.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
