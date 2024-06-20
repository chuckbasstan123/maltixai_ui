import React, { useState } from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

import bigChartData from "variables/charts.js";

export default function ResumeOneStop() {
  const [fileName, setFileName] = useState('');
  const [inputValue, setInputValue] = useState('');

  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleExampleClick = (example) => {
    setInputValue(example);
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  Upload your Resume <br />
                  <span className="text-white">and just Prompt about it.</span>
                </h1>
                <p className="text-white mb-3">
                  A cute Maltese will understand your intention and do it for you with customization.
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Free
                  </p>
                </div>
                <div className="btn-wrapper">
                  <div className="button-container">
                    <input
                      type="file"
                      id="file-upload"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" className="custom-file-upload btn btn-success btn-round">
                      Choose File
                    </label>
                    {fileName && (
                      <span className="mr-2 mb-2">{fileName}</span>
                    )}
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Anything with this resume..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ display: 'block', marginBottom: '10px' }}
                  />
                  <div className="example-buttons">
                    <Button
                      color="primary"
                      className="mr-2 mb-2"
                      onClick={() => handleExampleClick('Pros and Cons of the Resume')}
                    >
                      Pros and Cons of the Resume
                    </Button>
                    <Button
                      color="primary"
                      className="mr-2 mb-2"
                      onClick={() => handleExampleClick('Skills and Achievements')}
                    >
                      Skills and Achievements
                    </Button>
                    <Button
                      color="primary"
                      className="mr-2 mb-2"
                      onClick={() => handleExampleClick('Work Experience Highlights')}
                    >
                      Work Experience Highlights
                    </Button>
                  </div>
                </div>
                {/* <Button
                  className="btn-icon btn-simple btn-round btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fab fa-twitter" />
                </Button>
                <Button
                  className="btn-icon btn-simple btn-round btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fab fa-dribbble" />
                </Button>
                <Button
                  className="btn-icon btn-simple btn-round btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fab fa-facebook" />
                </Button> */}
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/mal.PNG")}
                />
              </Col>
            </Row>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}