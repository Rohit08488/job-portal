import { useState, useEffect } from "react";
import "../css files/StudentManagement.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const StudentManagement = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchEnrollment, setSearchEnrollment] = useState("");
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
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getStudentdata`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("API response:", data); // 🔍 ADD THIS

        if (Array.isArray(data.data)) {
          setStudents(data.data);
        } else {
          console.error("Expected array in data.data");
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.enrollmentNumber
      ?.toLowerCase()
      .includes(searchEnrollment.toLowerCase())
  );

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/deleteStudentById/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setStudents((prev) => prev.filter((student) => student._id !== id));
        alert("Student deleted successfully!");
      } else {
        alert("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Error deleting student.");
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
        <div className="student-container">
          <h1 className="student-heading">Student Management</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by enrollment no..."
              value={searchEnrollment}
              onChange={(e) => setSearchEnrollment(e.target.value)}
            />
          </div>

          <table className="student-table">
            <thead>
              <tr>
                <th>Enrollment No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
           <tbody>
                {filteredStudents.map((student) => (
              <tr key={student._id}>
              <td data-label="Enrollment No.">{student.enrollmentNumber || "N/A"}</td>
              <td data-label="Name">{student.fullName}</td>
              <td data-label="Email">{student.email}</td>
              <td>
                  <button
                      className="delete-button"
                        onClick={() => deleteStudent(student._id)}
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

export default StudentManagement;
