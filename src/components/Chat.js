import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "../css/Chat.module.css";

var API_URL = process.env.REACT_APP_API_URL;

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
  
    try {
      const response = await fetch(`${API_URL}comment/chat/3/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({ content: newMessage, user: localStorage.getItem('userId') })
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      refreshMessages();
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const refreshMessages = async () => {
    const fetchChatDetails = async () => {
      try {
        const response = await fetch(`${API_URL}comment/chat/${id}/list/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
  
        const responseData = await response.json();
        const fetchedMessages = responseData.results.map(msg => {
          let userType = 'other';
          if (msg.user[1] === "e" && localStorage.getItem('isShelter') === "false") {
            userType = 'user';
          } else if (msg.user[1] !== "e" && localStorage.getItem('isShelter') === "true") {
            userType = 'user';
          }
    
          return {
            content: msg.content,
            type: userType === "user" ? "user_message" : "other_message"
          };
        });
  
        setMessages(fetchedMessages); 
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchChatDetails();
  }

  const { id } = useParams();
  useEffect(() => {
    refreshMessages();
  });

  return (
    <div className={styles["main"]}>
      <div className={styles["convo"]}>
  <div className={styles["message-container"]} style={{ overflowY: "auto" }}>
    {messages.map((message, index) => (
      <div key={index} className={styles[message.type]}>
        {message.content}
      </div>
    ))}
  </div>
</div>
        
        <div className={styles["input"]}>
          <input
            type="text"
            value={newMessage}
            className={styles["input_bar"]}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatComponent;
