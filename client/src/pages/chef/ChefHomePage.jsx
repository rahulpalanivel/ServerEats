import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getOrders, updateOrder } from "../../api";
import Button from "../../components/Button";

const ChefHome = () => {
  const location = useLocation();
  const name = location.state.name;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const getAllOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("ServerEats");
    await getOrders(token).then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  };

  const updateOrders = async (id, status) => {
    setLoading(true);
    const token = localStorage.getItem("ServerEats");
    const data = { id: id, status: status };
    await updateOrder(token, data).then((res) => {
      setLoading(false);
      setReload(!reload);
    });
  };

  useEffect(() => {
    getAllOrders();
  }, [reload]);

  const showOrder = (item) => {
    navigate("/details", { state: item });
  };

  const Container = styled.div`
    // padding: 80px 0px 0px 0px;
    // padding-bottom: 100px;
    // min-height: 680px;
    // max-width: 100%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: ${({ theme }) => theme.bg};
  `;

  const Title = styled.div`
    padding: 3px;
    font-size: 36px;
    font-weight: 500;
    display: flex;
    color: ${({ theme }) => theme.primary};
    justify-content: ${({ center }) => (center ? "center" : "space-between")};
    align-items: center;
  `;

  const Wrapper = styled.div`
    display: flex;
    width: 95%;
  `;
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    @media (max-width: 750px) {
      flex: 1.2;
    }
  `;
  const Table = styled.div`
    padding: 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 40px;
    ${({ head }) => head && `margin-bottom: 22px`}
  `;
  const TableItem = styled.div`
    ${({ padding }) => padding && `padding: 0px 60px;`}
    ${({ flex }) => flex && `flex: 1; `}
${({ bold }) =>
      bold &&
      `font-weight: 600;
font-size: 20px;`}
  `;

  const Product = styled.div`
    display: flex;
    gap: 16px;
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

  const Tile = styled.div`
    padding: 20px;
    min-height: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.primary + 60};
  `;

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Title>All orders</Title>
          <Wrapper>
            <Left>
              <Table>
                <TableItem bold flex padding>
                  Location
                </TableItem>
                <TableItem bold>Date</TableItem>
                <TableItem bold>Subtotal</TableItem>
                <TableItem bold>Status</TableItem>
              </Table>
              {orders.map((item) => (
                <Tile onClick={() => showOrder(item)}>
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
                    {item.status === "Order-Pending" ? (
                      <TableItem>
                        <Button
                          text="Accept Order"
                          small
                          onClick={() => {
                            updateOrders(item._id, "preparing");
                          }}
                        />
                      </TableItem>
                    ) : item.status === "preparing" ? (
                      <TableItem>
                        <Button
                          text="Deliver"
                          small
                          onClick={() => {
                            updateOrders(item._id, "Delivered");
                          }}
                        />
                      </TableItem>
                    ) : (
                      <></>
                    )}
                  </Table>
                </Tile>
              ))}
            </Left>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default ChefHome;
