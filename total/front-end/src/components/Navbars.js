import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { Post, Searchs, DarkModeSwitch } from "./";
import { AuthBtn } from "./auth";
axios.defaults.withCredentials = true; // SpringBoot + axios 사용 관련 AuthController 에서 HttpSession 동일 객체 사용을 위한 설정

function Navbars(props) {
  let [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("http://223.130.129.169:8080/auth/user");
        if (result.data.status == "success") {
          setCurrentUser(result.data.data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        alert("현재 서버가 꺼져 있어 로그인 유저 정보를 가져올 수 없습니다.");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Artify</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/feed/">Feed</Nav.Link>
            <Nav.Link href="/faq/">FAQ</Nav.Link>
            <Searchs />
          </Nav>

          <Nav>
            <DarkModeSwitch />
            <AuthBtn
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              loginShow={props.loginShow}
              setLoginShow={props.setLoginShow}
              signupShow={props.signupShow}
              setSignupShow={props.setSignupShow}
              isLoginModal={props.isLoginModal}
              setIsLoginModal={props.setIsLoginModal}
              showExternalLogin={props.showExternalLogin}
              setShowExternalLogin={props.setShowExternalLogin}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
