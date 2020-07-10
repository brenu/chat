import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Login() {
  const [nickname, setNickname] = useState("");

  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

    if (nickname !== "") {
      localStorage.setItem("nickname", nickname);
      history.push("/chat");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <label className="label">Nickname</label>
        <div className="input-row-container">
          <input
            className="input"
            placeholder="Tell us your nickname"
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <button type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
