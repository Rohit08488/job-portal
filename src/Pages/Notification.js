import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css files/Notification.css' // Import the themed CSS

const JobNotifications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const studentEmail = localStorage.getItem("studentEmail");
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Load applied jobs from localStorage per user
  useEffect(() => {
    const storedApplied = localStorage.getItem(`appliedJobs_${studentEmail}`);
    if (storedApplied) {
      setAppliedJobs(JSON.parse(storedApplied));
    }
  }, [studentEmail]);

  useEffect(() => {
    if (!studentEmail) {
      setError("Please log in to view your job notifications.");
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/getjobStudentdata/${studentEmail}`
        );

        const { student, jobs } = res.data;

        if (!student || !Array.isArray(student.expertise)) {
          setError("Invalid student data received.");
          return;
        }

        const filteredJobs = jobs.filter((job) =>
          student.expertise.includes(job.preference)
        );

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Something went wrong while fetching job notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [studentEmail]);

  const handleApply = async (jobId, jobTitle, companyName, companyEmail) => {
    if (appliedJobs.includes(jobId)) return; // Prevent reapplying

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sendingemailtocompany`,
        {
          jobTitle,
          companyName,
          companyEmail,
          studentId: studentEmail, // studentId is studentEmail in your DB
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send JWT
          },
        }
      );

      alert(response.data.message);

      // Update applied jobs in state and localStorage (per student)
      const updatedApplied = [...appliedJobs, jobId];
      setAppliedJobs(updatedApplied);
      localStorage.setItem(
        `appliedJobs_${studentEmail}`,
        JSON.stringify(updatedApplied)
      );
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Failed to apply for the job.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="job-notifications-wrapper">
        <div className="notifications-container">
          <div className="status-message loading">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-notifications-wrapper">
        <div className="notifications-container">
          <div className="status-message error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-notifications-wrapper">
      <div className="notifications-container">
        <h1 className="notifications-header">Notifications</h1>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-notification-card">
              <div className="job-content">
                <div>
                  <p className="company-email">
                    <strong>Email:</strong> {job.email}
                  </p>
                  <h3 className="job-title">{job.preference}</h3>
                  <p className="job-description">{job.post}</p>
                </div>
                {appliedJobs.includes(job._id) ? (
                  <button className="applied-button" disabled>
                    Applied
                  </button>
                ) : (
                  <button
                    className="apply-button"
                    onClick={() =>
                      handleApply(
                        job._id,
                        job.preference,
                        job.companyName,
                        job.email
                      )
                    }
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-jobs-message">
            No matching jobs found for your expertise.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobNotifications;