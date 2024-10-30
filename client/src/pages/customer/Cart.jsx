import { DeleteOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import {
  addToCart,
  deleteAllFromCart,
  deleteFromCart,
  getCart,
  placeOrder,
} from "../../api";
import Button from "../../components/Button";
import DialogBox from "../../components/DialogBox";
import TextInput from "../../components/TextInput";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";

const Container = styled.div`
  padding: 80px 0px 0px 0px;
  padding-bottom: 100px;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  width: 100vw;
  min-height: 80vh;
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
  ${({ padding }) => padding && `padding: 0px 80px;`}
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
  flex: 1;
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
const Action = styled.div`
  cursor: pointer;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [location, setLocation] = useState("");
  const [dialog, setDialog] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("ServerEats");
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

  const PlaceOrder = async () => {
    setButtonLoad(true);
    try {
      const token = localStorage.getItem("ServerEats");
      const totalAmount = calculateSubtotal().toFixed(2);
      const orderDetails = {
        products: products,
        location: location,
        totalAmount: totalAmount,
      };

      if (location.trim().length === 0) {
        const err = new Error();
        err.message = "Enter Table Number";
        throw err;
      }

      await placeOrder(token, orderDetails);
      toast.success("Order placed successfully");
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
      toast.error(err.message);
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleConfirm = async () => {
    await PlaceOrder();
    setDialog(false);
  };

  const handleCancel = () => {
    setDialog(false);
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  const addCart = async (id) => {
    const token = localStorage.getItem("ServerEats");
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
    const token = localStorage.getItem("ServerEats");
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
    const token = localStorage.getItem("ServerEats");
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
      <ToastContainer />
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
                            <Action
                              onClick={() =>
                                removeCart(
                                  item?.product?._id,
                                  item?.quantity - 1
                                )
                              }
                            >
                              -
                            </Action>
                            {item?.quantity}
                            <Action onClick={() => addCart(item?.product?._id)}>
                              +
                            </Action>
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

                      <Buttony>
                        <TextInput
                          small
                          placeholder="Table Number"
                          handelChange={(e) => {
                            setLocation(e.target.value);
                          }}
                        />
                      </Buttony>

                      <Buttonx>
                        <Button
                          text="Clear Cart"
                          small
                          onClick={deleteCart}
                          isLoading={buttonLoad}
                          isDisabled={buttonLoad}
                        />
                      </Buttonx>
                      <Buttonx>
                        <Button
                          text="Place Order"
                          small
                          onClick={handleOpenDialog}
                          isLoading={buttonLoad}
                          isDisabled={buttonLoad}
                        />
                      </Buttonx>
                      <DialogBox
                        isOpen={dialog}
                        close={() => setDialog(false)}
                        Confirm={handleConfirm}
                        Cancel={handleCancel}
                        text="Place Order"
                      />
                    </Line>
                  </Tile>
                </Left>
              </Wrapper>
            )}
          </>
        )}
      </Section>
    </Container>
  );
};

export default Cart;
