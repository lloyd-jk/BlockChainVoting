import React, { useEffect, useState } from "react";
import { Container, Table, Tab } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Home = (props) => {
  const [end_poll_status, changeStatus] = useState([]);
  const [list_of_polls, changePolls] = useState([]);

  const endAPoll = async () => {
    await window.contract.deactivatePoll({ post: poll });
    let btn_status = [];
    for (let i = 0; i < x.length; i++) {
      btn_status[i] = await window.contract.isPollActive({ post: x[i] });
      btn_status[i] = btn_status[i].toString();
    }
    changeStatus(btn_status);
  };

  useEffect(() => {
    const getPolls = async () => {
      const x = await window.contract.getAllPosts();
      // list_of_polls_test=x
      changePolls(x);
      console.log(x);
      // console.log(arr)
      let btn_status = [];
      for (let i = 0; i < x.length; i++) {
        btn_status[i] = await window.contract.isPollActive({ post: x[i] });
        btn_status[i] = btn_status[i].toString();
      }
      changeStatus(btn_status);

      // let btn_status = [];

      // for (let i = 0; i < x.length; i++) {
      //   btn_status[i] = await window.contract.isPollActive({ post: x[i] });
      //   changeStatus(btn_status);
      // }
    };

    getPolls();
    // btnStatus();
  }, []);

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
                  <div>
                    {window.accountId === "admin-sac.testnet" ? (
                      <div>
                        <Button
                          variant="info"
                          style={{ marginRight: "20px" }}
                          onClick={() => props.viewPoll(poll)}
                        >
                          View Poll
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={end_poll_status[index] === "true"}
                          // onClick={async() => await window.contract.deactivatePoll({post: poll})}
                        >
                          End the Poll
                        </Button>
                        <Button
                          style={{ marginLeft: "20px" }}
                          variant="danger"
                          onClick={() => props.collectCandidate(poll)}
                        >
                          Delete Poll
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="light"
                        className="btn-home"
                        onClick={() => props.collectCandidate(poll)}
                      >
                        Vote Now!
                      </Button>
                    )}
                  </div>
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
