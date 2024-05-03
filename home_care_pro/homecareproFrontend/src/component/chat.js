import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../static/css/style.css';

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");

    // Function to toggle the visibility of the chatbox
    const toggleChatbox = () => {
        setShowChatbot(!showChatbot);
    }

    // Event listeners to handle opening and closing the chatbot
    closeBtn.addEventListener("click", toggleChatbox);
    chatbotToggler.addEventListener("click", toggleChatbox);

    return () => {
      closeBtn.removeEventListener("click", toggleChatbox);
      chatbotToggler.removeEventListener("click", toggleChatbox);
    };
  }, [showChatbot]);

  return (
    <>
      <button className={`chatbot-toggler ${showChatbot ? 'show-chatbot' : ''}`}>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={`chatbot ${showChatbot ? 'show-chatbot' : ''}`}>
        <header>
          <h2>Customer Support</h2>
          <span className="close-btn material-symbols-outlined">close</span>
        </header>
        <ul className="chatbox">
          <li className="chat incoming">
            <span className="material-symbols-outlined">smart_toy</span>
            <p>Hi there 👋<br/>How can I help you today?</p>
          </li>
        </ul>
        <div className="chat-input">
          <textarea placeholder="Enter a message..." spellCheck={false} required></textarea>
          <span id="send-btn" className="material-symbols-rounded">send</span>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
