import React, { useState, useEffect } from "react";
import {Col, Row, Form, Button} from 'react-bootstrap';

const OTP = () =>
{   const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    }
    return(
    <Row className="justify-content-center align-items-center" style={{ height: "75vh", maxWidth: "100%" }}>
        <Col className="border rounded p-4 bg-light" xs={10} sm={8} md={6} lg={4}>
            <p className="fs-4 text-center mb-1">OTP has been sent to **********</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                <Col md={8}>
                    <Form.Group className="mb-4 text-center">
                    <Form.Label column="md">Enter OTP</Form.Label>
                    <Form.Control
                        size="lg"
                        id="otp"
                        type="tel" 
                        pattern="^\d{6}$"
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
                        onClick={handleSubmit}
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
export default OTP;