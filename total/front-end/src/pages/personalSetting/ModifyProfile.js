import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ImageResizer from "react-image-file-resizer";
import SettingInput from "./SettingInput";

function ModifyProfile(props) {
  const [memberData, setMemberData] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [condition, setCondition] = useState(true);

  const divStyle = {
    width: "300px",
    height: "300px",
    backgroundColor: "white",
    position: "relative",
    cursor: "pointer",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {
    axios.get("http://223.130.129.169:8080/auth/user").then((response) => {
      console.log(response);
      setMemberData(response.data.data);
      setImageUrl(response.data.data.profilePhoto);
      setGender(response.data.data.gender);
      setBirthdate(response.data.data.birthDate);
      setPhone(response.data.data.tel);
      setAddress(response.data.data.basicAddress);
    });
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePhoto", file);

    if (file) {
      ImageResizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri) => {
          setImageUrl(uri);
        },
        "base64"
      );
      try {
        const response = await axios.put(
          "http://223.130.129.169:8080/member/upload/profileImg/" +
            memberData.no,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      id="setting-feild"
      style={{ width: "100%", height: "90%", color: "white" }}
    >
      <div
        style={{
          width: "250px",
          marginLeft: "5%",
          marginTop: "5%",
          marginBottom: "3%",
          boxSizing: "border-box",
          borderBottom: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        {props.title}
      </div>

      <div
        style={{
          width: "90%",
          height: "90%",
          display: "flex",
          marginLeft: "5%",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "90%",
            marginTop: "5%",
            display: "flex",
            flexDirection: "column",
            minWidth: "400px",
          }}
        >
          <div
            style={divStyle}
            onClick={() => {
              document.querySelector("input[type=file]#profile-photo").click();
            }}
          >
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              name="profilePhoto"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>
          <div>{memberData.nickname}</div>
          <div>{memberData.email}</div>
        </div>
        <div
          style={{
            width: "60%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            minWidth: "500px",
          }}
        >
          <SettingInput
            title={"비밀번호 수정"}
            placeholder={"******"}
            value={password}
            setValue={setPassword}
            type={"password"}
          />
          <SettingInput
            title={"비밀번호 확인"}
            placeholder={"******"}
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            type={"password"}
            setCondition={setCondition}
            check={(value) => {
              if (value === password) {
                setCondition(true);
                return true;
              }
              setCondition(false);
              return false;
            }}
            comment={"비밀번호가 다릅니다."}
          />
          <SettingInput
            title={"성별"}
            placeholder={"radio로?"}
            value={gender}
            setValue={setGender}
            check={() => {
              return true;
            }}
            comment={""}
          />
          <SettingInput
            title={"생년월일"}
            placeholder={"ex) 990101"}
            value={birthdate}
            setValue={setBirthdate}
            check={(value) => {
              const regex = /^\d{6}$/;
              if (regex.test(value)) {
                setCondition(true);
                return true;
              }
              setCondition(false);
              return false;
            }}
            comment={"6자리 숫자 입력 ex) 990101"}
            setCondition={setCondition}
          />
          <SettingInput
            title={"전화번호"}
            placeholder={"010-1234-5678"}
            value={phone}
            setValue={setPhone}
            check={() => {
              return true;
            }}
            comment={""}
          />
          <SettingInput
            title={"주소"}
            placeholder={"서울특별시 강남구"}
            value={address}
            setValue={setAddress}
            check={() => {
              return true;
            }}
            comment={""}
          />

          <div
            style={{}}
            onClick={() => {
              if (password !== passwordConfirm) {
                alert("비밀번호 확인");
                return;
              }
              if (!condition) {
                alert("뭔가 잘못됨");
                return;
              }

              Swal.fire({
                title: "수정하시겠습니까?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "수정",
                cancelButtonText: "취소", //취소하면 초기값으로?
              }).then((result) => {
                if (result.isConfirmed) {
                  // 확인 버튼을 클릭하면 아래 코드 실행
                  axios.put("http://223.130.129.169:8080/member", {
                    password: password,
                    gender: gender,
                    birthDate: birthdate,
                    tel: phone,
                    basicAddress: address,
                  });
                }
              });
            }}
          >
            {" "}
            제출버튼예정
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyProfile;
