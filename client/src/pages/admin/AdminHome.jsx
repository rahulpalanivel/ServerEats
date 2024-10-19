import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getOrdersByChef } from "../../api";

const AdminHome = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;

  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [earned, setEarned] = useState(0);

  const getAllOrders = async () => {
    const token = localStorage.getItem("ServerEats");
    await getOrdersByChef(token).then((res) => {
      setTotal(res.data.filter((a) => a.status === "Delivered").length);
      setActive(res.data.filter((a) => a.status === "preparing").length);
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const Container = styled.div`
    padding: 50px;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: ${({ theme }) => theme.bg};
  `;
  const Title = styled.div`
    padding: 10px;
    font-size: 50px;
    font-weight: 500;
    display: flex;
    color: ${({ theme }) => theme.primary};
    justify-content: center;
    align-items: center;
  `;
  const SubTitle = styled.div`
    padding: 10px;
    font-size: 60px;
    font-weight: 500;
    display: flex;
    color: ${({ theme }) => theme.primary};
    justify-content: center;
    align-items: center;
  `;
  const Stats = styled.div`
    padding: 20px;
  `;
  const Heading = styled.div``;
  const Data = styled.div`
    padding: 20px;
    font-size: 30px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
  `;
  return (
    <Container>
      <Heading>
        <Title>Welcome back Admin </Title>
        <SubTitle>{user.name}</SubTitle>
      </Heading>
      <br></br>
      <br></br>
      <br></br>
      <Stats>
        <Data>Orders Completed: {total}</Data>
        <Data>Active Orders: {active}</Data>
        <Data>Revenue Generated: {earned}</Data>
      </Stats>
    </Container>
  );
};

export default AdminHome;
