import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Row, Table, Container } from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResumeOneStop() {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [userIntention, setUserIntention] = useState('');

  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return () => {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setFile(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleExampleClick = (example) => {
    setInputValue(example);
    setUserIntention(example.toLowerCase().replace(/\s+/g, '_'));
  };

  const parseResume = () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_request', inputValue);

    axios.post('https://api.maltixai.com/parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'API-Key': 'eyJhbGciOiJFZERTQSIsImtpZCI6I', 
      },
    })
      .then(response => {
        setParsedData(response.data[0]);
        toast.success('Results are ready! Scroll down to view them.');
      })
      .catch(error => {
        console.error(error);
        alert(`Error processing resume: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderTableData = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <tr key={key}>
        <th>{key.replace(/_/g, ' ')}</th>
        <td>
          {Array.isArray(value) ? (
            <ul>
              {value.map((item, index) => (
                <li key={index}>{typeof item === 'object' ? renderTableData(item) : item}</li>
              ))}
            </ul>
          ) : typeof value === 'object' ? (
            <Table>
              <tbody>{renderTableData(value)}</tbody>
            </Table>
          ) : (
            value
          )}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <ExamplesNavbar />
      <ToastContainer />
      <div className="wrapper">
        <div className="page-header" style={{ position: 'relative' }}>
          <img alt="..." className="path" src={require("assets/img/blob.png")} />
          <img alt="..." className="path2" src={require("assets/img/path2.png")} />
          <img alt="..." className="shapes triangle" src={require("assets/img/triunghiuri.png")} />
          <img alt="..." className="shapes wave" src={require("assets/img/waves.png")} />
          <img alt="..." className="shapes squares" src={require("assets/img/patrat.png")} />
          <img alt="..." className="shapes circle" src={require("assets/img/cercuri.png")} />
          <div className="content-center">
            <Container>
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
                        onClick={() => handleExampleClick('Pros and Cons of my resume')}
                      >
                        Pros and Cons of my resume
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
                      <Button
                        color="success"
                        className="mr-2 mb-2"
                        onClick={parseResume}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Parse Resume'}
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col lg="4" md="5">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/img/mal.PNG")}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        
        {parsedData && (
          <div className="results-viewer" style={{ width: '100%', padding: '20px', position: 'relative' }}>
            <Container>
              <h2 className="text-white">Results</h2>
              {userIntention === 'resume_improve' ? (
                <div dangerouslySetInnerHTML={{ __html: parsedData.convertedMarkdown }} />
              ) : (
                <Table className="table table-striped">
                  <tbody>
                    {renderTableData(parsedData)}
                  </tbody>
                </Table>
              )}
            </Container>
          </div>
        )}

        <div className="main-components">
          <Container>
            <Row className="justify-content-center">
              <Col lg="10" md="12">
                <h2 className="text-left">Main Components of the End to End Service</h2>
                <p className="text-left mb-4">Discover the core features that make our service unique and powerful:</p>
                <Table responsive bordered className="text-left">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>AI Power Leverage</td>
                      <td>
                        <ul>
                          <li>Crafting effective prompts is challenging. Most general requests rely heavily on well-constructed prompts.</li>
                          <li>AI power vendor options include ChatGPT, Gemini, and Claude.</li>
                          <li>Fine-tuning and self-hosting large language models like Llama3 and others.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>UI/UX Design</td>
                      <td>
                        <ul>
                          <li>No prior experience in UI is required. Don't know any line of ReAct nor JavaScript? That's totally fine. Use AI to implement your dream UI is not hard. </li>
                          <li>No prior UX experience needed. Develop and learn the UX mindset while interactively implementing projects with AI.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>AWS and Microservices</td>
                      <td>
                        <ul>
                          <li>Not a backend engineer? Not even an engineer? It's possible for individuals without an engineering background to manage engineering stacks.</li>
                          <li>Full integration with AWS infrastructure. Unfamiliar with terms like Route53, Elastic Kubernetes Service, HTTPS, or IAM? That's okay. With a willingness to learn, AI can simplify the process and provide exactly what you need.</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>

      </div>
    </>
  );
}
