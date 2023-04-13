// FaqType.js
import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

function FaqType({ onTypeSelected }) {
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://223.130.129.169:8080/faqType`)
      .then((response) => {
        setDbData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSelect(eventKey) {
    // console.log("EventKey:", eventKey);
    // console.log("DbData:", dbData);
    if (eventKey !== null && eventKey !== undefined) {
      const selectedFaqTypeNo = dbData[eventKey].faqTypeNo; // 수정된 부분
      onTypeSelected(selectedFaqTypeNo);
      // console.log("Selected FAQ Type No:", selectedFaqTypeNo);
    } else {
      // console.log("Invalid eventKey");
    }
  }

  return (
    <Accordion
      defaultActiveKey="0"
      flush
      onSelect={(eventKey) => handleSelect(eventKey)}
    >
      {dbData.map((data, index) => (
        <Accordion.Item
          style={{ backgroundColor: "transparent" }}
          key={index}
          eventKey={index.toString()}
        >
          <Accordion.Header>{data.faqType}</Accordion.Header>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FaqType;

// import React, { useState, useEffect } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import axios from "axios";

// function FaqType(props) {
//   const [dbData, setDbData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://223.130.129.169:8080/faqType`)
//       .then((response) => {
//         setDbData(response.data);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   if (dbData !== []) {
//     console.log(dbData);
//     return (
//       <Accordion defaultActiveKey="0" flush>
//         {dbData.map((data, index) => (
//           <Accordion.Item
//             style={{ backgroundColor: "transparent" }}
//             key={index}
//             eventKey={index.toString()}
//           >
//             <Accordion.Header>{data.faqType}</Accordion.Header>
//             {/* <Accordion.Body>{data.body}</Accordion.Body> */}
//           </Accordion.Item>
//         ))}
//       </Accordion>
//     );
//   }
// }

// export default FaqType;
