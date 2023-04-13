import React, { useEffect, useState } from "react";
import styles from "./MemberList.module.css";
import Table from "react-bootstrap/Table";
import MemberView from "./MemberView";

function MemberList() {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedNo, setSelectedNo] = useState();

  useEffect(() => {
    fetch("http://223.130.129.169:8080/admin")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(data);

  function handleColumnSelect(selectedNo) {
    //const selectedColumn = data.filter((d) => d.no === selectedNo)[0];
    console.log("Selected number:", selectedNo);
    setSelectedNo(selectedNo);
    setModalShow(true);
  }

  return (
    <>
      <div className={styles.MemberList}>
        <h1>회원 관리</h1>
        <h3>회원 목록</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>회원번호</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>가입일</th>
              <th>포인트</th>
              <th>성별</th>
              <th>기본주소</th>
              <th>포인트</th>
              <th>전화번호</th>
              <th>비밀번호 변경일시</th>
              <th>계정상태</th>
              <th>권한레벨</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member) => (
              <tr key={member.no}>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.no}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.nickname}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.email}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.createdDate}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.point}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.gender}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.basicAddress}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.point}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.tel}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.passwordDate}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.accountState}
                </td>
                <td
                  className="td"
                  onClick={() => handleColumnSelect(member.no)}
                >
                  {member.authLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <MemberView
        show={modalShow}
        setShow={setModalShow}
        no={selectedNo}
        member={data}
      />
    </>
  );
}

export default MemberList;
