import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

const ChatbotToggler = styled("button")({
  position: "fixed",
  bottom: "30px",
  right: "35px",
  outline: "none",
  border: "none",
  height: "50px",
  width: "50px",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "#724ae8",
  transition: "all 0.2s ease",
});

const ChatbotContainer = styled("div")({
  position: "fixed",
  right: "35px",
  bottom: "90px",
  width: "420px",
  background: "#fff",
  borderRadius: "15px",
  overflow: "hidden",
  opacity: "0",
  pointerEvents: "none",
  transform: "scale(0.5)",
  transformOrigin: "bottom right",
  boxShadow: "0 0 128px 0 rgba(0,0,0,0.1), 0 32px 64px -48px rgba(0,0,0,0.5)",
  transition: "all 0.1s ease",
});

const ChatbotHeader = styled("header")({
  padding: "16px 0",
  position: "relative",
  textAlign: "center",
  color: "#fff",
  background: "#724ae8",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
});

const ChatbotTitle = styled("h2")({
  fontSize: "1.4rem",
});

const Chatbox = styled("div")({
  overflowY: "auto",
  height: "510px",
  padding: "30px 20px 100px",
});

const ChatInput = styled("div")({
  display: "flex",
  gap: "5px",
  position: "absolute",
  bottom: "0",
  width: "100%",
  background: "#fff",
  padding: "3px 20px",
  borderTop: "1px solid #ddd",
});

const ChatTextarea = styled("textarea")({
  height: "55px",
  width: "100%",
  border: "none",
  outline: "none",
  resize: "none",
  maxHeight: "180px",
  padding: "15px 15px 15px 0",
  fontSize: "0.95rem",
});

const ChatSubmitButton = styled("button")({
  alignSelf: "flex-end",
  color: "#724ae8",
  cursor: "pointer",
  height: "55px",
  display: "flex",
  alignItems: "center",
  visibility: "hidden",
  fontSize: "1.35rem",
});

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");

    const toggleChatbox = () => {
      setShowChatbot(!showChatbot);
    };

    closeBtn.addEventListener("click", toggleChatbox);
    chatbotToggler.addEventListener("click", toggleChatbox);

    return () => {
      closeBtn.removeEventListener("click", toggleChatbox);
      chatbotToggler.removeEventListener("click", toggleChatbox);
    };
  }, [showChatbot]);

  return (
    <>
      <ChatbotToggler className={`chatbot-toggler ${showChatbot ? 'show-chatbot' : ''}`}>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </ChatbotToggler>
      <ChatbotContainer className={`chatbot ${showChatbot ? 'show-chatbot' : ''}`}>
        <ChatbotHeader>
          <ChatbotTitle>Customer Support</ChatbotTitle>
          <span className="close-btn material-symbols-outlined">close</span>
        </ChatbotHeader>
        <Chatbox>
          <ul className="chatbox">
            <li className="chat incoming">
              <span className="material-symbols-outlined">smart_toy</span>
              <p>Hi there 👋<br/>How can I help you today?</p>
            </li>
          </ul>
        </Chatbox>
        <ChatInput>
          <ChatTextarea placeholder="Enter a message..." spellCheck={false} required />
          <ChatSubmitButton id="send-btn" className="material-symbols-rounded">send</ChatSubmitButton>
        </ChatInput>
      </ChatbotContainer>
    </>
  );
};

export default Chatbot;
