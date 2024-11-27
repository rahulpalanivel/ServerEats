/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { getMessage, newMessage } from "../api";

const Container = styled.div`
  padding: 80px 0px 30px 0px;
  width: 100vw;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.bg};
`;

const Title = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 28px;
  color: ${({ theme }) => theme.primary};
`;

const ChatArea = styled.div`
  background: white;
  overflow-y: scroll;
  border: solid 2px black;
  border-radius: 15px;
  height: 75vh;
  width: 90vw;
`;

const Chat = styled.div`
  overflow-y: scroll;
  color: black;
  height: 82%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// const Sidebar = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px 0px 0px 10px;
//   height: 95%;
//   background-color: white;
//   border-radius: 15px;
//   gap: 30px;
//   border: 1px solid ${({ theme }) => theme.bg};
//   box-shadow: 0px 0px 2px 0px grey;
//   min-height: 740px;
//   width: 15vw;
// `;

// const Main = styled.div`
//   padding: 0px 0px 0px 20px;
//   display: flex;
//   flex-direction: row;
//   background-color: ${({ theme }) => theme.bg};
// `;

// const Chatbutton = styled.div`
//   color: black;
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
//   height: 7%;
//   font-size: 16px;
//   font-weight: 600;
//   padding: 10px;
//   border-radius: 15px;
//   border: 1px solid ${({ theme }) => theme.bg + 90};
//   box-shadow: 0px 0px 2px 0px grey;
//   background-color: white;
// `;

const Box = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  align-items: center;
`;

const Msg = styled.div`
  padding: 10px;
  width: fit-content;
  max-width: 70%;
  border: 2px solid green;
  border-radius: 15px;
  align-self: ${(props) => (props.end ? "flex-end" : "flex-start")};
`;

const ChatPage = () => {
  const socket = io("http://localhost:8080");
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;

  const location = useLocation();
  const chat = location.state;

  const [socketConnected, setSocketConnected] = useState(false);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("ServerEats");

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
    socket.emit("join chat", chat._id);

    loadChat();
    scroll();
  }, []);

  useEffect(() => {
    socket.on("message received", async (message) => {
      console.log(message);
      await loadChat();
    });
  });

  const loadChat = async () => {
    const data = { chat: chat._id };
    await getMessage(token, data)
      .then((res) => setChats(res.data))
      .then(scroll);
  };

  const sendMessage = async () => {
    if (message.trim().length !== 0) {
      const messageData = {
        chat: chat._id,
        sender: user._id,
        content: message,
      };
      await newMessage(token, messageData).then((res) =>
        socket.emit("new message", chat, res.data)
      );
      setMessage("");
    }
  };

  const scroll = () => {
    const container = document.getElementById("chatbox");
    container.scrollTop = container.scrollHeight;
  };

  return (
    <Container>
      <Title>Chat:{chat._id}</Title>
      <ChatArea>
        <Chat id="chatbox">
          {chats.map((chat) =>
            chat.sender === user._id ? (
              <Msg end>{chat.content}</Msg>
            ) : (
              <Msg>{chat.content}</Msg>
            )
          )}
        </Chat>
        <Box>
          <TextInput
            placeholder="Enter your message"
            value={message}
            handelChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            text="send"
            small
            onClick={() => {
              sendMessage();
            }}
          />
        </Box>
      </ChatArea>
    </Container>
  );
};

export default ChatPage;
