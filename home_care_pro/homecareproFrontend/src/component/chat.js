import React, { useState } from 'react';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { styled } from '@mui/system';

// Styled components
const StyledChatButton = styled('button')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: '#007bff',
  color: 'white',
  fontSize: '18px',
  border: 'none',
  cursor: 'pointer',
  zIndex: 9999,
// Styled components
const StyledChatButton = styled('button')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '60px', // Adjusted width
  height: '60px', // Adjusted height
  borderRadius: '50%',
  backgroundColor: '#A020F0',
  color: 'white',
  fontSize: '14px', // Adjusted font-size
  border: 'none',
  cursor: 'pointer',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.3s ease',
  opacity: 1,
  '&:hover': {
    opacity: 0.8,
  },
});

const StyledChatBox = styled('div')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '350px',
  height: '500px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #ced4da',
  borderRadius: '10px',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  display: 'none',
  zIndex: 9998,
  display: 'flex',
  flexDirection: 'column',
const StyledChatBox = styled('div')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '350px',
  height: '500px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #A020F0',
  borderRadius: '10px',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  display: 'none',
  zIndex: 9998,
  flexDirection: 'column',
});

const StyledChatHeader = styled('header')({
  backgroundColor: '#007bff',
  color: 'white',
  padding: '15px',
  borderRadius: '10px 10px 0 0',
const StyledChatHeader = styled('header')({
  backgroundColor: '#A020F0',
  color: 'white',
  padding: '15px',
  borderRadius: '10px 10px 0 0',
  position: 'relative', // Added position relative
});

const StyledCloseButton = styled('span')({
  cursor: 'pointer',
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '20px',
const StyledSubHeading = styled('p')({
  fontSize: '14px',
  margin: '5px 0',
});

const StyledChatContent = styled('div')({
  flex: '1',
  overflowY: 'auto',
  padding: '15px',
const StyledCloseButton = styled('span')({
  cursor: 'pointer',
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '20px',
});

const StyledChatInput = styled('div')({
  padding: '15px',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #ced4da',
  borderRadius: '0 0 10px 10px',
const StyledChatContent = styled('div')({
  flex: '1',
  overflowY: 'auto',
  padding: '15px',
});

const StyledChatInput = styled('div')({
  padding: '15px',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #ced4da',
  borderRadius: '0 0 10px 10px',
});

const StyledMessageInput = styled('textarea')({
  width: 'calc(100% - 30px)',
  minHeight: '60px',
  border: '1px solid #ced4da',
  borderRadius: '5px',
  padding: '10px',
  resize: 'none',
  marginBottom: '10px',
const StyledMessageInput = styled('textarea')({
  width: 'calc(100% - 30px)',
  minHeight: '60px',
  border: '1px solid #ced4da',
  borderRadius: '5px',
  padding: '10px',
  resize: 'none',
  marginBottom: '10px',
});

const StyledSendButton = styled('button')({
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  float: 'right',
});
const StyledSendButton = styled('button')({
    backgroundColor: '#A020F0',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    float: 'right',
    marginTop: '20px',
  });

// Main component
const ChatApp = () => {
  const [isOpen, setIsOpen] = useState(false);
// Main component
const ChatApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatButton, setShowChatButton] = useState(true);
  const [messages, setMessages] = useState([]);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
    setShowChatButton(false);
  };

  const closeChatbox = () => {
    setIsOpen(false);
    setShowChatButton(true);
  };

  const sendMessage = () => {
    const message = document.getElementById('message-input').value;
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      document.getElementById('message-input').value = ''; // Clear input field
    }
  };

  return (
    <>
      {showChatButton && <StyledChatButton onClick={toggleChatbox}>Chat</StyledChatButton>}
      <StyledChatBox style={{ display: isOpen ? 'block' : 'none' }}>
        <StyledChatHeader>
          <h2>Customer Support</h2>
          <StyledSubHeading>Hello there! How can I help you today? 😊🚀</StyledSubHeading>
          <StyledCloseButton onClick={closeChatbox}>×</StyledCloseButton>
        </StyledChatHeader>
        <StyledChatContent>
          {/* Render messages */}
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </StyledChatContent>
        <StyledChatInput>
          {/* Message input box */}
          <StyledMessageInput id="message-input" placeholder="Enter a message..." spellCheck="false" required></StyledMessageInput>
          <StyledSendButton onClick={sendMessage}>Send</StyledSendButton>
        </StyledChatInput>
      </StyledChatBox>
    </>
  );
};

export default ChatApp;
export default ChatApp;
