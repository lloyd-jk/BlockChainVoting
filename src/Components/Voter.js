import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Voter = ({ image, name, branch, motto }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          marginTop: "5vh",
          backgroundColor: "#000001",
          borderRadius: "10px",
        }}
      >
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
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                objectFit: "cover",
              }}
              src={image}
            ></img>
          </div>
        </Row>
        <Row style={{ marginTop: "2vh", justifyContent: "center" }}>
          <h3 className="text-center text-white">{name}</h3>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <h5 className="text-center text-white">{branch}</h5>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <p className="text-center text-white">
            <em>{motto}</em>
          </p>
        </Row>
        {/* <Row style={{ justifyContent: "center" }}>
          <p className="text-center text-white">
            <a href="url">Manifesto</a>
          </p>
        </Row> */}
        <Row
          style={{
            marginTop: "2vh",
            paddingBottom: "5vh",
            justifyContent: "center",
          }}
        >
          <Button bsPrefix="btn" style={{ width: "150px", height: "70px" }}>
            <h5>VOTE</h5>
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default Voter;
