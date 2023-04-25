import React, { useEffect, useState, useRef } from "react";
import styles from "./CommentList.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeedModal from "../Feed/FeedModal";

import NavBar from "./NavBar";

function CommentList(props) {
  const [data, setData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [selectedNo, setSelectedNo] = useState();
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const navigate = useNavigate();

  const feedModalData = useRef({});

  const feedModalUser = useRef({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/comment")
      .then((response) => {
        console.log("data : ");
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleBoardSelect(selectedNo) {
    console.log("Selected board:", selectedNo);
    setSelectedNo(selectedNo);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/board/${selectedNo}`
        );
        setBoardData(response.data);
        feedModalData.current = response.data;
        if (feedModalData.current) {
          openFeedModal(feedModalData.current);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  useEffect(() => {
    console.log(boardData);
  }, [boardData]);

  const openFeedModal = (boardData) => {
    setIsFeedModalOpen(true);
  };

  const closeFeedModal = () => {
    setIsFeedModalOpen(false);
  };

  return (
    <>
      <div className={styles.CommentList}>
        <h1>관리 페이지</h1>
        <NavBar />
        <Table
          striped
          bordered
          hover
          variant={props.isLightMode === true ? "light" : "dark"}
        >
          <thead>
            <tr>
              <th>댓글번호</th>
              <th>게시물번호</th>
              <th>닉네임</th>
              <th>내용</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {data.map((comment) => (
              <tr key={comment.replyNo}>
                <td onClick={() => handleBoardSelect(comment.boardNo)}>
                  {comment.replyNo}
                </td>
                <td onClick={() => handleBoardSelect(comment.boardNo)}>
                  {comment.boardNo}
                </td>
                <td onClick={() => handleBoardSelect(comment.boardNo)}>
                  {comment.writer.nickname}
                </td>
                <td onClick={() => handleBoardSelect(comment.boardNo)}>
                  {comment.content}
                </td>
                <td onClick={() => handleBoardSelect(comment.boardNo)}>
                  {comment.writeDt}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {isFeedModalOpen && (
        <div>
          <div
            id="modal-background"
            onClick={() => {
              closeFeedModal();
            }}
          ></div>
          <div
            id="feed-modal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div
              id="feed-close"
              onClick={() => {
                closeFeedModal();
              }}
              className={`btn-close btn-close-${
                localStorage.getItem("isLightMode") === "true"
                  ? "dark"
                  : "white"
              }`}
            ></div>

            <FeedModal
              key={feedModalData.current}
              data={feedModalData.current}
              closeModal={closeFeedModal}
              user={feedModalUser.current}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CommentList;
