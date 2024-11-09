import React, { useEffect } from "react";
import styled from "styled-components";

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

  const location = useLocation();
  const order = location.state;
  console.log(order);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
  }, []);

  return (
    <Container>
      <Title>Chat:{order}</Title>
    </Container>
  );
};

export default ChatPage;
