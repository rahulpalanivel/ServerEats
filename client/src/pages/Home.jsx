import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllProducts } from "../api";
import Button from "../components/Button";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductsCard from "../components/cards/ProductsCard";
import Footer from "../components/footer";
import AutoImageSlider from "../components/imageSlider";
import { category } from "../utils/data";
import HomeImage from "../utils/Images/Home1.jpg";

const Container = styled.div`
  padding-bottom: 100px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background-color: rgb(249, 249, 249);
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // gap: 30px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  padding: 20px;
  font-size: 30px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ImgText = styled.div`
  width: 1000px;
  position: absolute;

  left: 17%;
  top: 25%;
  font-size: 80px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;

const Buttonx = styled.div`
  position: absolute;
  color: white;
  left: 43%;
  top: 45%;
  width: 200px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 1420px;
  background-color: ${({ theme }) => theme.primary};
`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data.slice(0, 7));
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container>
        <Section>
          <Img src={HomeImage} />
          <Row>yo</Row>
        </Section>

        <ImgText>Welcome to ServerEats </ImgText>
        <Buttonx>
          <Button text="Explore" onClick={() => navigate("/dishes")}>
            Explore
          </Button>
        </Buttonx>
        <Section></Section>
        <Section>
          <AutoImageSlider />
        </Section>
        <Section>
          <Title>Food Categories</Title>
          <CardWrapper>
            {category.map((category) => (
              <ProductCategoryCard category={category} />
            ))}
          </CardWrapper>
        </Section>
        <Section>
          <Title>Most Popular</Title>
          {loading ? (
            <CircularProgress />
          ) : (
            <CardWrapper>
              {products.map((product) => (
                <ProductsCard product={product} />
              ))}
            </CardWrapper>
          )}
        </Section>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
