import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  min-height: 20px;
`;

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: auto;
  min-height: 20px;
`;

const Footer = () => {
  return (
    <PageContainer>
      <FooterContainer>
        <p>&copy; 2024 ServerEats</p>
      </FooterContainer>
    </PageContainer>
  );
};

export default Footer;
