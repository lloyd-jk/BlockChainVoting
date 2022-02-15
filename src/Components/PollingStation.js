import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
// import LoadingCircles from "../assets/loadingcircles.svg";
import candidate from "../assets/Candidate.jpg";
import Voter from "./Voter";

const PollingStation = (props) => {
  return (
    // <div>HEllo</div>
    <div>
      <Row>
        <Col className="justify-content-center d-flex">
          <Voter image={candidate} name={"Arthur"} />
          <Voter image={candidate} name={"Russel"} />
          <Voter image={candidate} name={"Brian"} />
        </Col>
      </Row>
      <button class="custom-btn btn-1">
        <h5>Read More</h5>
      </button>
    </div>
  );
};

export default PollingStation;
