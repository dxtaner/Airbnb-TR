import React from "react";
import "./App.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "./assets/images.svg";

import Routes from "./routes";

function App() {
  return (
    <Container className="app-container">
      <Row className="app-header">
        <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="app-logo">
          <Image src={logo} alt="Logo AirTR || TR" />
        </Col>
        <Col
          xs={12}
          sm={6}
          md={8}
          lg={9}
          xl={10}
          xxl={11}
          className="app-content">
          <div className="custom-header">
            <h1>Hoşgeldiniz!</h1>
          </div>
          <Routes />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
