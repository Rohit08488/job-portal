import { useState, useEffect } from "react";
import "../css files/CompanyManagement.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const CompanyManagement = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getCompanydata`);
      const data = await response.json();

      if (Array.isArray(data.message)) {
        setCompanies(data.message);
      } else {
        setCompanies([]);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteCompany = async (name) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/deleteCompanyByName/${encodeURIComponent(name)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCompanies(companies.filter((c) => c.companyName !== name));
        alert("Company deleted successfully!");
      } else {
        alert("Failed to delete the company.");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };
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
        <div className="company-container">
          <h1 className="company-heading">Company Management</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Company Table */}
          <table className="company-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
    <tr key={company._id}>
      <td data-label="Company Name">{company.companyName}</td>
      <td data-label="Contact">{company.contactNumber}</td>
      <td data-label="Email">{company.email}</td>
      <td>
        <button
          className="delete-button"
          onClick={() => deleteCompany(company.companyName)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;
