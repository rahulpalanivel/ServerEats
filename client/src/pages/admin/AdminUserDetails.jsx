import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getOrder } from "../../api";

const Container = styled.div`
  padding-bottom: 20px;
  width: 80vw;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
`;

const Title = styled.div`
  padding: 3px;
  font-size: 36px;
  font-weight: 500;
  display: flex;
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`;

const Details = styled.div`
  font-size: 20px;
  font-weight: 200;
  display: flex;
  flex-direction: column;
  color: black;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 30px;
`;

const Detail = styled.text`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  display: flex;
  width: 70%;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Protitle = styled.div`
  color: black;
  font-size: 20px;
`;

const Tile = styled.div`
  padding: 20px;
  min-height: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.primary + 60};
  text-align: center;
`;

const AdminUserDetails = () => {
  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate();

  const showOrder = async (item) => {
    const token = localStorage.getItem("ServerEats");
    await getOrder(token, item).then((res) => {
      navigate("/details", { state: res.data });
    });
  };

  return (
    <Container>
      <Title>User Details</Title>
      <Details>
        <Detail>Name: {user.name}</Detail>
        <Detail>Email: {user.email}</Detail>
        <Detail>Orders: {user.orders.length}</Detail>
      </Details>
      <Title>User Orders</Title>
      <Wrapper>
        <Left>
          {user.orders.map((item) => (
            <Tile onClick={() => showOrder(item)}>
              <Protitle>Order ID : {item}</Protitle>
            </Tile>
          ))}
        </Left>
      </Wrapper>
    </Container>
  );
};
export default AdminUserDetails;
