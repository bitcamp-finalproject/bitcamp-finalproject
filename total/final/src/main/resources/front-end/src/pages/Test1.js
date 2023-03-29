import "./Test1.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Test1() {

  const [hello, setHello] = useState("");
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/" + 5)
      .then(function(response) {
        setHello(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);  
  return (
    
    <div className="Test1 row">
    <div className="col"><div className="test-image"></div></div>
    <div className="col"><div className="test-name"><span>{hello.name}</span></div></div>
    <div className="col">1</div>
    <div className="col">1</div>
    <div className="col">1</div>
    <div className="col">1</div>  
    <div className="col">1</div>
    </div>

  );
}

export default Test1;