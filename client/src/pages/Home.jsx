import { CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProducts } from "../api";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductsCard from "../components/cards/ProductsCard";
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
  max-width: 1400px;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
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

const ImgText = styled.div`
  width: 1000px;
  position: absolute;
  color: white;
  font-size: 80px;
  left: 17%;
  top: 25%;
`;

const Button = styled.div`
  position: absolute;
  color: white;
  left: 43%;
  top: 55%;
`;

const Row = styled.div``;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

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
    <Container>
      <img src={HomeImage} height={600} width={1400} />
      <ImgText>Welcome to ServerEats </ImgText>
      <Button>
        <button
          title="Explore"
          style={{
            height: 50,
            width: 200,
            borderRadius: 20,
            background: blue,
          }}
        >
          Explore
        </button>
      </Button>
      <Section>
        <Row></Row>
      </Section>
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
  );
};

export default Home;
