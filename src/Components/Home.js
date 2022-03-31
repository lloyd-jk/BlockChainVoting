import React, { useEffect, useState } from "react";
import { Container, Table, Tab } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { async } from "regenerator-runtime";

const Home = (props) => {
  const [list_of_polls, changePolls] = useState([]);
  const [end_poll_status, changeStatus] = useState([]);
  // var list_of_polls_test=[];

  const isActive = async (poll) => {
    const x = await window.contract.isPollActive({post: poll})
    return x
  }

  const helper = async () => {
    const x = await window.contract.getAllPosts();
    changePolls(x)

    return x;
  }
  useEffect(() => {
    const getPolls = async () => {
    const x= await window.contract.getAllPosts();
    // list_of_polls_test=x
    changePolls(x)
    console.log(x)      
      // console.log(arr)
      let btn_status=[]
      for (let i = 0; i < x.length; i++) {
        console.log(x[i])
        btn_status[i] = await window.contract.isPollActive({
          post: x[i],
        });
        changeStatus(btn_status);
        console.log(btn_status[i])
      }
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
                          variant="secondary"
                          
                          // onClick={async() => await window.contract.deactivatePoll({post: poll})}
                        >
                          View Poll
                        </Button>
                        <Button
                          style={{ marginLeft: "20px" }}
                          variant="secondary"
                          disabled={Boolean( end_poll_status[{index }]) }
                          // onClick={async() => await window.contract.deactivatePoll({post: poll})}
                        >
                          End the Poll
                        </Button>
                        <Button
                          style={{ marginLeft: "20px" }}
                          variant="danger"
                          onClick={() => props.collectCandidate(poll)}
                        >
                          Vote Now!
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
