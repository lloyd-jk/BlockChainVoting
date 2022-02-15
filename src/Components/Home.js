import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const Home = (props) => {
  const promptList = ["TAS", "Gen Sec"];
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Polls</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>
                  {" "}
                  <Button>Go to Poll</Button>
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
