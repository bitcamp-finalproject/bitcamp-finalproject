import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

function Searchs() {
  const [searchTerm, setSearchTerm] = useState("");
  // const Navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("검색어: ", searchTerm);
      axios
        .post(
          "http://223.130.129.169:8080/boards/keyword",
          {},
          {
            params: {
              keyword: searchTerm,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            if (window.location.pathname === "/Feed") {
              window.location.reload();
            } else {
              // Navigate("/Feed");
              window.location.href = "/Feed";
            }
          } else {
            console.log("에러");
          }
        })
        .catch((error) => {});
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2 bg-dark text-light"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}

export default Searchs;
