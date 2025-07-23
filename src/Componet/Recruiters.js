import { useState } from "react";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css files/recruiterreg.css'

function Recruiter() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    companyName: "",
    position: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    const email = formData.email.trim();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/sendOtp`, {
        email,
        role: "recruiter",
      });

      if (res.data.message) {
        setOtpSent(true);
        setSuccess("OTP sent to your email.");
      }
    } catch (err) {
      console.error("OTP error:", err.response?.data || err.message);
      if (err.response?.status === 409) {
        setError("Email already exists. Please use a different email.");
      } else {
        setError(err.response?.data?.message || "Failed to send OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/verifyOtp`, {
        email: formData.email,
        otp,
      });

      if (res.data.verified) {
        setOtpVerified(true);
        setSuccess("Email verified successfully!");
      } else {
        setError("Invalid OTP.");
      }
    } catch (err) {
      setError("OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otpVerified) {
      setError("Please verify your email before submitting the form.");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/insertCompanydata`,
        formData
      );

      setSuccess("Recruiter registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="recruiter-form-container">
      <h2 className="recruiter-form-title">Recruiter Registration</h2>
      <p className="recruiter-form-subtitle">Join our platform and find the best talent</p>
      
      <Form onSubmit={handleSubmit} className="recruiter-form">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label className="form-field-label">Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="form-field-input"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-field-label">Contact Number</Form.Label>
          <Form.Control
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
            className="form-field-input"
            maxLength="10"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-field-label">Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="form-field-input"
            disabled={otpVerified}
            required
          />
        </Form.Group>

        <div className="d-flex gap-2 mb-3">
          <Button
            variant="outline-primary"
            onClick={handleSendOtp}
            disabled={loading || !formData.email || otpSent}
            className="flex-shrink-0"
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Sending...
              </>
            ) : otpSent ? (
              "OTP Sent"
            ) : (
              "Send OTP"
            )}
          </Button>

          {otpSent && (
            <>
              <Form.Group className="flex-grow-1">
                <Form.Label className="form-field-label">Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="form-field-input"
                  disabled={otpVerified}
                  maxLength="6"
                />
              </Form.Group>

              <Button
                variant="outline-success"
                onClick={handleVerifyOtp}
                disabled={loading || !otp || otpVerified}
                className="flex-shrink-0"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Verifying...
                  </>
                ) : otpVerified ? (
                  "Verified ✓"
                ) : (
                  "Verify"
                )}
              </Button>
            </>
          )}
        </div>

        <Form.Group className="mb-3">
          <Form.Label className="form-field-label">Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name"
            className="form-field-input"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-field-label">Your Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter your position/designation"
            className="form-field-input"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-field-label">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password (min 8 characters)"
            className="form-field-input"
            minLength="8"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="form-field-label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="form-field-input"
            minLength="8"
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading || !otpVerified}
            className="px-5"
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Registering...
              </>
            ) : (
              "Register as Recruiter"
            )}
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => navigate("/login")}
            >
              Login here
            </Button>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Recruiter;