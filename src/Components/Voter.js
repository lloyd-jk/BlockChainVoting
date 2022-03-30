import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Voter = ({ image, name, branch, motto, votecount }) => {
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
          {window.accountId === "admin-sac.testnet" ? (
            <h4 className="text-center text-white">Votes: {votecount}</h4>
          ) : (
            // <div
            //   className="btn"
            //   style={{
            //     width: "150px",
            //     height: "70px",
            //     textAlign: "center",
            //     verticalAlign: "middle",
            //   }}
            // >
            //   <h5>{votecount}</h5>
            // </div>
            <Button bsPrefix="btn" disabled={window.accountId===''} style={{ width: "150px", height: "70px" }}>
              <h5>VOTE</h5>
            </Button>
          )}
        </Row>
      </div>
    </Col>
  );
};

export default Voter;
