import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProducts } from "../api";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductsCard from "../components/cards/ProductsCard";
import AutoImageSlider from "../components/imageSlider";
import { category } from "../utils/data";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;SC
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
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
