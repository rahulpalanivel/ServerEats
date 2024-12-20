import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 80px 0px 0px 0px;
  width: 100vw;
  background-color: ${({ theme }) => theme.bg};
`;
const Left = styled.div`
  position: sticky;
  top: 80px;
  padding: 10px;
  background-color: ${({ theme }) => theme.bg};
  width: 18%;
  max-height: 90vh;
`;
const Right = styled.div`
  overflow-y: scroll;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.bg};
`;

const Chef = () => {
  return (
    <Container>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        <Outlet />
      </Right>
    </Container>
  );
};

export default Chef;
