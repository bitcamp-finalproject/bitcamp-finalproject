import React, { useState, useEffect } from "react";
import { SignupBtn, Login, Logout, AuthModal } from "../auth";
import { Nav } from "react-bootstrap";
import { BellFill } from "react-bootstrap-icons";
import axios from "axios";
import AlarmModal from "../AlarmModal";
axios.defaults.withCredentials = true;

function AuthBtn(props) {
  const [show, setShow] = useState(false);
  const { currentUser, setCurrentUser } = props;
  const [loginShow, setLoginShow] = useState(false);

  const handleShow = () => setLoginShow(true);
  const handleClose = () => setLoginShow(false);

  const [alarms, setAlarms] = useState(null);
  const [alarmShow, setAlarmShow] = useState(false);
  const [alarmClickEvent, setAlarmClickEvent] = useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      const fetchData = async () => {
        axios(`http://localhost:8080/alarm/${currentUser.no}`) //
          .then((response) => {
            if (response.data.status === "success") {
              setAlarms(response.data.data);
            } else {
              console.log("failure 발생");
            }
          })
          .catch((error) => {
            alert("alarm 가져오는 중 오류 발생!");
          });
      };

      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (alarms !== null && alarms.length > 0) {
      document.querySelector("#auth-has-alarm").style.visibility = "visible";
    }
  }, [alarms]);

  const handleClickUser = () => {
    setShow(true);
  };

  const handleClickBell = (e) => {
    e.preventDefault();
    setAlarmShow(true);
    setAlarmClickEvent(e);

    return <></>;
  };

  return (
    <>
      {currentUser ? (
        <>
          <a
            href=""
            className="d-flex align-items-center"
            onClick={handleClickBell}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              id="auth-has-alarm"
              style={{
                width: "11px",
                height: "11px",
                backgroundColor: "red",
                borderRadius: "50%",
                position: "relative",
                left: "23px",
                bottom: "8px",
                visibility: "hidden",
                color: "#FFFFFF",
                fontSize: "9px",
              }}
            ></div>
            <BellFill size="1.4rem" className="text-light" />
          </a>
          <Nav.Link
            onClick={handleClickUser}
            style={{ padding: "0" }}
            className="d-flex"
          >
            <div
              className="ms-3 me-3 d-flex align-items-center"
              style={{ display: "inline-block" }}
            >
              {currentUser.nickname}
            </div>
            <div
              key={currentUser.profilePhoto}
              style={{
                backgroundImage: `url(${currentUser.profilePhoto})`,
                backgroundSize: "cover",
                width: "40px",
                height: "40px",
                display: "inline-block",
                borderRadius: "50%",
              }}
            />
          </Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link>
            <SignupBtn />
          </Nav.Link>
          <Nav.Link>
            <div onClick={handleShow}>Login</div>
            {loginShow && (
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Nav.Link>
        </>
      )}

      <AuthModal
        show={show}
        setShow={setShow}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <AlarmModal
        alarms={alarms}
        setAlarms={setAlarms}
        alarmShow={alarmShow}
        setAlarmShow={setAlarmShow}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        alarmClickEvent={alarmClickEvent}
        setAlarmClickEvent={setAlarmClickEvent}
      />
    </>
  );
}

export default AuthBtn;
