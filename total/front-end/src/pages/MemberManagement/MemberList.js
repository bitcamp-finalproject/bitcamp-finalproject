import React, { useEffect, useState } from "react";
import styles from "./MemberList.module.css";
//import data from "./data";

function MemberList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/member")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles.MemberList}>
      <h1>회원 관리</h1>
      <h3>회원 목록</h3>
      <table border="1">
        <thead>
          <tr>
            <th>회원번호</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>비밀번호</th>
            <th>가입일</th>
            <th>포인트</th>
            <th>비밀번호 변경일시</th>
            <th>계정상태</th>
            <th>권한레벨</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.no}>
              <td>{member.no}</td>
              <td>{member.nickname}</td>
              <td>{member.email}</td>
              <td>{member.password}</td>
              <td>{member.createdDate}</td>
              <td>{member.point}</td>
              <td>{member.passwordDate}</td>
              <td>{member.accountState}</td>
              <td>{member.authLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList;

/*
fetch("http://localhost:8080/member")
      .then((response) => response.json())
      .then((data) => setData(data));
    setData(data);
*/
