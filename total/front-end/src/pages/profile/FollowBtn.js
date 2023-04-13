import React, { useState, useEffect } from "react";
import axios from "axios";

function FollowBtn(props) {
  const [followState, setfollowState] = useState(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://223.130.129.169:8080/follow/check/" + props.followerNo)
      .then((response) => {
        if (response.data.data === "follow") {
          setfollowState(true);
        } else {
          setfollowState(false);
        }
        if (response.data.data === "own") {
          setIsShow(false);
        } else {
          setIsShow(true);
        }
      });
  }, [props.followerNo]);

  const handleFollow = () => {
    setfollowState(!followState);

    if (followState) {
      axios.delete("http://223.130.129.169:8080/follow/" + props.followerNo);
    } else {
      axios.post("http://223.130.129.169:8080/follow", {
        followingNo: props.followingNo,
        followerNo: props.followerNo,
      });
    }
  };

  return (
    <>
      {isShow && (
        <div
          style={{
            flexShrink: "0",
            width: "100px",
            height: "30px",
            backgroundColor: followState ? "#6d3fcf" : "white",
            Color: followState ? "white" : "black",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "30px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleFollow}
        >
          {followState ? "Unfollow" : "Follow"}
        </div>
      )}
    </>
  );
}

export default FollowBtn;
