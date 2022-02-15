import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Voter = ({ image, name }) => {
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ marginTop: "5vh", backgroundColor: "#000001" }}>
        <Row style={{ marginTop: "5vh" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                height: "35vh",
                width: "400px",
              }}
              src={image}
            ></img>
          </div>
        </Row>
        <Row style={{ marginTop: "2vh", justifyContent: "center" }}>
          <h3 className="text-center text-white">{name}</h3>
        </Row>
        <Row
          style={{
            marginTop: "2vh",
            paddingBottom: "5vh",
            justifyContent: "center",
          }}
        >
          <Button style={{ width: "150px", height: "70px" }}>
            <h5>VOTE</h5>
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default Voter;
