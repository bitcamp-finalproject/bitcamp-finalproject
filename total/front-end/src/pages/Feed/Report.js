import React, { useEffect, useState } from "react";
import axios from "axios";

function Report(props) {
  const [data, setData] = useState([]);
  const [reportNum, setReportNum] = useState();
  const [reportTitle, setReportTitle] = useState("");
  const [select, setSelect] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  function selected() {
    setSelect(!select);
  }

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    console.log(textareaValue);
  };

  useEffect(() => {
    axios
      .get(`http://223.130.129.169:8080/report`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://223.130.129.169:8080/report",
        {},
        {
          params: {
            boardNo: props.boardNo,
            replyNo: props.commentNo,
            reportNo: reportNum,
            content: textareaValue,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          alert("신고했습니다 !");
          props.handleCloseModal();
        } else {
          alert("신고 실패");
        }
      })
      .catch((error) => {
        alert("중복신고입니다");
      });
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
        onClick={props.handleCloseModal}
      ></div>
      <div id="report-main">
        <div id="report-title">
          <span id="report-close" onClick={props.handleCloseModal}>
            &times;
          </span>
          신고
        </div>
        <div id="report-contentbox">
          {!select && (
            <>
              {data.map((item) => (
                <div
                  id="report-menu"
                  key={item}
                  onClick={() => {
                    setReportNum(item.reportNo);
                    setReportTitle(item.reportType);
                    selected();
                  }}
                >
                  {item.reportType}
                  <div
                    id="report-menuicon"
                    style={{
                      backgroundImage: `url(/next.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              ))}
            </>
          )}
          {select && (
            <>
              <div id="report-menu" onClick={selected}>
                {reportTitle}
                <div
                  id="report-menuicon"
                  style={{
                    backgroundImage: `url(/next.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    transform: "rotate(180deg)",
                  }}
                ></div>
              </div>
              <div id="report-box">
                <div id="report-text">
                  <textarea
                    id="report-textarea"
                    name="content"
                    onChange={handleTextareaChange}
                  ></textarea>
                </div>
                <div id="report-btn" onClick={handleSubmit}>
                  제출
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Report;
