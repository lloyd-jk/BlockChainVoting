import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";
import NITCLogo from "./assets/NITCLogoDark.png";

export default function App() {
  const collectCandidates = async (poll) => {
    console.log(poll);
    var names_list = new Array();

    names_list = await window.contract.getCandidateList({ post: poll });
    localStorage.setItem("candidates", names_list);
    localStorage.setItem("poll", poll);
    window.location.replace(window.location.href + "PollingStation");
  };

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={NITCLogo} width="60" height="60"></img>
          </Navbar.Brand>
          <Navbar.Brand href="/">SAC Election Portal</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto"></Nav>
            <Nav>
              <Nav.Link href="/NewPoll">
                {window.accountId != "admin-sac.testnet"
                  ? "Start a New Poll"
                  : null}{" "}
              </Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login / Sign Up" : "Logout"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={<Home collectCandidate={collectCandidates} />}
        />
        <Route path="/PollingStation" element={<PollingStation />} />
        <Route path="/NewPoll" element={<NewPoll />} />
      </Routes>
    </Router>
  );
}
