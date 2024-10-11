// components/Chatbot.js
import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import '../styles/Chatbot.css'; // Import the CSS file

export default function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessage = { sender: 'user', text: userInput };
    setChatMessages([...chatMessages, newMessage]);

    // Mock chatbot response
    const botMessage = {
      sender: 'bot',
      text: 'This is a mock response from the chatbot.',
    };
    setChatMessages((prevMessages) => [...prevMessages, botMessage]);

    setUserInput('');
  };

  return (
    <>
      <h4 className="mt-3">Chatbot</h4>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              color: 'black',
            }}
          >
            <p>
              <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px' }}>
        <Input
          type="textarea"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          rows="3"
          className="chat-input" // Apply the CSS class
        />
        <Button
          color="primary"
          onClick={handleSendMessage}
          style={{ marginTop: '10px', width: '100%' }}
        >
          Send
        </Button>
      </div>
    </>
  );
}
