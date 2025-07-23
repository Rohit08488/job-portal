import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../css files/StudentSidebar.css";

const StudentSidebar = ({ showSidebar, setShowSidebar, sidebarRef }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [updatedExpertise, setUpdatedExpertise] = useState([]);
  const [showExpertiseEditor, setShowExpertiseEditor] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const expertiseOptions = [
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "UI/UX Design",
    "Digital Marketing",
  ];

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showSidebar) {
        setShowSidebar(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showSidebar) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showSidebar, sidebarRef, setShowSidebar]);

  useEffect(() => {
    if (showSidebar) {
      const studentEmail = localStorage.getItem("studentEmail");
      if (studentEmail) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/getStudentByEmail`, {
            email: studentEmail,
          })
          .then((res) => {
            const userData = res.data.data;
            setUserDetails(userData);

            const expertise = Array.isArray(userData.expertise)
              ? userData.expertise
              : typeof userData.expertise === "string"
              ? [userData.expertise]
              : [];

            setUpdatedExpertise(expertise);
          })
          .catch((err) => {
            console.error("Error fetching student data:", err);
            // Handle error gracefully
          });
      }
    }
  }, [showSidebar]);

  const handleExpertiseChange = (option) => {
    setUpdatedExpertise((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleExpertiseUpdate = () => {
    setLoading(true);
    const studentEmail = localStorage.getItem("studentEmail");
    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/updateStudentdata`,
        {
          email: studentEmail,
          expertise: JSON.stringify(updatedExpertise),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUserDetails({ ...userDetails, expertise: updatedExpertise });
        setShowExpertiseEditor(false);
        alert("Expertise updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating expertise:", err);
        alert("Failed to update expertise. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.new) {
      alert("Please fill in both current and new password fields.");
      return;
    }

    if (passwords.new.length < 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }

    setPasswordLoading(true);
    const studentEmail = localStorage.getItem("studentEmail");
    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/updateStudentdata`,
        {
          email: studentEmail,
          currentPassword: passwords.current,
          newPassword: passwords.new,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Password updated successfully!");
        setPasswords({ current: "", new: "" });
      })
      .catch((err) => {
        console.error("Error updating password:", err);
        alert("Failed to update password. Please check your current password.");
      })
      .finally(() => {
        setPasswordLoading(false);
      });
  };

  const formatFieldValue = (value) => {
    return value && value !== "" ? value : "Not Available";
  };

  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <div className="sidebar-content" ref={sidebarRef}>
        <span 
          className="close-btn" 
          onClick={() => setShowSidebar(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setShowSidebar(false)}
          aria-label="Close sidebar"
        >
          &times;
        </span>

        {userDetails ? (
          <>
            <h3>Your Profile</h3>
            
            <div className="profile-info">
              <p>
                <strong>Full Name:</strong>{" "}
                {formatFieldValue(userDetails.fullName)}
              </p>
              <p>
                <strong>Contact Number:</strong>{" "}
                {formatFieldValue(userDetails.contactNumber)}
              </p>
              <p>
                <strong>Email:</strong> {formatFieldValue(userDetails.email)}
              </p>
              <p>
                <strong>Gender:</strong> {formatFieldValue(userDetails.gender)}
              </p>
              <p>
                <strong>Enrollment No:</strong>{" "}
                {formatFieldValue(userDetails.enrollmentNumber)}
              </p>
              <p>
                <strong>Expertise:</strong>{" "}
                {updatedExpertise.length > 0
                  ? updatedExpertise.join(", ")
                  : "No expertise selected"}{" "}
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setShowExpertiseEditor(!showExpertiseEditor)}
                  aria-expanded={showExpertiseEditor}
                >
                  {showExpertiseEditor ? "Cancel" : "Update"}
                </Button>
              </p>
            </div>

            {showExpertiseEditor && (
              <div className="expertise-editor">
                <h5>Update Expertise</h5>
                <div className="expertise-options">
                  {expertiseOptions.map((opt) => (
                    <label key={opt}>
                      <input
                        type="checkbox"
                        checked={updatedExpertise.includes(opt)}
                        onChange={() => handleExpertiseChange(opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handleExpertiseUpdate}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}

            <div className="password-section">
              <h5>Change Password</h5>
              <input
                type="password"
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
                className="form-control mb-3"
                autoComplete="current-password"
              />
              <input
                type="password"
                placeholder="New Password (min 6 characters)"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="form-control mb-3"
                autoComplete="new-password"
              />
              <Button 
                variant="warning" 
                onClick={handlePasswordUpdate}
                disabled={passwordLoading || !passwords.current || !passwords.new}
              >
                {passwordLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </>
        ) : (
          <div className="loading-container">
            <p>Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSidebar;