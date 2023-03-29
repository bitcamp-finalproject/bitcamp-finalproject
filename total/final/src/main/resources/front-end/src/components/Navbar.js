import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import "./Navbar.css";

function Navbar() {
  return (
    <div id="nav-bar">
      <Link to="/">
        <h1 id="title">Artify</h1>
      </Link>
      <Link to="/Feed/">
        <h1 id="title">Feed</h1>
      </Link>
      <Link to="/Profile">
        <h1 id="title">Profile</h1>
      </Link>
      <Link to="/Test1">
        <h1 id="title">Test1</h1>
      </Link>
      <div id="modal-back">
        <LoginModal />
      </div>
    </div>
  );
}

function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/auth/login", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        alert("응답 성공적으로 옴");
        console.log(response);
      })
      .catch((error) => {
        alert("응답 에러 발생");
      });
  };

  return (
    <>
      <p id="login-btn" onClick={handleShow}>
        Login
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ width: "100%", height: "100%", backgroundColor: "#00000000" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">반갑습니다!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-dark">
                사용자의 이메일 주소를 입력해주세요
              </Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-dark">
                사용자의 비밀번호를 입력해주세요
              </Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbar;
