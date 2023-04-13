import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProfileUpper from "./ProfileUpper";
import ProfileUnder from "./ProfileUnder";

function Profile() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  let no = location.state ? location.state.no : -1;

  useEffect(() => {
    axios
      .get("http://223.130.129.169:8080/member/" + no)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [no]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // 이 각 데이터를 던져주는 부분을 각각 요청해서 받아오게 해야할듯
  return (
    <div style={{ height: "83vh" }}>
      <ProfileUpper
        member={data["member"]}
        // followings={data["followingList"]}
        followers={data["followerList"]}
        followingCnt={data["followingCount"]}
        followerCnt={data["followerCount"]}
      />
      <ProfileUnder boards={data["boards"]} />
    </div>
  );
}

export default Profile;
