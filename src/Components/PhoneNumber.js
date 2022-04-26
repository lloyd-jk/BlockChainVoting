import React, { useState, useEffect } from "react";
import {Col, Row, Form, Button} from 'react-bootstrap';
import { authentication, db } from "../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { collection, setDoc, doc, getDoc} from "firebase/firestore"; 
import Spinner from "./Spinner";



const PhoneNumber = () =>{   


  
  const [loading, isLoading] = useState(false);
  const [otp, isOtp] = useState(false);
  const [result, setResult] = useState(false);
  const [validated, setValidated] = useState(false);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  useEffect(() => {
    const fetchDoc = async () => {
      isLoading(true)
      
      // const usersRef = collection(db, "users");
      const docRef = doc(db, "users", window.accountId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const number=docSnap.data().phone_no
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(
          authentication,
          `+91${number}`,
          appVerifier
        )
          .then((confirmationResult) => {
            // console.log(JSON.stringify(confirmationResult));
            // console.log(confirmationResult);

            // localStorage.setItem("confirmationResult", confirmationResult);
            
            setResult(confirmationResult);
            isOtp(true)
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      isLoading(false)
    };

     fetchDoc();
     // btnStatus();
   }, []);
  

    

    

    const writeDoc = async (number) => {
      try {
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, window.accountId), {
          phone_no: number
        });
        isOtp(true)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        // if (form.checkValidity() === true) {
        //     window.location.replace("http://localhost:1234/OTP");
        // }
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, `+91${form.elements[0].value}`, appVerifier)
                .then((confirmationResult) => {
                    setResult(confirmationResult);
                    writeDoc(form.elements[0].value)
                    // window.location.replace('/otp')
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        
        setValidated(true);
      
    }

    const verifyOTP = (e) =>{
      let otp = e.target.value;
      // setOTP(otp);

      if(otp.length == 6)
      {
          // let confirmationResult = localStorage.getItem("confirmationResult");
          // const obj = JSON.parse(confirmationResult);
          // console.log(obj);
          console.log(result)
          result
            .confirm(otp)
            .then((result) => {
              
              const user = result.user;
              console.log(user);
              console.log('Success')
              window.location.replace('/');
            })
            .catch((error) => {
              console.log(error);
            });
      }
  } 
  
    return (
      <>
      {!otp ? (
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "75vh", maxWidth: "100%" }}
        >
          <Col
            className="border rounded p-4 bg-light"
            xs={10}
            sm={8}
            md={6}
            lg={4}
          >
            <p className="fs-2 text-center mb-1">New User</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={8}>
                  <Form.Group className="mb-4 text-center">
                    <Form.Label column="md">Enter your phone number</Form.Label>
                    <Form.Control
                      size="lg"
                      id="phoneno"
                      type="tel"
                      pattern="^\d{10}$"
                      // placeholder="Enter your phone number"
                      required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid phone number
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  // onClick={handleSubmit}
                  variant="outline-dark"
                  type="submit"
                >
                  Send OTP
                </Button>
              </div>
              <div id="recaptcha-container"></div>
            </Form>
          </Col>
        </Row>
        ): (
            <Row className="justify-content-center align-items-center" style={{ height: "75vh", maxWidth: "100%" }}>
            <Col className="border rounded p-4 bg-light" xs={10} sm={8} md={6} lg={4}>
                <p className="fs-4 text-center mb-1">OTP has been sent to **********</p>
                <Form noValidate validated={validated} onSubmit={(e)=>{e.preventDefault(); e.stopPropagation();}}>
                    <Row className="justify-content-center">
                    <Col md={8}>
                        <Form.Group className="mb-4 text-center">
                        <Form.Label column="md">Enter OTP</Form.Label>
                        <Form.Control
                            size="lg"
                            id="otp"
                            type="tel" 
                            pattern="^\d{6}$"
                            // value={OTP}
                            onChange={verifyOTP}
                            // placeholder="Enter your phone number"
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            OTP should be 6 digits.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    </Row>
                    <div className="text-center">
                        <Button
                            // onClick={handleSubmit}
                            variant="outline-dark"
                            type="submit"
                        >
                            Verify OTP
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
      )}
      </>
    );}
export default PhoneNumber;