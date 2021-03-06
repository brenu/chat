import React, { useMemo, useState, useEffect } from "react";
import socketio from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";

import "./styles.css";

function Chat() {
  const [isUserValid, setIsUserValid] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    const tempNickname = localStorage.getItem("nickname");
    const colors = [
      "#B15903",
      "#E926B8",
      "#5685B0",
      "#46CC4F",
      "#BB05B9",
      "#DA3340",
      "#33D191",
      "#DCDD1F",
      "#3758AB",
    ];

    if (tempNickname) {
      setIsUserValid(true);
      setColor(colors[Math.floor(Math.random() * colors.length)]);
      setNickname(tempNickname);
    }
  }, []);

  useEffect(() => {
    if (nickname !== null) {
      var container = document.getElementById("messages-container");
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const socket = useMemo(
    () => socketio("https://brenuchatserver.herokuapp.com/", {}),
    []
  );

  socket.off("message").on("message", (msg) => {
    setMessages((messages) => [...messages, msg]);
    return;
  });

  function handleSubmit() {
    socket.emit("message", { nickname, message, color });
    setMessage("");
    return;
  }
  return (
    <>
      {isUserValid === true ? (
        <div className="container">
          <div className="chat-container">
            <div id="messages-container" className="messages-container">
              {messages.map((message) => {
                return (
                  <div key={message.message} className="message-text-container">
                    <p
                      style={{
                        fontSize: "14pt",
                        fontWeight: "bold",
                        color: message.color,
                      }}
                    >
                      {message.nickname}
                    </p>
                    <p className="message-text">{message.message}</p>
                  </div>
                );
              })}
            </div>
            <div className="send-container">
              <input
                className="send-input"
                placeholder="Manda tua mensagem :)"
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) =>
                  event.keyCode === 13 ? handleSubmit() : null
                }
              />
              <button className="send-button" onClick={handleSubmit}>
                <FaPaperPlane color="rgb(98, 245, 135)" size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="chat-error-message">Defina um nickname :)</h1>
        </div>
      )}
    </>
  );
}

export default Chat;
