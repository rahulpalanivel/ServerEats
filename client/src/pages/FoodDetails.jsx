import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { addToCart, getProductDetails } from "../api";
import Button from "../components/Button";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  flex: 1;
  display: flex;
  gap: 40px;
  justify-content: center;
`;

const ImagesWrapper = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  border-radius: 12px;
  object-fit: cover;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Ingridents = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: ${({ theme }) => theme.primary};
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Item = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  padding: 4px 12px;
  display: flex;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
`;

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const notify = () => toast.success("Item added to cart Successfully");
  const notifyy = () => toast.error("Please SignIn/SignUp to proceed");
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;

  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const cartAdd = () => {
    addCart();
    notify();
  };

  const add = () => {
    user === null ? notifyy() : cartAdd();
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("ServerEats");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setCartLoading(false);
      })
      .catch((err) => {
        setCartLoading(false);
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
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImagesWrapper>
            <Image src={product?.img} />
          </ImagesWrapper>
          <Details>
            <div>
              <Title>{product?.name}</Title>
            </div>
            <Rating value={3.5} />
            <Price>₹{product?.price}</Price>

            <Desc>{product?.desc}</Desc>

            <Ingridents>
              Ingredients
              <Items>
                {product?.ingredients.map((ingredient) => (
                  <Item>{ingredient}</Item>
                ))}
              </Items>
            </Ingridents>

            <ButtonWrapper>
              <Button
                text="Add to Cart"
                full
                outlined
                isLoading={cartLoading}
                onClick={() => add()}
              />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                progressStyle={{ Color: "green" }}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Button text="Order Now" full onClick={() => {}} />
            </ButtonWrapper>
          </Details>
        </Wrapper>
      )}
    </Container>
  );
};

export default FoodDetails;
