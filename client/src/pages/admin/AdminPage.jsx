import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import AdminDashboard from "./AdminDashboard";

const Admin = () => {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 80px 0px 0px 0px;
    background-color: ${({ theme }) => theme.bg};
  `;
  const Left = styled.div`
    position: sticky;
    top: 80px;
    padding: 10px;
    background-color: ${({ theme }) => theme.bg};
    width: 18%;
    max-height: 780px;
  `;
  const Right = styled.div`
    overflow-y: scroll;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.bg};
  `;
  return (
    <Container>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        <AdminDashboard />
      </Right>
    </Container>
  );
};

export default Admin;
