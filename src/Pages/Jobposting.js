import React, { useEffect, useState } from "react";
import { Button, Form, Collapse, Card } from "react-bootstrap";
import axios from "axios";
import '../css files/JobPosting.css'
function JobPosting() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    preference: "",
    numberOfPosts: "",
    email: localStorage.getItem("recruiterEmail") || "",
    post: "",
    companyName: localStorage.getItem("recruiterName") || "Job Portal",
  });
  const [jobPosts, setJobPosts] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const recruiterEmail = localStorage.getItem("recruiterEmail");

  const handleToggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccessMsg("");

  try {
    const token = localStorage.getItem("token");

    // ✅ insert to jobpostingforstudent (protected)
    await axios.post(
      `${process.env.REACT_APP_API_URL}/insertjobpostingforstudent`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ insert to jobpostingdata (protected)
    await axios.post(
      `${process.env.REACT_APP_API_URL}/insertjobpostingdata`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ notify students (protected)
    const notifyRes = await axios.post(
      `${process.env.REACT_APP_API_URL}/sendNotificationToCandidates`,
      {
        jobTitle: formData.preference,
        companyName: formData.companyName,
        preference: formData.preference,
        post: formData.post,
        email: formData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSuccessMsg(
      `Job posted and notifications sent: ${notifyRes.data.message}`
    );

    fetchRecruiterJobs(); // Refresh job list

    // Reset form
    setFormData({
      preference: "",
      numberOfPosts: "",
      email: recruiterEmail,
      post: "",
      companyName:
        localStorage.getItem("recruiterName") || "Job Portal",
    });
  } catch (err) {
    console.error(err);
    setError("Failed to post job. Please try again.");
  }
};


  const fetchRecruiterJobs = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getjobpostingbyemail/${recruiterEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setJobPosts(res.data.message);
  } catch (err) {
    console.error("Error fetching recruiter jobs:", err);
  }
};


  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/deletejobpostingdata/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token here
          },
        }
      );

      setJobPosts(jobPosts.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err.response || err);
      setError("Failed to delete job. Please try again.");
    }
  };

  useEffect(() => {
    if (recruiterEmail) {
      fetchRecruiterJobs();
    }
  }, [recruiterEmail]);

  return (
    <div
      className="job-posting-wrapper d-flex flex-column align-items-center justify-content-start py-5"
      style={{ minHeight: "calc(100vh - 120px)", backgroundColor: "#f8f9fa" }}
    >
      <Button
        variant={showForm ? "outline-danger" : "primary"}
        onClick={handleToggleForm}
        className="mb-4"
        style={{margin:"35px"}}
      >
        {showForm ? "Hide Job Form" : "Post Job"}
      </Button>

      <Collapse in={showForm}>
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <Card className="p-4 shadow-lg bg-white rounded">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="preference">
                <Form.Label>Job Preference</Form.Label>
                <Form.Control
                  as="select"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a job preference</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="numberOfPosts">
                <Form.Label>No. of Job Postings</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfPosts"
                  placeholder="e.g., 3"
                  value={formData.numberOfPosts}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="e.g., hr@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="post">
                <Form.Label>Post Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="post"
                  placeholder="Enter job details here..."
                  value={formData.post}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100"  disabled={!localStorage.getItem("token")}>
                Submit Job
              </Button>
            </Form>

            {successMsg && <p className="text-success mt-3">{successMsg}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </Card>
        </div>
      </Collapse>

      {/* Recruiter's job posts */}
      <div className="mt-5" style={{ width: "100%", maxWidth: "800px" }}>
        <h4>Your Posted Jobs</h4>
        <ul className="list-group">
          {jobPosts.length > 0 ? (
            jobPosts.map((job, index) => (
              <li key={index} className="list-group-item mb-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{job.preference}</h5>
                    <p>{job.post}</p>
                    <p>
                      <strong>Number of Posts:</strong> {job.numberOfPosts}
                    </p>
                    <p>
                      <strong>Contact:</strong> {job.email}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteJob(job._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <p>No job posts available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default JobPosting;
