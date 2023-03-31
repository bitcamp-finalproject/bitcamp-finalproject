import React, { useEffect, useState } from "react";
import axios from "axios";
import Images from "./Images";
import ProfileUpper from "./ProfileUpper";
import ProfileUnder from "./ProfileUnder";

function Profile(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let memberNo = 5;
  if (props.memberNo != undefined) {
    memberNo = props.memberNo;
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/" + memberNo)
      .then((response) => {
        setData(response["data"]["data"]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ProfileUpper member={data["member"]} followings={data["followingList"]} followers={data["followerList"]} />
      <ProfileUnder boards={data["boards"]} />
      {/* <div id="body">
      <Images />
    </div> */}
    </>
  );
}

export default Profile;