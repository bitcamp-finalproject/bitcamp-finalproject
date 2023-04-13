import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function Logout(props) {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();

  const handleClickLogout = () => {
    axios
      .get("http://223.130.129.169:8080/auth/logout")
      .then((response) => {
        setCurrentUser(null);
        navigate("/");
      })
      .catch((error) => {
        alert("로그아웃 중 오류 발생!");
      });
  };

  return (
    <>
      <Nav.Link>
        <div onClick={handleClickLogout}>Logout</div>
      </Nav.Link>
    </>
  );
}

export default Logout;
