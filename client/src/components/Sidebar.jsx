import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import HistoryIcon from "@mui/icons-material/History";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/reducers/UserSlice";

import styled from "styled-components";
import DialogBox from "./DialogBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px 10px;
  height: 95%;
  background-color: white;
  border-radius: 15px;
  gap: 30px;
  border: 1px solid ${({ theme }) => theme.bg};
  box-shadow: 0px 0px 2px 0px grey;
  min-height: 740px;
`;
const Button = styled.div`
  color: grey;
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 7%;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  border-radius: 15px;
  // border: 1px solid ${({ theme }) => theme.bg + 90};
  // box-shadow: 0px 0px 2px 0px grey;
  background-color: white;
`;

const Sidebar = () => {
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleConfirm = () => {
    setDialog(false);
    navigate("/");

    dispatch(logout());
  };

  const handleCancel = () => {
    setDialog(false);
  };

  return (
    <Container>
      {user.role === "chef" ? (
        <>
          <Button onClick={() => navigate("/chef/")}>
            <HomeOutlinedIcon />
            Home
          </Button>

          <Button onClick={() => navigate("/chef/orders")}>
            <HistoryIcon />
            Active Orders
          </Button>

          <Button onClick={() => navigate("/chef/accorders")}>
            <DoneOutlinedIcon /> Accepted Orders
          </Button>

          <Button onClick={() => navigate("/chef/allorders")}>
            <MoreHorizOutlinedIcon />
            Orders History
          </Button>

          <Button>
            <SettingsOutlinedIcon />
            Settings
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/admin/")}>
            <HomeOutlinedIcon />
            Home
          </Button>

          <Button onClick={() => navigate("/admin/activeorders")}>
            <HistoryIcon />
            Active Orders
          </Button>

          <Button onClick={() => navigate("/admin/allorders")}>
            <MoreHorizOutlinedIcon />
            Orders History
          </Button>

          <Button onClick={() => navigate("/admin/foods")}>
            <RestaurantIcon /> Food
          </Button>

          <Button onClick={() => navigate("/admin/chefs")}>
            <ManageAccountsIcon /> chefs
          </Button>
          <Button onClick={() => navigate("/admin/users")}>
            <PersonOutlineIcon /> User
          </Button>
        </>
      )}

      <Button onClick={handleOpenDialog}>
        <LogoutIcon />
        Logout
      </Button>

      <DialogBox
        isOpen={dialog}
        close={() => setDialog(false)}
        Confirm={handleConfirm}
        Cancel={handleCancel}
        text="Logout"
      />
    </Container>
  );
};

export default Sidebar;
