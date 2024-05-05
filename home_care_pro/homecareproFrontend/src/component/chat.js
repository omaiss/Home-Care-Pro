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
});

const StyledChatHeader = styled('header')({
  backgroundColor: '#007bff',
  color: 'white',
  padding: '15px',
  borderRadius: '10px 10px 0 0',
});

const StyledCloseButton = styled('span')({
  cursor: 'pointer',
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '20px',
});

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

// Main component
const ChatApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StyledChatButton onClick={toggleChatbox}>Chat</StyledChatButton>
      <StyledChatBox style={{ display: isOpen ? 'block' : 'none' }}>
        <StyledChatHeader>
          <h2>Customer Support</h2>
          <StyledCloseButton onClick={toggleChatbox}>×</StyledCloseButton>
        </StyledChatHeader>
        <StyledChatContent>
          {/* Chat messages go here */}
          <ul className="chatbox">
            <li className="chat incoming">
              <p>Hi there 👋<br/>How can I help you today?</p>
            </li>
          </ul>
        </StyledChatContent>
        <StyledChatInput>
          {/* Message input box */}
          <StyledMessageInput placeholder="Enter a message..." spellCheck="false" required></StyledMessageInput>
          <StyledSendButton>Send</StyledSendButton>
        </StyledChatInput>
      </StyledChatBox>
    </>
  );
};

export default ChatApp;
