import React, { useState } from "react";
import { Container, Button, Input, Form, FormGroup, Label } from "reactstrap";
import "styles/PageHeader.css"; // Adjust the path as needed

export default function LockScreen({ onUnlock }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === "1234") {
      onUnlock();
    } else {
      setError("Incorrect passcode. Please try again.");
    }
  };

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">MaltixAI: Unleash Your Potentials</h1>
          <Form onSubmit={handleSubmit} className="lock-screen-form">
            <FormGroup>
              <Label for="passcode">Passcode</Label>
              <Input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Unlock
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </div>
      </Container>
    </div>
  );
}
