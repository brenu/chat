import React, { useMemo, useState } from "react";
import socketio from "socket.io-client";

import "./styles.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = useMemo(() => socketio("http://localhost:3333", {}), []);

  socket.off("message").on("message", (msg) => {
    setMessages((messages) => [...messages, msg]);
    return;
  });

  function handleSubmit() {
    socket.emit("message", message);
    setMessage("");
    return;
  }

  return (
    <div className="container">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => {
            return <p className="message-text">{message}</p>;
          })}
        </div>
        <div className="send-container">
          <input
            className="send-input"
            placeholder="Manda tua mensagem :)"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button className="send-button" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
