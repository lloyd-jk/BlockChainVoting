import React, {useState} from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";


const NewPoll = (props) => {
    const inputArr = [
        {
          id: 1,
          candidateName: "",
          candidateURL: "",
          candidateRoll: "",
          candidateBranch: "",
          candidateMotto: ""
        }
      ];
    
      const [arr, setArr] = useState(inputArr);
      const [name, setName] = useState('');
      console.log(arr)
      const addInput = () => {
        setArr(s => {
          const lastId = s[s.length - 1].id;
          return [
            ...s,
            {
                id: lastId+1,
                candidateName: "",
                candidateURL: "",
                candidateRoll: "",
                candidateBranch: "",
                candidateMotto: ""
            }
          ];
        });
      };
    
      const handleChangeName = e => {
        e.preventDefault();
        
        const index = parseInt(e.target.id[4])
        setArr(s => {
          const newArr = s.slice();
          newArr[index].candidateName = e.target.value;
          return newArr;
        });
      };

      const handleChangeURL = e => {
        e.preventDefault();
        
        const index = parseInt(e.target.id[3])
        setArr(s => {
          const newArr = s.slice();
          newArr[index].candidateURL = e.target.value;
          return newArr;
        });
      };

      const handleChangeRollNo = e => {
        e.preventDefault();
        
        const index = parseInt(e.target.id[4])
        setArr(s => {
          const newArr = s.slice();
          newArr[index].candidateRoll = e.target.value;
          return newArr;
        });
      };

      const handleChangeBranch = e => {
        e.preventDefault();
        
        const index = parseInt(e.target.id[4])
        setArr(s => {
          const newArr = s.slice();
          newArr[index].candidateBranch = e.target.value;
          return newArr;
        });
      };

      const handleChangeMotto = e => {
        e.preventDefault();
        
        const index = parseInt(e.target.id[4])
        setArr(s => {
          const newArr = s.slice();
          newArr[index].candidateMotto = e.target.value;
          return newArr;
        });
      };
    
      return (
        <Container className="p-3">
            <Form>
              <Row className="justify-content-center">
                <Col md={8}>
                  <Form.Group className='mb-3 text-center'>
                      <Form.Label column="lg">Name of Poll</Form.Label>
                      <Form.Control
                          size='lg'
                          id='name poll'
                          onChange={(e) => {setName(e.target.value)}}
                          placeholder='Enter Name of the Poll'
                      ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
                <Row className="justify-content-center">
                {
                    arr.map((item, i) => {
                        return(
                          <Col lg={4} md={6} sm={8} className="p-3" key={i}>
                            <Card bg="light" text="dark">
                              <Card.Header className="text-center pt-3">Candidate {i+1}</Card.Header>
                              <Card.Body>
                                <Form.Group className='mb-3'>
                                    <Form.Label column="sm">Name</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        id={'name'+i}
                                        onChange={handleChangeName}
                                        placeholder='Enter Name'
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label column="sm">Image URL</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        id={'url'+i}
                                        onChange={handleChangeURL}
                                        placeholder='Enter Image URL'
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label column="sm">Roll No</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        id={'roll'+i}
                                        onChange={handleChangeRollNo}
                                        placeholder='Enter Roll Number'
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label column="sm">Branch</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        id={'bran'+i}
                                        onChange={handleChangeBranch}
                                        placeholder='Enter Branch Name'
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label column="sm">Motto</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        id={'url'+i}
                                        onChange={handleChangeMotto}
                                        placeholder='Enter Motto'
                                    ></Form.Control>
                                </Form.Group>
                              </Card.Body>
                              </Card>
                          </Col>
                        )
                    })
                }
                </Row>
            </Form>
          <div className="mt-3 text-center">
            <Button variant="outline-dark" onClick={addInput}>Add One More Candidate</Button>
            <Button variant="outline-dark" className="ms-5">Create Poll</Button>
          </div>
        </Container>
      );
}

export default NewPoll;