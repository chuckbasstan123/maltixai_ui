import React, { useState } from "react";
import { Container, Button, Form, FormGroup } from "reactstrap";
import "styles/PageHeader.css"; // Adjust the path as needed

export default function LockScreen({ onUnlock }) {
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
          <h1 className="h1-seo">MaltixAI</h1>
          <h2 className="h2-seo">Transform Anyone into Any Expert</h2>
          <Form className="lock-screen-form">
            <FormGroup>
              <Button type="button" color="primary" onClick={onUnlock}>
              Unleash Potential
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Container>
    </div>
  );
}