import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../css files/StudentSidebar.css";

const StudentSidebar = ({ showSidebar, setShowSidebar, sidebarRef }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [updatedExpertise, setUpdatedExpertise] = useState([]);
  const [showExpertiseEditor, setShowExpertiseEditor] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", new: "" });

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
          .catch((err) => console.error("Error fetching student data:", err));
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
        alert("Expertise updated!");
      })
      .catch((err) => {
        console.error("Error updating expertise:", err);
        alert("Failed to update expertise.");
      });
  };

  const handlePasswordUpdate = () => {
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
        alert("Password updated!");
        setPasswords({ current: "", new: "" });
      })
      .catch((err) => {
        console.error("Error updating password:", err);
        alert("Failed to update password.");
      });
  };

  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <div className="sidebar-content" ref={sidebarRef}>
        <span className="close-btn" onClick={() => setShowSidebar(false)}>
          &times;
        </span>

        {userDetails ? (
          <>
            <h3>Your Profile</h3>
            <p>
              <strong>Full Name:</strong>{" "}
              {userDetails.fullName || "Not Available"}
            </p>
            <p>
              <strong>Contact Number:</strong>{" "}
              {userDetails.contactNumber || "Not Available"}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email || "Not Available"}
            </p>
            <p>
              <strong>Gender:</strong> {userDetails.gender || "Not Available"}
            </p>
            <p>
              <strong>Enrollment No:</strong>{" "}
              {userDetails.enrollmentNumber || "Not Available"}
            </p>
            <p>
              <strong>Expertise:</strong>{" "}
              {updatedExpertise.length > 0
                ? updatedExpertise.join(", ")
                : "No expertise provided"}{" "}
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setShowExpertiseEditor(true)}
              >
                Update
              </Button>
            </p>

            {showExpertiseEditor && (
              <div style={{ marginTop: 20 }}>
                <h5>Update Expertise</h5>
                {expertiseOptions.map((opt) => (
                  <div key={opt}>
                    <label>
                      <input
                        type="checkbox"
                        checked={updatedExpertise.includes(opt)}
                        onChange={() => handleExpertiseChange(opt)}
                      />{" "}
                      {opt}
                    </label>
                  </div>
                ))}
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handleExpertiseUpdate}
                >
                  Save
                </Button>
              </div>
            )}

            <div style={{ marginTop: 40 }}>
              <h5>Change Password</h5>
              <input
                type="password"
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
                className="form-control mb-2"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="form-control mb-2"
              />
              <Button variant="warning" onClick={handlePasswordUpdate}>
                Update Password
              </Button>
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default StudentSidebar;
