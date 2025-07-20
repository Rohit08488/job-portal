import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginvideo from "../images/login.mp4";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../css files/Login.css';
import Registration from "../Componet/Registration";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
      // Validate inputs
      if (!email || !password) {
        setMessage("Please fill in all fields");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage("Please enter a valid email address");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      let url;
      if (role === "user") url = `${process.env.REACT_APP_API_URL}/authcontroller`;
      else if (role === "recruiter")
        url = `${process.env.REACT_APP_API_URL}/authcontrollercompany`;
      else if (role === "admin")
        url = `${process.env.REACT_APP_API_URL}/authcontrolleradmin`;

      // Check if API URL is configured
      if (!process.env.REACT_APP_API_URL) {
        setMessage("API configuration error. Please contact support.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Handle network errors
      if (!res.ok) {
        if (res.status === 401) {
          setMessage("Invalid email or password");
          setMessageType("error");
          setIsLoading(false);
          return;
        } else if (res.status === 404) {
          setMessage("Service not found. Please contact support.");
          setMessageType("error");
          setIsLoading(false);
          return;
        } else if (res.status >= 500) {
          setMessage("Server error. Please try again later.");
          setMessageType("error");
          setIsLoading(false);
          return;
        }
      }

      const data = await res.json();

      if (data.status === true) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setMessage(
          `${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`
        );
        setMessageType("success");

        // Small delay to show success message
        setTimeout(() => {
          // Navigate based on role
          if (role === "admin") {
            localStorage.setItem("role", "admin");
            navigate("/admin/dashboard");
          } else if (role === "recruiter") {
            auth.setIsRecruiterAuthenticated(true);
            localStorage.setItem("recruiterEmail", email);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", "recruiter");
            navigate("/");
          } else {
            auth.setIsAuthenticated(true);
            localStorage.setItem("studentEmail", email);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", "user");
            navigate("/");
          }
        }, 1000);
      } else {
        setMessage(data.message || "Login failed. Please check your credentials.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle different types of errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage("Network error. Please check your internet connection.");
      } else if (error.name === 'AbortError') {
        setMessage("Request timeout. Please try again.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container-fluid vh-100 d-flex align-items-center">
        <div className="row w-100 px-5">
          <div className="col-md-7 d-flex align-items-center justify-content-center">
            <div className="video-container" style={{paddingTop:"150px"}}>
              <video
                width="100%"
                height="auto"
                autoPlay
                loop
                muted
                className="rounded shadow"
              >
                <source src={loginvideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="col-md-5 d-flex flex-column justify-content-center">
            <div className="form-section">
              <h2 className="login-title">Login</h2>

              <Form onSubmit={handleSubmit} className="login-form">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3 login-floating-label"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="login-form-control"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-3 login-floating-label"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="login-form-control"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingRole"
                  label="Role"
                  className="mb-3 login-floating-label"
                >
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    disabled={isLoading}
                    className="login-form-select"
                  >
                    <option value="user">Candidate</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </FloatingLabel>

                <Button 
                  type="submit" 
                  className={`w-100 login-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              {message && (
                <div className={`mt-3 text-center message-alert ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                  {message}
                </div>
              )}
                <div className="registration-in-login mt-3 text-center">
                  <Registration customClass="login-page-style"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
