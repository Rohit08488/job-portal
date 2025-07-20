import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import StudentSidebar from "./StudentSidebar";
import '../css files/Header.css'; // Make sure to import your Header CSS file

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebarRef = useRef(null);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("recruiterEmail");
      localStorage.removeItem("role");
      
      // Update auth context
      auth.setIsAuthenticated(false);
      auth.setIsRecruiterAuthenticated(false);
      
      // Small delay for better UX
      setTimeout(() => {
        navigate("/login");
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
      // Still navigate even if there's an error
      navigate("/login");
    }
  };

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
    if (showSidebar) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to check if nav link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <Navbar 
        className={`header-navbar ${isScrolled ? 'scrolled' : ''}`}
        variant="dark" 
        expand="lg" 
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            📄 Job Portal
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/"
                className={isActiveLink('/') ? 'active' : ''}
              >
                Home
              </Nav.Link>
              
              {auth.isAuthenticated && (
                <Nav.Link 
                  as={Link} 
                  to="/notification"
                  className={isActiveLink('/notification') ? 'active' : ''}
                >
                  Notification
                </Nav.Link>
              )}
              
              {auth.isRecruiterAuthenticated && (
                <Nav.Link 
                  as={Link} 
                  to="/jobposting"
                  className={isActiveLink('/jobposting') ? 'active' : ''}
                >
                  Job Posting
                </Nav.Link>
              )}
              
              <Nav.Link 
                as={Link} 
                to="/contact"
                className={isActiveLink('/contact') ? 'active' : ''}
              >
                Contact
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/about"
                className={isActiveLink('/about') ? 'active' : ''}
              >
                About Us
              </Nav.Link>
              
              {!auth.isAuthenticated && !auth.isRecruiterAuthenticated ? (
                <Nav.Link 
                  as={Link} 
                  to="/login"
                  className={isActiveLink('/login') ? 'active' : ''}
                >
                  Login
                </Nav.Link>
              ) : (
                <Button
                  className={`header-logout-btn ${isLoading ? 'loading' : ''}`}
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? '' : 'Logout'}
                </Button>
              )}
              
              {auth.isAuthenticated && (
                <FaUserCircle
                  size={40}
                  className="header-profile-icon"
                  onClick={handleSidebarToggle}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSidebarToggle();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Open user profile sidebar"
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add padding to body content to account for fixed navbar */}
      

      {/* Sidebar */}
      <StudentSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        sidebarRef={sidebarRef}
      />
    </>
  );
}

export default Header;