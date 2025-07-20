import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import '../css files/register.css'

function Reg({ name, customClass = "", ...props }){
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button 
        variant="primary" 
        onClick={handleShow} 
        className={`me-2 registration-main-btn ${customClass}`}
      >
        REGISTRATION
      </Button>

      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>REGISTRATION AS A</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button
            variant="primary"
            className="me-2 registration-choice-btn"
            onClick={() => {
              handleClose();
              navigate("/candidates");
            }}
          >
            Candidates
          </Button>
          <Button
            variant="primary"
            className="me-2 registration-choice-btn"
            onClick={() => {
              handleClose();
              navigate("/recruiters");
            }}
          >
            Recruiters
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Registration() {
  return (
    <>
      {["bottom"].map((placement, idx) => (
        <Reg key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Registration;