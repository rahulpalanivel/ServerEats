import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import HistoryIcon from "@mui/icons-material/History";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import styled from "styled-components";

const Sidebar = () => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 10px 0px 10px;
    height: 95%;
    background-color: white;
    border-radius: 15px;
    gap: 20px;
    border: 1px solid ${({ theme }) => theme.bg};
    box-shadow: 0px 0px 2px 0px grey;
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
  return (
    <Container>
      <Button onClick={() => {}}>
        <HomeOutlinedIcon></HomeOutlinedIcon>Home
      </Button>
      <Button onClick={() => {}}>
        <HistoryIcon></HistoryIcon>Get All Orders
      </Button>
      <Button onClick={() => {}}>
        <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
        Get Pending Orders
      </Button>
      <Button onClick={() => {}}>
        <DoneOutlinedIcon></DoneOutlinedIcon>Get Accepted Orders
      </Button>
      <Button>
        <SettingsOutlinedIcon></SettingsOutlinedIcon>Settings
      </Button>
    </Container>
  );
};

export default Sidebar;
