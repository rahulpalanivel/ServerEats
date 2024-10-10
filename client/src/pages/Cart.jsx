import { DeleteOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  addToCart,
  deleteAllFromCart,
  deleteFromCart,
  getCart,
  placeOrder,
} from "../api";
import Button from "../components/Button";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

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
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  width: 100%;
  max-width: 1400px;
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

const Wrapper = styled.div`
  display: flex;
  width: 95%;
  // gap: 32px;
  // padding: 12px;
  // @media (max-width: 750px) {
  //   flex-direction: column;
  // }
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
  ${({ padding }) => padding && `padding: 0px 80px;`}
  ${({ flex }) => flex && `flex: 1; `}
  ${({ bold }) =>
    bold &&
    `font-weight: 600;
  font-size: 20px;`}
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
  @media (max-width: 700px) {
    max-width: 60px;
  }
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
`;

const Buttonx = styled.div`
  max-width: 300px;
  padding: 20px;
`;
const Buttony = styled.div`
  max-width: 300px;
  padding: 20px;
`;

const InputBox = styled.input`
  padding: 0px 10px 0px 0px;
  height: 40px;
  border: solid 2px ${({ theme }) => theme.primary};
  border-radius: 10px;
  background: white;

  &:focus {
    border: solid 2px ${({ theme }) => theme.primary};
  }
`;

const Cart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("foodeli-app-token");
    await getCart(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.product?.price,
      0
    );
  };

  const getLocation = () => {
    return document.getElementById("inp").value;
  };

  const PlaceOrder = async () => {
    setButtonLoad(true);
    try {
      const token = localStorage.getItem("foodeli-app-token");
      const totalAmount = calculateSubtotal().toFixed(2);
      const location = getLocation();
      const orderDetails = {
        products: products,
        location: location,
        totalAmount: totalAmount,
      };

      await placeOrder(token, orderDetails);
      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );

      setButtonLoad(false);
      await deleteCart();
      setReload(!reload);
    } catch (err) {
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  const addCart = async (id) => {
    const token = localStorage.getItem("foodeli-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("foodeli-app-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    await deleteFromCart(token, {
      productId: id,
      quantity: qnt,
    })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const deleteCart = async () => {
    const token = localStorage.getItem("foodeli-app-token");
    await deleteAllFromCart(token)
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  return (
    <Container>
      <Section>
        <Title>Your Items in Cart</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {products.length === 0 ? (
              <>Cart is empty</>
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
                    <TableItem></TableItem>
                  </Table>
                  {products.map((item) => (
                    <Tile>
                      <Table>
                        <TableItem flex>
                          <Product>
                            <Img src={item?.product?.img} />
                            <Details>
                              <Protitle>{item?.product?.name}</Protitle>
                            </Details>
                          </Product>
                        </TableItem>
                        <TableItem>₹{item?.product?.price}</TableItem>
                        <TableItem>
                          <Counter>
                            <div
                              style={{
                                cursor: "pointer",
                                flex: 1,
                              }}
                              onClick={() =>
                                removeCart(
                                  item?.product?._id,
                                  item?.quantity - 1
                                )
                              }
                            >
                              -
                            </div>
                            {item?.quantity}{" "}
                            <div
                              style={{
                                cursor: "pointer",
                                flex: 1,
                              }}
                              onClick={() => addCart(item?.product?._id)}
                            >
                              +
                            </div>
                          </Counter>
                        </TableItem>
                        <TableItem>
                          {" "}
                          ₹{(item.quantity * item?.product?.price).toFixed(2)}
                        </TableItem>
                        <TableItem>
                          <DeleteOutline
                            sx={{ color: "red" }}
                            onClick={() =>
                              removeCart(
                                item?.product?._id,
                                item?.quantity - 1,
                                "full"
                              )
                            }
                          />
                        </TableItem>
                      </Table>
                    </Tile>
                  ))}
                  <Tile>
                    <Line>
                      <Subtotal>
                        Subtotal : ₹{calculateSubtotal().toFixed(2)}
                      </Subtotal>
                      <Buttonx>
                        <Button
                          text="Place Order"
                          small
                          onClick={PlaceOrder}
                          isLoading={buttonLoad}
                          isDisabled={buttonLoad}
                        />
                      </Buttonx>
                      <Buttonx>
                        <Button
                          text="Clear Cart"
                          small
                          onClick={deleteCart}
                          isLoading={buttonLoad}
                          isDisabled={buttonLoad}
                        />
                      </Buttonx>
                      <Buttony>
                        <InputBox id="inp" placeholder="Table Number" />
                      </Buttony>
                    </Line>
                  </Tile>
                </Left>

                {/* <Right>
                  <Subtotal>
                    Subtotal : ${calculateSubtotal().toFixed(2)}
                  </Subtotal>
                  <Delivery>
                    Delivery Details:
                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <TextInput
                          small
                          placeholder="First Name"
                          value={deliveryDetails.firstName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              firstName: e.target.value,
                            })
                          }
                        />
                        <TextInput
                          small
                          placeholder="Last Name"
                          value={deliveryDetails.lastName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <TextInput
                        small
                        placeholder="Email Address"
                        value={deliveryDetails.emailAddress}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            emailAddress: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Phone no. +91 XXXXX XXXXX"
                        value={deliveryDetails.phoneNumber}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        textArea
                        rows="5"
                        placeholder="Complete Address (Address, State, Country, Pincode)"
                        value={deliveryDetails.completeAddress}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            completeAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Delivery>
                  <Delivery>
                    Payment Details:
                    <div>
                      <TextInput small placeholder="Card Number" />
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <TextInput small placeholder="Expiry Date" />
                        <TextInput small placeholder="CVV" />
                      </div>
                      <TextInput small placeholder="Card Holder name" />
                    </div>
                  </Delivery>
                </Right> */}
              </Wrapper>
            )}
          </>
        )}
      </Section>
    </Container>
  );
};

export default Cart;
