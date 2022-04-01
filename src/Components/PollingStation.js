import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Voter from "./Voter";
import Musk from "../assets/Musk.jfif";
import Spinner from "./Spinner";
// import Pichai from "../assets/Pichai.jpg";
// import Jack from "../assets/Jack.jpg";

const getVotes = async (postName) => {
  await window.contract.getVotes({
    post: postName,
  });
};
const PollingStation = () => {
  const [loading, isLoading] = useState(false);
  const [votes, changeVote] = useState([]);
  const [current_poll, changePoll] = useState("--");
  const [contestants, changeContestants] = useState([]);
  const [det_users, changeDet] = useState([]);
  const [participate_users, changePart] = useState([]);
  const [button_users, changeButtonStatus] = useState([]);
  const [buttonState, setbuttonState] = useState(false);
  const [viewCount, viewStatus] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      isLoading(true);

      viewStatus(localStorage.getItem("viewCount"));

      let voteCount = await window.contract.getVotes({
        post: localStorage.getItem("poll"),
      });

      changeVote(voteCount);

      changePoll(localStorage.getItem("poll"));
      let name_array = localStorage.getItem("candidates").split(",");
      changeContestants(name_array);

      let det_usr = [];
      for (let i = 0; i < name_array.length; i++) {
        det_usr[i] = await window.contract.getDetails({
          name: name_array[i],
        });
        changeDet(det_usr);
      }
      let prt_usr = [];
      for (let i = 0; i < name_array.length; i++) {
        prt_usr[i] = await window.contract.didParticipate({
          post: localStorage.getItem("poll"),
          user: localStorage.getItem("candidates").split(",")[i],
        });
        changePart(prt_usr);
        changeButtonStatus(prt_usr);
      }
      isLoading(false);
    };

    const checkDoubleVotes = async () => {
      const pollName = localStorage.getItem("poll");
      const user = window.accountId;
      console.log(pollName);
      console.log(user);
      if (window.accountId === "") {
        setbuttonState(true);
        return;
      }
      let temp = await window.contract.didParticipate({
        post: pollName,
        user: user,
      });
      if (temp) {
        setbuttonState(true);
        return;
      }
      setbuttonState(false);
    };
    checkDoubleVotes();

    getDetails();
    checkDoubleVotes();
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Spinner type={"bars"} color="#20FDF0" />
        </div>
      ) : (
        <div style={{ padding: "20px" }}>
          <Row>
            <h2 className="text-center text-black">Position: {current_poll}</h2>
          </Row>
          <Row className="justify-content-center">
            {votes.map((el, index) => {
              return (
                <Voter
                  key={index}
                  index={index}
                  pollName={localStorage.getItem("poll")}
                  image={det_users[index][0]}
                  name={contestants[index]}
                  branch={det_users[index][1]}
                  motto={det_users[index][2]}
                  votecount={votes[index]}
                  isLoading={isLoading}
                  buttonState={buttonState}
                  setbuttonState={setbuttonState}
                  viewCount={viewCount}
                />
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
};

export default PollingStation;
