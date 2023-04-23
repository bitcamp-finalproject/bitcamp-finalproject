import React from "react";
import styles from "./Video.module.css";

function Video(props) {
  const handleShowLogin = (e) => {
    e.preventDefault();
    props.setLoginShow(true);
  };

  return (
    <div className={styles.frame}>
      <video className={styles.video} autoPlay muted loop>
        <source src="video.mp4" type="video/mp4" />
      </video>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          <span className={styles.span}>Artify</span>
          <br />
          AI가 그려주는 그림
        </h1>
        <p className={styles.p}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        {/* <a
          href="/"
          className={`${styles.button} button`}
          onClick={handleShowLogin}
        >
          Try Artify
        </a> */}
      </div>
    </div>
  );
}

export default Video;
