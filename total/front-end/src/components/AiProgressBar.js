import React, { useEffect } from "react";

function AiProgressBar() {
  useEffect(() => {
    const socket = new WebSocket("ws://223.130.129.169:8085/progress");

    socket.onmessage = (event) => {
      handleProgressMessage(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleProgressMessage = (message) => {
    const progressRegex = /(\d+\/25)/;
    const matches = message.match(progressRegex);

    if (matches && matches.length > 0) {
      const progress = matches[0];
      const currentProgress = parseInt(progress.split("/")[0]);
      const percentage = (currentProgress / 25) * 100;
      // updateProgressBar(percentage);
      updateProgressBar(message);
    }
  };

  const updateProgressBar = (percentage) => {
    // 진행 표시줄 요소를 새 퍼센트 값으로 업데이트합니다.
    // console.log("Progress: " + percentage + "%");
    console.log(percentage);
  };

  return <></>;
}

export default AiProgressBar;
