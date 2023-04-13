import React, { useState, useEffect } from "react";
import axios from "axios";

import "./ProfileUpper.css";
import FollowBtn from "./FollowBtn";
import FollowListModal from "./FollowListModal";
import PointModal from "./PointModal";

function ProfileUpper(props) {
  const { followingCnt, followerCnt, likeCnt } = props;
  const [followingList, setFollowingList] = useState([]);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [pointModal, setPointModal] = useState(false);
  const [point, setPoint] = useState();
  const [user, setUser] = useState();
  const openFollowingModal = () => {
    axios
      .get("http://localhost:8080/follow/" + props.member.no)
      .then((response) => {
        setFollowingList(response.data.data);
        if (response.data.data.length > 0) {
          setFollowingModalIsOpen(true);
        }
      });
  };
  const closeFollowingModal = () => {
    setFollowingModalIsOpen(false);
  };

  const [followerModalIsOpen, setFollowerModalIsOpen] = useState(false);
  const openFollowerModal = () => {
    setFollowerModalIsOpen(true);
  };
  const closeFollowerModal = () => {
    setFollowerModalIsOpen(false);
  };

  useEffect(() => {
    if (props.directModal !== undefined) {
      setFollowerModalIsOpen(true);
    }
  }, [props.directModal]);

  const pointModalHandler = () => {
    setPointModal(!pointModal);
  };
  const count = 100;

  axios
    .get("http://localhost:8080/point/member/" + props.member.no)
    .then((response) => {
      setPoint(response.data);
    });

  const numberWithCommas = (number) => {
    // 천의 자리마다 , 찍기
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/auth/user`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div id="profileUpper">
        <div
          className="profile-image"
          style={{
            width: "100px",
            height: "100px",
            backgroundImage: `url(${props.member.profilePhoto})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="profile-info">
          <div className="profile-name">{props.member.nickname}</div>
          <div className="profile-detail">
            <div onClick={openFollowingModal} id="profile-menu">
              <span>{followingCnt}</span> followings
            </div>
            <div onClick={openFollowerModal} id="profile-menu">
              <span>{followerCnt}</span> followers
            </div>
            <div>
              <span>{likeCnt}</span> likes
            </div>
            {user?.data.no === props.member.no && (
              <div onClick={pointModalHandler} id="profile-menu">
                <span>{numberWithCommas(point)}</span>
                <span></span> point
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            paddingTop: "35px",
          }}
        >
          <FollowBtn followerNo={props.member.no} />
        </div>
      </div>
      <FollowListModal
        isOpen={followingModalIsOpen}
        onRequestClose={closeFollowingModal}
        follows={followingList}
      />
      <FollowListModal
        isOpen={followerModalIsOpen}
        onRequestClose={closeFollowerModal}
        follows={props.followers}
      />
      <PointModal
        isOpen={pointModal}
        onRequestClose={pointModalHandler}
        memberNo={props.member.no}
        totalpoint={point}
      />
    </>
  );
}

export default ProfileUpper;
