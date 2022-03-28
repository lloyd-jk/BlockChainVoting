import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import Spinner from "./Spinner";
// import { useHistory } from 'react-router-dom';

const NewPoll = () => {
  const inputArr = [
    {
      id: 1,
      candidateName: "",
      candidateURL: "https://i.stack.imgur.com/l60Hf.png",
      candidateRoll: "",
      candidateBranch: "",
      candidateMotto: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);
  const [pollName, setpollName] = useState("");
  const [loading, isLoading] = useState(false);
  // console.log(arr);
  const addInput = () => {
    setArr((s) => {
      const lastId = s[s.length - 1].id;
      return [
        ...s,
        {
          id: lastId + 1,
          candidateName: "",
          candidateURL: "https://i.stack.imgur.com/l60Hf.png",
          candidateRoll: "",
          candidateBranch: "",
          candidateMotto: "",
        },
      ];
    });
  };

  const handleChangeName = (e) => {
    e.preventDefault();

    const index = parseInt(e.target.id.slice(4));
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].candidateName = e.target.value;
      // console.log(arr);
      return newArr;
    });
  };

  const handleChangeURL = (e) => {
    e.preventDefault();

    const index = parseInt(e.target.id.slice(3));
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].candidateURL = e.target.value;
      // console.log(arr);
      return newArr;
    });
  };

  const handleChangeRollNo = (e) => {
    e.preventDefault();

    const index = parseInt(e.target.id.slice(4));
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].candidateRoll = e.target.value;
      // console.log(arr);
      return newArr;
    });
  };

  const handleChangeBranch = (e) => {
    e.preventDefault();

    const index = parseInt(e.target.id.slice(4));
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].candidateBranch = e.target.value;
      // console.log(arr);
      return newArr;
    });
  };

  const handleChangeMotto = (e) => {
    e.preventDefault();

    const index = parseInt(e.target.id.slice(4));
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].candidateMotto = e.target.value;
      // console.log(arr);
      return newArr;
    });
  };

  const [validated, setValidated] = useState(false);
  // useEffect(() => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(pollName===""){
        console.log(pollName)
        setValidated(true);
        return false
    }
    for(var i in arr){
      if(arr[i].candidateName===''||arr[i].candidateURL===''||arr[i].candidateRoll===''||arr[i].candidateMotto===''||arr[i].candidateBranch===''){
        console.log(arr[i])
        setValidated(true);
        return false
      }
    }
    isLoading(true)
      var nameList = [];
      const addDetails = async (item) => {
        await window.contract.addDetails({
          name: item[1]["candidateName"],
          url: item[1]["candidateURL"],
          branch: item[1]["candidateBranch"],
          motto: item[1]["candidateMotto"],
        });
      };
      Object.entries(arr).map((item) => {
        nameList.push(item[1]["candidateName"]);
        // console.log(item)
        addDetails(item);
      });

      await window.contract.addToPollsList({
        post: pollName,
      });

    await window.contract.addCandidateList({
      post: pollName,
      name_array: nameList,
    });
    window.location.replace('/')
    isLoading(false);
  };
  // });

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
        <Container className="p-3">
          <Form noValidate validated={validated}>
            <Row className="justify-content-center">
              <Col md={8}>
                <Form.Group className="mb-3 text-center">
                  <Form.Label column="lg">Name of Poll</Form.Label>
                  <Form.Control
                    size="lg"
                    id="name poll"
                    onChange={(e) => {
                      setpollName(e.target.value);
                    }}
                    placeholder="Enter Name of the Poll"
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please fill the poll name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {arr.map((item, i) => {
                return (
                  <Col lg={4} md={6} sm={8} className="p-3" key={i}>
                    <Card bg="light" text="dark">
                      <Card.Header className="text-center pt-3">
                        Candidate {i + 1}
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label column="sm">Name</Form.Label>
                          <Form.Control
                            size="sm"
                            id={"name" + i}
                            onChange={handleChangeName}
                            placeholder="Enter Name"
                            required
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please fill candidate name
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label column="sm">Image URL</Form.Label>
                          <Form.Control
                            size="sm"
                            id={"url" + i}
                            onChange={handleChangeURL}
                            placeholder="Enter Image URL"
                            defaultValue="https://i.stack.imgur.com/l60Hf.png"
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label column="sm">Roll No</Form.Label>
                          <Form.Control
                            size="sm"
                            id={"roll" + i}
                            onChange={handleChangeRollNo}
                            placeholder="Enter Roll Number"
                            required
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please fill candidate roll number
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label column="sm">Branch</Form.Label>
                          <Form.Control
                            size="sm"
                            id={"bran" + i}
                            onChange={handleChangeBranch}
                            placeholder="Enter Branch Name"
                            required
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please fill candidate branch
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label column="sm">Motto</Form.Label>
                          <Form.Control
                            size="sm"
                            id={"mott" + i}
                            onChange={handleChangeMotto}
                            placeholder="Enter Motto"
                            required
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please fill candidate motto
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <div className="mt-3 text-center">
              <Button variant="outline-dark" onClick={addInput}>
                Add One More Candidate
              </Button>
              <Button
                onClick={handleSubmit}
                variant="outline-dark"
                type="submit"
                className="ms-5"
              >
                Create Poll
              </Button>
            </div>
          </Form>
        </Container>
      )}
    </div>
  );
}

export default NewPoll;
