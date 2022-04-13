import React, { useState, useEffect } from "react";
import {Col, Row, Form, Button} from 'react-bootstrap';
import { authentication } from "../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";



const PhoneNumber = () =>

{   const [validated, setValidated] = useState(false);    
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


    const handleSubmit = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      // if (form.checkValidity() === true) {
      //     window.location.replace("http://localhost:1234/OTP");
      // }
      setValidated(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, "+917902472359", appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          window.location.replace("http://localhost:1234/OTP");
        })
        .catch((error) => {
          console.log(error);
        });
      
    }
    return (
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
                onClick={handleSubmit}
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
    );}
export default PhoneNumber;