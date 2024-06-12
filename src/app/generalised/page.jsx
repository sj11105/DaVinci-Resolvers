'use client'
import React, { useEffect } from 'react';

const Generalised = () => {
  useEffect(() => {
    // Setting up the chatbot configuration
    window.embeddedChatbotConfig = {
      chatbotId: "JjYu_2momK9zF4BbxvixO",
      domain: "www.chatbase.co"
    };

    // Creating the script element for the chatbot
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "JjYu_2momK9zF4BbxvixO");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true;

    // Appending the script to the body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="chatbot-container"></div>
    </div>
  );
};

export default Generalised;