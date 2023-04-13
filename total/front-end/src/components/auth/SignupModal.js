import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, InputGroup, Spinner } from "react-bootstrap";
import authBtnStyle from "./style";
import "./style.css";
import axios from "axios";
import ExternalLogin from "./ExternalLogin";
axios.defaults.withCredentials = true;

function SignupModal(props) {
  const [validEmail, setValidEmail] = useState(false);
  const [validNickname, setValidNickname] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef(null);

  const handleClose = () => {
    props.setSignupShow && props.setSignupShow(false); // AuthBtn.js 에서 상태 관리
    props.setShowExternalLogin && props.setShowExternalLogin(false);
  };

  function checkEmail() {
    const email = document.getElementsByName("email")[0].value;
    if (!email.includes("@")) {
      document.querySelector("#emailHelpBlock").innerText =
        "이메일 형식이 올바르지 않습니다.";
      setValidEmail(false);
      return;
    }

    axios
      .get("http://223.130.129.169:8080/auth/checkemail", {
        params: { email: email },
      })
      .then((response) => {
        if (response.data.status === "success") {
          document.querySelector("#emailHelpBlock").innerText =
            "이미 가입된 이메일입니다.";
          setValidEmail(false);
        } else {
          document.querySelector("#emailHelpBlock").innerText = "";
          //   "사용가능한 이메일입니다.";
          setValidEmail(true);
        }
      })
      .catch((error) => {
        alert("이메일 중복확인 중 오류 발생");
      });
  }

  function blurEmail() {
    if (validEmail) {
      document.querySelector("#emailHelpBlock").innerText = "";
    }
  }

  function checkNickname() {
    const nickname = document.getElementsByName("nickname")[0].value;
    const regex = new RegExp(/^[a-zA-z0-9가-힣-_.]+$/);

    if (regex.test(nickname) || nickname.length === 0) {
      nickname.length === 0 ? setValidNickname(false) : setValidNickname(true);
      document.querySelector("#nicknameHelpBlock").innerText = "";
    } else {
      document.querySelector("#nicknameHelpBlock").innerText =
        "특수문자는 - _ . 만 사용 가능합니다.";
      setValidNickname(false);
      return;
    }

    axios
      .get("http://223.130.129.169:8080/auth/checknickname", {
        params: { nickname: nickname },
      })
      .then((response) => {
        if (response.data.status === "success") {
          document.querySelector("#nicknameHelpBlock").innerText =
            "이미 사용중인 닉네임입니다.";
          setValidNickname(false);
        } else {
          document.querySelector("#nicknameHelpBlock").innerText = "";
          // "사용가능한 닉네임입니다.";
          setValidNickname(true);
        }
      })
      .catch((error) => {
        alert("닉네임 중복확인 중 오류 발생");
      });
  }

  function blurNickname() {
    if (validNickname) {
      document.querySelector("#nicknameHelpBlock").innerText = "";
    }
  }

  function checkPasswordChar(e) {
    const regex =
      /^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~`|}{[\]\\:';"<>,./?-]{10,}$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      document.querySelector("#passwordHelpBlock").innerText = "";
      setValidPassword(true);
    } else {
      document.querySelector("#passwordHelpBlock").innerText =
        "비밀번호는 영어, 숫자를 포함해 총 10글자 이상이어야 합니다.";
      setValidPassword(false);
    }
  }

  function checkBothPasswordSame(e) {
    const password = document.getElementsByName("password")[0].value;
    const passwordConfirm = e.target.value;

    if (password === passwordConfirm) {
      document.querySelector("#passwordConfirmHelpBlock").innerText = "";
      setValidConfirmPassword(true);
    } else {
      document.querySelector("#passwordConfirmHelpBlock").innerText =
        "비밀번호가 일치하지 않습니다.";
      setValidConfirmPassword(false);
    }
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmitSignup();
    }
  };

  function handleSubmitSignup() {
    const email = document.getElementsByName("email")[0].value;
    const nickname = document.getElementsByName("nickname")[0].value;
    const password = document.getElementsByName("password")[0].value;

    setMessage("인증 메일이 발송 되었습니다");
    handleClose();

    axios
      .post(
        "http://223.130.129.169:8080/auth/signup",
        {},
        {
          params: {
            email: email,
            nickname: nickname,
            password: password,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
        } else {
          console.log("가입 양식이 맞지 않음!");
        }
      })
      .catch((error) => {
        setMessage("회원가입 중 오류 발생");
      });
  }

  useEffect(() => {
    if (message) {
      handleClose();
      alert(message);
      window.location.reload();
    }
  }, [message]);

  const isDisabled = () => {
    return !(
      validEmail &&
      validNickname &&
      validPassword &&
      validConfirmPassword
    );
  };

  useEffect(() => {
    // 모달 열렸을 때 오토포커스 주기
    if (props.signupShow) {
      const emailInput = document.getElementsByName("email")[0];
      if (emailInput) {
        emailRef.current.focus();
      }
    }
  }, [props.signupShow]);

  const handleClickLogin = () => {
    handleClose();
    props.setLoginShow(true); // AuthBtn.js 에서 상태 관리
    props.setIsLoginModal(true);
  };

  return (
    <>
      <Modal
        show={props.signupShow}
        onHide={handleClose}
        centered
        style={{ width: "100%", height: "100%", backgroundColor: "#00000000" }}
        contentClassName="bg-dark"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Header
          style={{ borderBottom: "none" }}
          className="d-flex justify-content-center p-0 pt-2 pb-2"
        >
          <Modal.Title className="text-light">회원가입</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body className="p-5 pb-4 pt-4">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-light">이메일</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@naver.com"
                  className="bg-dark text-light"
                  onChange={checkEmail}
                  onBlur={blurEmail}
                  ref={emailRef}
                  autoComplete="username"
                />
              </InputGroup>
              <Form.Text id="emailHelpBlock"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="nickname">
              <Form.Label className="text-light">닉네임</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="nickname"
                  placeholder="nickname"
                  className="bg-dark text-light"
                  onChange={checkNickname}
                  onBlur={blurNickname}
                  autoComplete="username"
                />
              </InputGroup>
              <Form.Text id="nicknameHelpBlock"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-light">비밀번호</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={checkPasswordChar}
                className="bg-dark text-light"
                autoComplete="current-password"
              />
              <Form.Text id="passwordHelpBlock"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="text-light">비밀번호 확인</Form.Label>
              <Form.Control
                className="bg-dark text-light"
                type="password"
                name="passwordConfirm"
                onChange={checkBothPasswordSame}
                onKeyDown={handleEnter}
                autoComplete="current-password"
              />
              <Form.Text id="passwordConfirmHelpBlock"></Form.Text>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer
            style={{ borderTop: "none" }}
            className="d-flex flex-column justify-content-center pb-4 ps-5 pe-5"
          >
            <Button
              variant="primary"
              type="button"
              onClick={handleSubmitSignup}
              style={authBtnStyle}
              disabled={isDisabled()}
              className="mb-4"
            >
              회원가입
            </Button>

            <div>
              {props.showExternalLogin && (
                <ExternalLogin isLoginModal={props.isLoginModal} />
              )}
            </div>
            <div className="text-light mt-2 mb-2">
              <span>이미 계정이 있으신가요? </span>
              <span className="signup-modal-login" onClick={handleClickLogin}>
                로그인
              </span>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default SignupModal;
