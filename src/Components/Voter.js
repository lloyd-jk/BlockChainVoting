import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "./Spinner";

const Voter = ({
  index,
  pollName,
  image,
  name,
  branch,
  motto,
  votecount,
  isLoading,
  buttonState,
  setbuttonState,
  viewCount,
}) => {
  const user = window.accountId;
  const addVote = async () => {
    isLoading(true);
    // console.log(user);
    await window.contract.addVote({
      post: pollName,
      index: index,
    });

    await window.contract.recordUser({
      post: pollName,
      user: user,
    });
    console.log("Succesfully voted.");
    setbuttonState(true);
    isLoading(false);
  };

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
          {viewCount === "true" ? (
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
            <Button
              onClick={addVote}
              bsPrefix="btn"
              disabled={buttonState}
              style={{ width: "150px", height: "70px" }}
            >
              <h5>VOTE</h5>
            </Button>
          )}
        </Row>
      </div>
    </Col>
  );
};

export default Voter;
