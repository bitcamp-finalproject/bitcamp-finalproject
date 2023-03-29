import React, { useEffect, useState } from "react";
import "./Feed.css";
import axios from "axios";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>모달창 열기</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>모달창 내용</h2>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

function isScrolledToBottom() {
  return (
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
  );
}

function Tagbar() {
  return (
    <div id="tag-bar">
      <div id="tag">
        HOT
        <div
          id="tag-image"
          style={{
            backgroundImage: `url(/campfire.png)`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div id="tag">Animal</div>
      <div id="tag">Anime</div>
      <div id="tag">Fashion</div>
      <div id="tag">Food</div>
      <div id="tag">Landscapes</div>
      <div id="tag">Sci-Fi</div>
    </div>
  );
}

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (isScrolledToBottom()) {
        loadData();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  async function loadData() {
    const response = await axios.get("http://localhost:8080/api/boards", {
      params: {
        page: data.length / 10,
      },
    });
    setData((prevData) => [...prevData, ...response.data]);
  }

  return (
    <div id="feed-main">
      {data.map((item) => (
        <div
          id="feed-list"
          className="feed-list"
          key={item.fileName}
          style={{
            backgroundImage: `url(${item.fileName})`,
            backgroundSize: "cover",
          }}
        >
          <div id="feed-writer" className="feed-item">
            <div
              id="feed-writer-pic"
              style={{
                backgroundImage: `url(/logo512.png)`,
                backgroundSize: "cover",
              }}
            ></div>
            <div id="feed-writer-name">
              <p id="feed-small-font" key={item.writerName}>
                {item.writerName}
              </p>
            </div>
          </div>
          <div id="feed-like" className="feed-item">
            <div id="feed-like-cnt">
              <p id="feed-small-font-right" key={item.likeCnt}>
                {item.likeCnt}
              </p>
            </div>
            <div
              id="feed-like-icon"
              style={{
                backgroundImage: `url(/heart.png)`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div id="feed-content" className="feed-item">
            <p id="feed-small-font" key={item.originContent}>
              {item.originContent}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Feed() {
  return (
    <div id="feed-body">
      <Tagbar />
      <div id="feed-body-sub">
        <List />
      </div>
    </div>
  );
}

export default Feed;
