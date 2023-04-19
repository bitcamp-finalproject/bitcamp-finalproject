import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedModal.css";
import CommentUtil from "./CommentUtil";
import LikeIcon from "../LikeIcon";
import SmallProfile from "../profile/SmallProfile";
import SmallProfileName from "../profile/SmallProfileName";
import FollowBtn from "../profile/FollowBtn";
import Report from "./Report";
import getTimeReply from "../../utils/DateReply";
import getTimeBoard from "../../utils/DateBoard";
import BoardUpdate from "./BoardUpdate";
import BoardDelete from "./BoardDelete";
import Money from "./Money";

function FeedModal(props) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false);
  const [point, setPoint] = useState();
  const [tag, setTag] = useState([]);

  function handleTagClick(e) {
    const keyword = e.target.getAttribute("value").replace("#", "");
    axios
      .post(
        "http://localhost:8080/boards/keyword",
        {},
        {
          params: {
            keyword: keyword,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          if (window.location.pathname === "/Feed") {
            window.location.reload();
          } else {
            // Navigate("/Feed");
            window.location.href = "/Feed";
          }
        } else {
          console.log("에러");
        }
      })
      .catch((error) => {});
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const UpdateModalHandler = () => {
    setisUpdateModalOpen(!isUpdateModalOpen);
  };

  const DeleteModalHandler = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const MoneyModalHandler = () => {
    setIsMoneyModalOpen(!isMoneyModalOpen);
  };

  const boardNo = props.data.boardNo;
  const writerNo = props.data.writer.no;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8080/reply",
        {},
        {
          params: {
            boardNo: boardNo,
            content: value,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setIsUpdated(!isUpdated);
          setValue("");
        } else {
          alert("입력실패");
        }
      })
      .catch((error) => {
        alert("로그인 후 입력가능합니다.");
      });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function handleUpdate() {
    setIsUpdated(!isUpdated);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reply/${boardNo}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [isUpdated]);

  axios.get("http://localhost:8080/point/board/" + boardNo).then((response) => {
    setPoint(response.data);
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/boards/tag/${boardNo}`)
      .then((response) => setTag(response.data))
      .catch((error) => console.log(error));
  }, []);

  const numberWithCommas = (number) => {
    // 천의 자리마다 , 찍기
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0";
  };

  if (!Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div id="feed-modal-image" style={{ display: "table" }}>
        <div
          id="feed-modal-pic"
          style={{
            backgroundImage: `url(${props.data.fileName})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div id="modal-like-icon">
            <LikeIcon size={30} contentType={"board"} contentNo={boardNo} />
          </div>
          <div
            id="modal-money-icon"
            style={{
              backgroundImage: `url(/money.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
            onClick={MoneyModalHandler}
          ></div>
          <div id="modal-money">{numberWithCommas(point)}</div>
          {props.user.data.no !== writerNo && isMoneyModalOpen && (
            <Money
              boardNo={boardNo}
              writerNo={writerNo}
              MoneyModalHandler={MoneyModalHandler}
            />
          )}
        </div>
      </div>
      <div id="feed-modal-content">
        <div id="feed-modal-profile">
          <SmallProfile
            modalClose={props.closeModal}
            no={props.data.writer.no}
            imgUrl={props.data.writer.profilePhoto}
            nickname={props.data.writer.nickname}
            height="50"
          />
          <div id="feed-modal-follow">
            <FollowBtn followerNo={props.data.writer.no} />
          </div>
        </div>
        <div id="feed-modal-originalcontent" key={props.data.originContent}>
          <p>{props.data.originContent}</p>
          <div id="feed-modal-day" key={props.data.writeDt}>
            {getTimeBoard(props.data.writeDt)}
          </div>
          <div id="feed-modal-tag">
            {tag.map((item) => (
              <div id="feed-modal-t" value={item.tag} onClick={handleTagClick}>
                {item.tag}
              </div>
            ))}
            {props.user.data.no !== writerNo && (
              <div id="feed-modal-boardreport" onClick={openModal}>
                신고하기
              </div>
            )}
            {props.user.data.no === writerNo && (
              <>
                <div id="feed-modal-boarddelete" onClick={DeleteModalHandler}>
                  삭제하기
                </div>
                <div id="feed-modal-boardupdate" onClick={UpdateModalHandler}>
                  수정하기
                </div>
              </>
            )}
          </div>
          {isUpdateModalOpen && (
            <BoardUpdate
              boardNo={boardNo}
              UpdateModalHandler={UpdateModalHandler}
              originContent={props.data.originContent}
              closeModal={props.closeModal}
            />
          )}
          {isDeleteModalOpen && (
            <BoardDelete
              boardNo={boardNo}
              reply={data}
              DeleteModalHandler={DeleteModalHandler}
              originContent={props.data.originContent}
              closeModal={props.closeModal}
            />
          )}
          {isModalOpen && (
            <Report boardNo={boardNo} handleCloseModal={handleCloseModal} />
          )}
        </div>
        <div id="feed-modal-commentinput">
          <form onSubmit={handleSubmit}>
            <input
              id="feed-modal-inputbox"
              type="text"
              name="content"
              value={value}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  setValue(event.target.value);
                }
              }}
            />
          </form>
        </div>
        <div id="feed-modal-comscroll">
          {data.map((item) => (
            <>
              <div id="feed-modal-comment">
                <div
                  id="feed-modal-commentpic"
                  style={{
                    backgroundImage: `url(${item.writer.profilePhoto})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div id="feed-modal-com">
                  <div id="feed-modal-commentwriter">
                    <div id="feed-modal-comwriter" key={item.writer.nickname}>
                      <SmallProfileName
                        no={item.writer.no}
                        nickname={item.writer.nickname}
                        modalClose={props.closeModal}
                      />
                    </div>
                    <div id="feed-modal-comdt" key={item.writeDt}>
                      {getTimeReply(item.writeDt)}
                    </div>
                  </div>
                  <div id="feed-modal-commentcontent" key={item.content}>
                    {item.content}
                    <CommentUtil
                      commentNo={item.replyNo}
                      writerNo={item.writer.no}
                      onUpdate={handleUpdate}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
          {data.length === 0 && (
            <div id="nocommnet">댓글이 없습니다. 첫 댓글을 작성해보세요 !</div>
          )}
        </div>
      </div>
    </>
  );
}

export default FeedModal;
