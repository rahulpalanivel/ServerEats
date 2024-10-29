import { ShoppingBagOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../../api";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";

const Card = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 180px;
  }
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.black + 10};
  &:hover {
    box-shadow: 5px 5px 20px 10px ${({ theme }) => theme.primary + 50};
  }
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
  @media (max-width: 600px) {
    height: 180px;
  }
`;
const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 14px;
  right: 14px;
  display: none;
  flex-direction: column;
  gap: 12px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.black};
  }

  &:hover ${Image} {
    opacity: 0.9;
  }
  &:hover ${Menu} {
    display: flex;
  }
`;
const MenuItem = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;
const Rate = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  opacity: 0.9;
`;
const Details = styled.div`
  display: flex;
  height: 100px;
  gap: 6px;
  flex-direction: column;
  padding: 4px 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  height: fit-content;
  white-space: normal;
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCart = async (id) => {
    const token = localStorage.getItem("ServerEats");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        navigate("/cart");
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  return (
    <Card>
      <Top>
        <Image src={product?.img} />
        <Menu>
          <MenuItem onClick={() => addCart(product?._id)}>
            <ShoppingBagOutlined sx={{ fontSize: "20px" }} />
          </MenuItem>
        </Menu>
        <Rate>
          <Rating value={3.5} sx={{ fontSize: "14px" }} />
        </Rate>
      </Top>
      <Details onClick={() => navigate(`/dishes/${product._id}`)}>
        <Title>{product?.name}</Title>
        <Desc>{product?.category[0]}</Desc>
        <Price>₹{product?.price}</Price>
      </Details>
    </Card>
  );
};

export default ProductsCard;
