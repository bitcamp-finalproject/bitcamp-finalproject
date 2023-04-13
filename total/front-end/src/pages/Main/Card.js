import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import axios from "axios";

function Card() {
  // 각각의 상태변수는 빈 배열[]로 초기화
  // useState는 배열 형태로 두 개의 값 반환
  // const [현재 상태, 상태 값을 변경하는 함수]
  const [no, setNo] = useState([]);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://223.130.129.169:8080/boards");
        setImage(response.data);
        setContent(response.data.contents);
        // console.log(image);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const randomImage = image[Math.floor(Math.random() * image.length)];
  // image 배열에서 랜덤한 인덱스를 가진 이미지를 선택하여 저장
  // Math.random() 함수를 사용하여 0이상 1미만의 난수를 생성하고
  // Math.floor() 함수를 사용하여 이를 소수점 이하를 버린 0이상 image.length-1 이하의 정수로 변환
  // 이렇게 얻은 정수를 image 배열의 인덱스로 사용하여 해당 이미지 선택

  // Math.random() 함수를 이용하여 0부터 배열의 길이 -1까지 랜덤한 정수를 구하고,
  // 해당 인덱스의 이미지 선택
  // 또한 이미지가 선택되었을 때만 해당 이미지를 렌더링하도록 함

  return (
    <div className={styles.total}>
      <div className={styles.container}>
        {randomImage && (
          <div className={styles.card}>
            <img src={randomImage.fileName} />
            <div className={styles.intro}>
              {/* <p>{randomImage.content}</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
