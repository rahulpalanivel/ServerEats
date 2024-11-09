import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProductDetails } from "../api";
import Button from "../components/Button";

const Container = styled.div`
  padding: 80px 0px 0px 0px;
  padding-bottom: 100px;
  width: 100vw;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  gap: 28px;
`;
const Title = styled.div`
  padding: 20px;
  font-size: 36px;
  font-weight: 500;
  display: flex;
  color: ${({ theme }) => theme.primary};
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const SubTitle = styled.div`
  width: 90%;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  color: ${({ theme }) => theme.primary};
  justify-content: center;
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
  ${({ padding }) => padding && `padding: 0px 20px;`}
  ${({ flex }) => flex && `flex: 1; `}
  ${({ bold }) =>
    bold &&
    `font-weight: 600;
  font-size: 20px;`}
  color: black;
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
  border-radius: 15px;
  width: 200px;
  height: 150px;
`;
const Details = styled.div`
  max-width: 300px;
`;
const Protitle = styled.div`
  padding: 50px;
  color: black;
  font-size: 20px;
  font-weight: 500;
`;

const Subtotal = styled.div`
  padding: 20px;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.primary};
`;

const Tile = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.primary + 60};
`;

const Line = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Buton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Detail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;

  const location = useLocation();
  const order = location.state;

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const showDish = (id) => {
    navigate(`/dishes/${id}`);
  };

  const calculateSubtotal = () => {
    return order.products.reduce((total, item, index) => {
      const product = productData[index];
      return total + item.quantity * (product ? product.price : 0);
    }, 0);
  };

  const getProduct = async (id) => {
    const response = await getProductDetails(id);
    return response.data;
  };

  const loadProducts = async () => {
    setLoading(true);
    const promises = order.products.map((item) => getProduct(item.product));
    const data = await Promise.all(promises);
    setProductData(data);
    setLoading(false);
  };

  const Chat = (data) => {
    navigate("/chat", { state: data });
  };

  useEffect(() => {
    loadProducts();
  }, [order]);

  return (
    <Container>
      <Section>
        {user.role === "customer" ? (
          <>
            <Title> Thank you for ordering with ServerEats</Title>
            <SubTitle>Order ID : {order._id}</SubTitle>
          </>
        ) : (
          <>
            <Title> Order ID : {order._id}</Title>
            <SubTitle>Customer ID : {order.user}</SubTitle>
          </>
        )}

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {order.length === 0 ? (
              <>Empty</>
            ) : (
              <Wrapper>
                <Left>
                  <Table>
                    <TableItem bold flex padding>
                      Product
                    </TableItem>
                    <TableItem bold>Price</TableItem>
                    <TableItem bold>Quantity</TableItem>
                    <TableItem bold>Subtotal</TableItem>
                  </Table>
                  {productData.map((product, index) => (
                    <Tile
                      onClick={
                        user.role === "customer"
                          ? () => showDish(product._id)
                          : {}
                      }
                    >
                      <Table>
                        <TableItem flex>
                          <Product>
                            <Img src={product.img} />
                            <Details>
                              <Protitle>{product.name}</Protitle>
                            </Details>
                          </Product>
                        </TableItem>
                        <TableItem padding>₹{product.price}</TableItem>
                        <TableItem padding>
                          <Counter>{order.products[index].quantity} </Counter>
                        </TableItem>
                        <TableItem padding>
                          ₹
                          {(
                            order.products[index].quantity * product.price
                          ).toFixed(2)}
                        </TableItem>
                      </Table>
                    </Tile>
                  ))}
                  <Tile>
                    <Line>
                      <Subtotal>
                        Subtotal : ₹{calculateSubtotal().toFixed(2)}
                      </Subtotal>
                      <Subtotal>Table: {order.location}</Subtotal>
                      <Subtotal>Date: {order.createdAt.split("T")[0]}</Subtotal>
                      <Subtotal>
                        Time: {order.createdAt.split("T")[1].split(".")[0]}
                      </Subtotal>
                      {order.status === "Delivered" ? (
                        <Subtotal>
                          Completed:{" "}
                          {order.updatedAt.split("T")[1].split(".")[0]}
                        </Subtotal>
                      ) : (
                        <></>
                      )}

                      <Subtotal>Status: {order.status}</Subtotal>
                    </Line>
                  </Tile>
                  {order.status !== "Order-Pending" ? (
                    <Buton>
                      <Button
                        text="Chat"
                        small
                        onClick={() => Chat(order.assigned)}
                      />
                    </Buton>
                  ) : (
                    <></>
                  )}
                </Left>
              </Wrapper>
            )}
          </>
        )}
      </Section>
    </Container>
  );
};

export default Detail;
