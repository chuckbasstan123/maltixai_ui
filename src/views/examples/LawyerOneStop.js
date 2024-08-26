import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Chat components
const ChatBubble = ({ text, isUser }) => (
  <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
    <div style={{
      background: isUser ? '#007bff' : '#f1f1f1',
      color: isUser ? '#fff' : '#000',
      padding: '10px 15px',
      borderRadius: '15px',
      maxWidth: '60%',
      wordWrap: 'break-word',
      fontStyle: isUser ? 'normal' : 'italic', // System messages in italic
    }}>
      {text}
    </div>
  </div>
);

const ChatInput = ({ onSend, onFileUpload, isLoading, onInputChange }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      onFileUpload(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      padding: '10px',
      background: '#fff',
      borderTop: '1px solid #ccc',
    }}>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onInputChange(e);  // Call the onInputChange prop to handle input changes
        }}
        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        placeholder="Type your message..."
      />
      <Button color="primary" onClick={handleSend} style={{ marginLeft: '10px' }} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button
        color="secondary"
        onClick={() => fileInputRef.current.click()}
        style={{ marginLeft: '10px' }}
      >
        Upload PDF
      </Button>
    </div>
  );
};

const ChatContainer = ({ messages, onSend, onFileUpload, isLoading, onInputChange }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
    background: '#f8f8f8'
  }}>
    <div style={{
      flex: 1,
      padding: '10px',
      overflowY: 'auto'
    }}>
      {messages.map((msg, idx) => (
        <ChatBubble key={idx} text={msg.text} isUser={msg.isUser} />
      ))}
    </div>
    <ChatInput onSend={onSend} onFileUpload={onFileUpload} isLoading={isLoading} onInputChange={onInputChange} />
  </div>
);

export default function LawyerOneStop() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [userIntention, setUserIntention] = useState('');
  const [responseText, setResponseText] = useState(''); // New state for plain string response

  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return () => {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const handleSend = (message) => {
    if (!userIntention) {
        setUserIntention(message.toLowerCase().replace(/\s+/g, '_'));
    }

    if (!userIntention) {
        alert('Please select an example or input a request.');
        return;
    }

    const userMessage = { text: message, isUser: true };
    setMessages([...messages, userMessage]);

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('user_request', userIntention); // Include the user intention in the request
    if (uploadedFile) {
        formData.append('file', uploadedFile);
    }

    axios.post('https://api.maltixai.com/parse', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'API-Key': 'eyJhbGciOiJFZERTQSIsImtpZCI6I',
        },
    })
    .then(response => {
        // Assuming the backend sends a response like { response: "Actual message from backend" }
        const botMessage = { text: response.data[0] || 'No response from server', isUser: false };
        setMessages((prevMessages) => [...prevMessages, botMessage]); // Add the bot/system message to the chat
        toast.success('Response received!');
    })
    .catch(error => {
        console.error(error);
        alert(`Error during chat interaction: ${error}`);
    })
    .finally(() => {
        setIsLoading(false);
    });
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    toast.success('PDF uploaded successfully!');
  };

  const handleExampleClick = (example) => {
    setInputValue(example);
    setUserIntention(example.toLowerCase().replace(/\s+/g, '_'));
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setUserIntention(inputValue.toLowerCase().replace(/\s+/g, '_'));
  };

  return (
    <>
      <ExamplesNavbar />
      <ToastContainer />
      <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
        <Container fluid style={{ maxWidth: '90%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
          <h1 className="text-center text-dark mb-4">Lawyer One Stop</h1>
          <Row>
            <Col lg="6" md="6" style={{ height: '80vh' }}>
              <ChatContainer messages={messages} onSend={handleSend} onFileUpload={handleFileUpload} isLoading={isLoading} onInputChange={handleInputChange} />
              <div className="example-buttons">
                {/* <Button
                  color="primary"
                  className="mr-2 mb-2"
                  onClick={() => handleExampleClick('Document Summary')}
                >
                  Document Summary
                </Button>
                <Button
                  color="primary"
                  className="mr-2 mb-2"
                  onClick={() => handleExampleClick('Key Legal Points')}
                >
                  Key Legal Points
                </Button>
                <Button
                  color="primary"
                  className="mr-2 mb-2"
                  onClick={() => handleExampleClick('Risk Analysis')}
                >
                  Risk Analysis
                </Button> */}
              </div>
            </Col>
            <Col lg="6" md="6" style={{ height: '80vh' }}>
              <FilePreview file={uploadedFile} />
              {responseText && ( // Display the plain string response
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
                  <h5>Response:</h5>
                  <p>{responseText}</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

const FilePreview = ({ file }) => (
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '10px',
    height: '100%',
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f8f8f8',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {file ? (
      <div style={{ flex: 1 }}>
        <h5>Uploaded File: {file.name}</h5>
        <iframe
          src={URL.createObjectURL(file)}
          width="100%"
          height="100%"
          title="PDF Preview"
          style={{ border: 'none', flex: 1, overflow: 'auto' }}
          allow="fullscreen"
        />
      </div>
    ) : (
      <p style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', color: 'black', fontSize: '2.5rem' }}>
        Upload your file to begin
      </p>
    )}
  </div>
);