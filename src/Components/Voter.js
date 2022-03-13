import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Voter = ({ image, name, branch, motto }) => {
  return (
    <Col lg={4} md={6} sm={8}>
      <div
        className="mt-4"
        style={{
          backgroundColor: "#000001",
          borderRadius: "3%",
        }}
      >
        <Row>
          <img
            style={{
              height: "40vh",
              borderTopLeftRadius: "5%",
              borderTopRightRadius: "5%",
              objectFit: "cover",
            }}
            src={image}
          ></img>
        </Row>
        <Row style={{ marginTop: "2vh" }}>
          <h3 className="text-center text-white">{name}</h3>
        </Row>
        <Row>
          <h5 className="text-center text-white">{branch}</h5>
        </Row>
        <Row>
          <p className="text-center text-white">
            <em>{motto}</em>
          </p>
        </Row>
        <Row className="justify-content-center mt-4  pb-5">
          <Button bsPrefix="btn" style={{ width: "150px", height: "70px" }}>
            <h5>VOTE</h5>
          </Button>
        </Row>
      </div>
    </Col>
  );
};

export default Voter;
