import React from "react";
import { Container, Table, Button, Tab } from "react-bootstrap";
import PollingStation from "./PollingStation";

const Home = (props) => {
  const list_of_polls = [
    "General Secretary 2022",
    "Technical Affairs Secreatary",
    "Cultural Affairs Secretary",
    "Sports Secretary",
  ];
  return (
    <Container>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr style={{ fontSize: "20px" }}>
            <th className="text-center">S. No </th>
            <th className="text-center">List of Ongoing Polls</th>
            <th className="text-center">Vote for a Canditate</th>
          </tr>
        </thead>
        <tbody>
          {list_of_polls.map((poll, index) => {
            return (
              <tr
                key={index}
                style={{
                  fontSize: "18px",
                }}
              >
                <td
                  className="text-center"
                  style={{ paddingTop: "15px", paddingBottom: "10px" }}
                >
                  {index + 1}
                </td>
                <td
                  className="text-center"
                  style={{ paddingTop: "15px", paddingBottom: "10px" }}
                >
                  {poll}
                </td>
                <td
                  className="text-center"
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "10px",
                    color: "black",
                  }}
                >
                  <Button
                    // variant="success"
                    className="btn btn-info"
                    href="/PollingStation"
                  >
                    Vote Now!
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
