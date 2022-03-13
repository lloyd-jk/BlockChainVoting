import React from "react";
import { Row } from "react-bootstrap";
import Voter from "./Voter";
import Musk from "../assets/Musk.jfif";
import Pichai from "../assets/Pichai.jpg";
import Jack from "../assets/Jack.jpg";

const PollingStation = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <h2 className="text-center text-black">Position: General Secretary</h2>
      </Row>
      <Row className="justify-content-center">
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
      </Row>
    </div>
  );
};

export default PollingStation;
