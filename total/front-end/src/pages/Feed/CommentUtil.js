import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedModal.css";
import Report from "./Report";

function CommentUtil(props) {
  const [data, setData] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [likeUpdate, setLikeUpdate] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function handleSubmit(event) {
    props.onUpdate();
  }

  useEffect(() => {
    axios
      .get("http://223.130.129.169:8080/reply/islike/" + props.commentNo)
      .then((response) => {
        if (response.data.data === "like") {
          setIsLike(true);
        } else {
          setIsLike(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLike = () => {
    setIsLike(!isLike);

    if (isLike) {
      axios
        .delete("http://223.130.129.169:8080/reply/like/" + props.commentNo)
        .then((response) => {
          console.log(response);
          setLikeUpdate(!likeUpdate);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(props.replyNo);
      axios
        .post(
          "http://223.130.129.169:8080/reply/like",
          {},
          {
            params: {
              replyNo: props.commentNo,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setLikeUpdate(!likeUpdate);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function CommentDel() {
    axios
      .delete(`http://223.130.129.169:8080/reply/delete/${props.commentNo}`)
      .then((response) => {
        if (response.data.status === "success") {
          handleSubmit();
        } else {
          alert("삭제실패");
        }
      })
      .catch((error) => {});
  }

  useEffect(() => {
    axios
      .get(`http://223.130.129.169:8080/reply/like/${props.commentNo}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [likeUpdate]);

  if (!Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div id="feed-modal-commentutil">
        <div id="feed-modal-commentlike">좋아요 {data[0]}개</div>
        <div
          id="feed-modal-replylike"
          style={{
            backgroundImage: isLike ? `url(/heart.png)` : `url(/unheart.png)`,
            backgroundSize: "cover",
          }}
          onClick={handleLike}
        ></div>
        {data[1] !== props.writerNo && (
          <div id="feed-modal-commentreport" onClick={openModal}>
            신고하기
          </div>
        )}
        {data[1] === props.writerNo && (
          <div id="feed-modal-commentdelete" onClick={CommentDel}>
            삭제하기
          </div>
        )}
      </div>
      {isModalOpen && (
        <Report
          commentNo={props.commentNo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export default CommentUtil;
