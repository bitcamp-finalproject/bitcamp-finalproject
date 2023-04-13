import React, { useEffect, useState } from "react";
import axios from "axios";

function Money(props) {
  const [textValue, setTextValue] = useState("");
  const [mypoint, setMyPoint] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const handleTextChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      // 입력 값이 숫자인 경우
      if (parseInt(value) > parseInt(mypoint)) {
        setTextValue(mypoint.toString());
      } else {
        setTextValue(value);
      }
    } else {
      // 입력 값이 숫자가 아닌 경우
      setTextValue("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://223.130.129.169:8080/point",
        {},
        {
          params: {
            boardNo: props.boardNo,
            getMemberNo: props.writerNo,
            point: textValue,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          props.MoneyModalHandler();
          setIsUpdated(!isUpdated);
          setTextValue("");
        } else {
          alert("입력실패");
        }
      })
      .catch((error) => {
        alert("로그인 후 입력가능합니다.");
      });
  };

  useEffect(() => {
    axios.get("http://223.130.129.169:8080/point/member").then((response) => {
      setMyPoint(response.data);
    });
  }, [isUpdated]);

  const numberWithCommas = (number) => {
    // 천의 자리마다 , 찍기
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0";
  };

  return (
    <>
      <div
        id="modal-background"
        style={{
          opacity: 0.3,
          backgroundColor: "black",
          pointerEvents: "all",
          cursor: "Default",
        }}
        onClick={props.MoneyModalHandler}
      ></div>
      <div id="money-main">
        <div id="report-title">
          <span id="report-close" onClick={props.MoneyModalHandler}>
            &times;
          </span>
          기부 하기
        </div>
        <div id="report-contentbox">
          <div id="menu-box">
            <input
              id="feed-modal-moneyinput"
              type="text"
              value={textValue}
              onChange={handleTextChange}
            ></input>
            <div id="feed-money-credit">
              보유 포인트: {numberWithCommas(mypoint)}
            </div>
            <div id="btn-div">
              <div id="money-btn" onClick={handleSubmit}>
                기부
              </div>
              <div id="money-btn2" onClick={props.MoneyModalHandler}>
                취소
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Money;
