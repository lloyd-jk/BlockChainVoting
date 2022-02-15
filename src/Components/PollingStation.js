import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
// import LoadingCircles from "../assets/loadingcircles.svg";
import candidate from "../assets/Candidate.jpg";
import Voter from "./Voter";
import Musk from "../assets/Musk.jfif";
import Pichai from "../assets/Pichai.jpg";
import Lloyd from "../assets/Lloyd.jpeg";

const PollingStation = (props) => {
  return (
    // <div>HEllo</div>
    <div style={{ borderRadius: "100px" }}>
      <Row>
        <Col className="justify-content-center d-flex">
          <Voter
            image={Musk}
            name={"Elon Reeve Musk"}
            branch={"Production Engineering"}
            motto={"Reform, prosperity and peace."}
          />
          <Voter
            image={Pichai}
            name={"Pichai Sundararajan"}
            branch={"Metallurgical Engineering"}
            motto={"Vote me or I'll expose the data."}
          />
          <Voter
            image={Lloyd}
            name={"Lloyd J K"}
            branch={"Computer Science and Engineering"}
            motto={"Working for Change, Working for You."}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PollingStation;
