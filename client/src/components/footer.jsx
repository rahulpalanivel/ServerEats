import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;

  height: 300px;
  align-items: center;
  justify-content: center;
  background: rgb(26, 38, 56);
`;

const Bottom = styled.div`
  color: white;
`;

const Footer = () => {
  return (
    <Container>
      <Bottom>&copy; 2024 ServerEats All Rights Reserved</Bottom>
    </Container>
  );
};

export default Footer;
