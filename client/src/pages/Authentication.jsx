import { Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/Icons/Logo4.png";
import AuthImage from "../assets/Images/FOOD.png";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.bg};
`;
const Left = styled.div`
  flex: 1;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  padding: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
  height: 80px;
`;
const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
  background-color: ${({ theme }) => theme.bg};
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 2px;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
`;

const Text = styled.p`
  display: flex;
  gap: 12px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const close = () => {
    setOpenAuth(false);
    navigate("/");
  };
  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <Container>
        <Left>
          <Logo src={LogoImage} />
          <Image src={AuthImage} />
        </Left>
        <Right>
          <CloseButton>
            <Close onClick={() => close()} />
          </CloseButton>
          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <Text>
                {" "}
                Don't have an account ?{" "}
                <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
              </Text>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <Text>
                Already have an account ?{" "}
                <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
              </Text>
            </>
          )}
        </Right>
      </Container>
    </Modal>
  );
};

export default Authentication;
