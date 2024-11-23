import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const Container = styled.div`
  padding: 80px 0px 0px 0px;
  padding-bottom: 100px;
  width: 100vw;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
`;

const Title = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 40px;
  color: ${({ theme }) => theme.primary};
`;

const ChatPage = () => {
  const socket = io("http://localhost:8080");
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;

  const location = useLocation();
  const chef = location.state;

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
    socket.emit("join chat", chef);
  }, []);

  return (
    <Container>
      <Title>Chat:{chef}</Title>
    </Container>
  );
};

export default ChatPage;
