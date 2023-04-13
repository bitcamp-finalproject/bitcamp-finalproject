import axios from "axios";
import { useEffect, useState } from "react";

function Verify() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios("http://223.130.129.169:8080/auth/verify", {
      params: {
        token: token,
      },
    })
      .then((response) => {
        if (response.data.status === "success") {
          setMessage("메일 인증이 완료 되었습니다.");
        } else {
          setMessage("유효하지 않은 링크입니다.");
        }
      })
      .catch((error) => {
        setMessage("메일 인증 중 오류 발생!");
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    if (message) {
      alert(message);
      window.location.href = "../../";
    }
  }, [message]);

  return <></>;
}

export default Verify;
