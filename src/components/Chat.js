import React, { useState } from "react";

import styles from "../css/Chat.module.css";

function ChatComponent() {
  const [channels] = useState(["Channel1", "Channel2", "C3"]);
  const [currentChannel, setCurrentChannel] = useState("Channel1");
  const [messages, setMessages] = useState({
    Channel1: [],
    Channel2: [],
    C3: [],
  });
  const [newMessage, setNewMessage] = useState("");

  const handleChannelChange = (channel) => {
    setCurrentChannel(channel);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const updatedMessages = {
      ...messages,
      [currentChannel]: [...messages[currentChannel], newMessage],
    };

    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className={styles["main"]}>
      {/* chats side tab */}
      <div className={styles["channels"]}>
        {channels.map((channel) => (
          <button className={styles["channel_btn"]} key={channel} onClick={() => handleChannelChange(channel)}>
            {channel}
          </button>
        ))}
      </div>

      {/* convo */}
      <div className={styles["convo"]}>

        {/* messages */}
        <div style={{ overflowY: "auto" }}>
          {messages[currentChannel].map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>

        {/* input */}
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
    </div>
  );
}

export default ChatComponent;
