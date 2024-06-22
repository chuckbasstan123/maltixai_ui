import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

export default function Examples() {
  return (
    <div className="section section-examples" data-background-color="black">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      <div className="space-50" />
      <Container className="text-center">
        <h2 className="text-white mb-4">Examples of Services Built by MaltixAI Learning</h2>
        <Row>
          <Col sm="6">
            <Link to="rps">
              <img
                alt="..."
                className="img-raised"
                src={require("assets/img/rps.png")}
              />
            </Link>
            <Button
              className="btn-simple btn-round"
              color="primary"
              to="rps"
              tag={Link}
            >
              View Resume One Stop Services
            </Button>
          </Col>
          {/* <Col sm="6">
            <Link to="profile-page">
              <img
                alt="..."
                className="img-raised"
                src={require("assets/img/profile-page.png")}
              />
            </Link>
            <Button
              className="btn-simple btn-round"
              color="primary"
              to="profile-page"
              tag={Link}
            >
              View Profile Page
            </Button>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
}
