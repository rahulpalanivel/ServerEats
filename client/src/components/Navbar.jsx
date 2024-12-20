import {
  HistoryOutlined,
  MenuRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as LinkR, NavLink } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../assets/Icons/Logo4.png";
import { logout } from "../redux/reducers/UserSlice";
import Button from "./Button";
import DialogBox from "./DialogBox";

const Nav = styled.div`
  background-color: ${(props) => (props.scrolled ? "#ffffff" : "transparent")};
  transition: background-color 0.6s ease-in-out;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;
const Logo = styled.img`
  padding: 10px;
  height: 60px;
`;
const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const MobileIcons = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 80%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const TextButton = styled.span`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = ({ setOpenAuth, openAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleConfirm = () => {
    setDialog(false);
    dispatch(logout());
    navigate("/");
  };

  const handleCancel = () => {
    setDialog(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Nav scrolled={scrolled}>
      <MobileIcon onClick={() => setIsOpen(!isOpen)}>
        <MenuRounded style={{ color: "inherit" }} />
      </MobileIcon>

      {isOpen && (
        <MobileMenu isOpen={isOpen}>
          <Navlink to="/" onClick={() => setIsOpen(false)}>
            Home
          </Navlink>
          <Navlink to="/dishes" onClick={() => setIsOpen(false)}>
            Dishes
          </Navlink>
          <Navlink to="/orders" onClick={() => setIsOpen(false)}>
            Orders
          </Navlink>
          <Navlink to="/contactus" onClick={() => setIsOpen(false)}>
            Contact
          </Navlink>
          {currentUser ? (
            <>
              <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <Button
                text="Sign Up"
                outlined
                small
                onClick={() => setOpenAuth(true)}
              />
              <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
            </div>
          )}
        </MobileMenu>
      )}

      <MobileIcons>
        <Navlink to="/orders">
          <HistoryOutlined sx={{ color: "inherit", fontSize: "28px" }} />
        </Navlink>
        <Navlink to="/cart">
          <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
        </Navlink>
        {currentUser && (
          <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
        )}
      </MobileIcons>

      <NavLogo to="/">
        <Logo src={LogoImg} />
      </NavLogo>

      {currentUser === null || currentUser.role === "customer" ? (
        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/dishes">Dishes</Navlink>
          <Navlink to="/aboutus">About us</Navlink>
          <Navlink to="/contactus">Contact</Navlink>
        </NavItems>
      ) : (
        <></>
      )}

      <ButtonContainer>
        {currentUser ? (
          currentUser.role === "customer" ? (
            <>
              <Navlink to="/orders">
                <HistoryOutlined sx={{ color: "inherit", fontSize: "28px" }} />
              </Navlink>
              <Navlink to="/cart">
                <ShoppingCartOutlined
                  sx={{ color: "inherit", fontSize: "28px" }}
                />
              </Navlink>
              <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
              <Button text="Logout" small onClick={() => handleOpenDialog()} />
            </>
          ) : (
            <Button text="Logout" small onClick={() => handleOpenDialog()} />
          )
        ) : (
          <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
        )}
      </ButtonContainer>
      <DialogBox
        isOpen={dialog}
        close={() => setDialog(false)}
        Confirm={handleConfirm}
        Cancel={handleCancel}
        text="Logout"
      />
    </Nav>
  );
};

export default Navbar;
