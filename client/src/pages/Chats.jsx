import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3030");

const Chat = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("sendMessage", {
      message,
    });
  };
  return (
    <div>
      <h1>Hello</h1>
      <input
        placeholder="Message"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
};

export default Chat;
