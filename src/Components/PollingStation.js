import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
// import LoadingCircles from "../assets/loadingcircles.svg";
import candidate from "../assets/Candidate.jpg";
import Voter from "./Voter";
import Musk from "../assets/Musk.jfif";
import Pichai from "../assets/Pichai.jpg";
import Jack from "../assets/Jack.jpg";

const PollingStation = (props) => {
  return (
    // <div>HEllo</div>
    <div>
      <Row style={{ marginTop: "2vh", justifyContent: "center" }}>
        <h2 className="text-center text-black">Position: General Secretary</h2>
      </Row>
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
            motto={"Ready for change, ready to lead."}
          />
          <Voter
            image={Jack}
            name={"Jack Patrick Dorsey"}
            branch={"Computer Science Engineering"}
            motto={"Working for Change, Working for You."}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PollingStation;
