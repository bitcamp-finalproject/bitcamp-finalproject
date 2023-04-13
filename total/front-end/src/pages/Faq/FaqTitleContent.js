import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

function FaqTitleContent({ selectedType }) {
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    if (selectedType) {
      axios
        .get(
          `http://223.130.129.169:8080/faqTitleContent?faq_type_no=${selectedType}`
        )
        .then((response) => {
          // console.log(response.data);
          setDbData(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedType]);

  if (dbData.length === 0) {
    // return <div>No data</div>;
  }

  return (
    <Accordion
      style={{
        width: "100%",
        color: "white",
        backgroundColor: "transparent",
      }}
      defaultActiveKey="0"
      flush
    >
      {dbData.map((data, index) => (
        <Accordion.Item
          style={{
            color: "white",
            backgroundColor: "transparent",
          }}
          key={index}
          eventKey={index.toString()}
        >
          <Accordion.Header>{data.title}</Accordion.Header>
          <Accordion.Body dangerouslySetInnerHTML={{ __html: data.content }} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FaqTitleContent;

// useEffect(() => {
//   if (selectedType) {
//     axios
//       .get(`http://223.130.129.169:8080/faqTitleContent`, {
//         params: { faq_type_no: selectedType },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setDbData(response.data);
//       })
//       .catch((error) => console.log(error));
//   }
// }, [selectedType]);
