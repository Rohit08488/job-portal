import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import '../css files/Footer.css'; // Make sure to import your Footer CSS file

function Bottom() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://facebook.com",
      className: "facebook"
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com",
      className: "twitter"
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com",
      className: "instagram"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://linkedin.com",
      className: "linkedin"
    }
  ];

  return (
    <footer className="footer-container">
      <Container>
        <Row className="gy-4">
          {/* About Section */}
          <Col md={4} className="footer-about">
            <h5>About Job Portal</h5>
            <p>
              Job Portal is a platform where students can showcase their resumes
              and recruiters can post job vacancies. We bridge the gap between
              talent and opportunities.
            </p>
          </Col>

          {/* Contact Details */}
          <Col md={4} className="footer-contact">
            <h5>Contact Us</h5>
            <p>Email: Job Portal@gmail.com</p>
            <p>Phone: +91 9875435676</p>
            <p>Location: #231 Sirsa, Haryana</p>
          </Col>

          {/* Social Media */}
          <Col md={4} className="footer-social">
            <h5>Follow Us</h5>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`social-link ${social.className}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  title={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        {/* Copyright Section */}
        <Row>
          <Col className="footer-copyright">
            <p>&copy; {currentYear} Job Portal. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Bottom;