import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedList from "./FeedList";

function List(props) {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);

  function isScrolledToBottom() {
    return (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    );
  }

  useEffect(() => {
    axios
      .get(`http://223.130.129.169:8080/boards/auth`)
      .then((response) => setAuth(response.data))
      .catch((error) => console.log(error));
  }, []);

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
    const response = await axios.get("http://223.130.129.169:8080/boards", {
      params: {
        page: data.length / 10,
      },
    });
    setData((prevData) => [...prevData, ...response.data]);
  }

  return (
    <div id="feed-main">
      {data.map((item) => (
        <FeedList
          item={item}
          auth={auth}
          loginShow={props.loginShow}
          setLoginShow={props.setLoginShow}
          signupShow={props.signupShow}
          setSignupShow={props.setSignupShow}
          isLoginModal={props.isLoginModal}
          setIsLoginModal={props.setIsLoginModal}
          showExternalLogin={props.showExternalLogin}
          setShowExternalLogin={props.setShowExternalLogin}
        />
      ))}
    </div>
  );
}

export default List;
