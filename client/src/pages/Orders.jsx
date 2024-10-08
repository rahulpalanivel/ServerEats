import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrders } from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const getAllOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("foodeli-app-token");
    await getOrders(token).then((res) => {
      console.log(res.data);
      setOrders(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllOrders();
  }, [reload]);

  const Container = styled.div`
    padding: 80px 0px 0px 0px;
    padding-bottom: 200px;
    min-height: 500px;
    max-width: 100%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    @media (max-width: 768px) {
      padding: 20px 12px;
    }
    background: ${({ theme }) => theme.bg};
  `;
  const Section = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 22px;
    gap: 28px;
  `;
  const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    display: flex;
    justify-content: ${({ center }) => (center ? "center" : "space-between")};
    align-items: center;
  `;

  const Wrapper = styled.div`
    display: flex;
    gap: 32px;
    width: 100%;
    padding: 0px;
  `;
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 12px;
    @media (max-width: 750px) {
      flex: 1.2;
    }
  `;
  const Table = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 30px;
    ${({ head }) => head && `margin-bottom: 22px`}
  `;
  const TableItem = styled.div`
    ${({ flex }) => flex && `flex: 1; `}
    ${({ bold }) =>
      bold &&
      `font-weight: 600;
  font-size: 18px;`}
  `;
  const Counter = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.text_secondary + 40};
    border-radius: 8px;
    padding: 4px 12px;
  `;

  const Product = styled.div`
    display: flex;
    gap: 16px;
  `;
  const Img = styled.img`
    width: 200px;
    height: 150px;
  `;
  const Details = styled.div`
    max-width: 130px;
    @media (max-width: 700px) {
      max-width: 60px;
    }
  `;
  const Protitle = styled.div`
    color: black;
    font-size: 16px;
    font-weight: 500;
  `;
  const ProDesc = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
  // const ProSize = styled.div`
  //   font-size: 14px;
  //   font-weight: 500;
  // `;

  const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    @media (max-width: 750px) {
      flex: 0.8;
    }
  `;
  const Subtotal = styled.div`
    font-size: 22px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  `;
  const Delivery = styled.div`
    font-size: 18px;
    font-weight: 500;
    display: flex;
    gap: 6px;
    flex-direction: column;
  `;

  return (
    <Container>
      <h1>Your previous orders</h1>
      <Wrapper>
        <Left>
          <Table>
            <TableItem bold flex>
              Location
            </TableItem>
            <TableItem bold>Date</TableItem>
            <TableItem bold>Subtotal</TableItem>
            <TableItem bold>Status</TableItem>
          </Table>
          {orders.map((item) => (
            <Table>
              <TableItem flex>
                <Product>
                  <Details>
                    <Protitle>{item.location}</Protitle>
                  </Details>
                </Product>
              </TableItem>
              <TableItem>{item.createdAt.split("T")[0]}</TableItem>
              <TableItem>${item.total_amount}</TableItem>
              <TableItem>{item.status}</TableItem>
            </Table>
          ))}
        </Left>
      </Wrapper>
    </Container>
  );
};

export default Orders;
