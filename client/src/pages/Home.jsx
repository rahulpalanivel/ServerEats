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
import Cover from "../utils/Images/cover.jpg";
import HeaderImage1 from "../utils/Images/Header1.jpg";
import HeaderImage2 from "../utils/Images/Header2.jpg";
import HeaderImage3 from "../utils/Images/Header3.jpg";
import HomeImage from "../utils/Images/Home1.jpg";
import Option from "../utils/Images/options.png";
import Logo1 from "../utils/Images/smallLogo1.png";
import Logo2 from "../utils/Images/smallLogo2.png";
import Logo3 from "../utils/Images/smallLogo3.png";

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

const OptionImg = styled.img`
  object-fit: none;
`;

const ImgText = styled.div`
  position: absolute;
  top: 30%;
  width: 100%;
  text-align: center;
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

const Buttony = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  //top: 315%;
  width: 100%;
  justify-content: center;
  padding: 140px 0px 0px 0px;
`;

const CoverTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 40px;
  font-weight: 500;
  position: absolute;
  width: 100%;
  padding: 70px 0px 0px 0px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
`;

const Service = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 40px;
  color: ${({ theme }) => theme.primary};
`;

const ServiceP = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.primary};
`;

const Images = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-evenly;
`;

const SmallImg = styled.img`
  border-radius: 300px;
  height: 250px;
  object-fit: cover;
`;

const Imgdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 30%;
`;

const Para = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.primary};
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

  const images = [HeaderImage1, HeaderImage2, HeaderImage3];

  return (
    <>
      <Container>
        <Section>
          <Img src={HomeImage} />
          <Row>
            <OptionImg src={Option} />
          </Row>
          <ImgText>Welcome to ServerEats </ImgText>
          <Buttonx>
            <Button text="Explore" onClick={() => navigate("/dishes")}>
              Explore
            </Button>
          </Buttonx>
        </Section>

        <Section>
          <Service>Our Services</Service>
          <ServiceP>
            We offer various services to ensure complete customer satisfaction
            and an unforgettable experience.
          </ServiceP>
          <Images>
            <Imgdiv>
              <SmallImg src={Logo1} />
              <Para>
                We strive to provide our customers with an exquisite experiance.
                Every dish is prepared and processed with utmost care.
              </Para>
            </Imgdiv>
            <Imgdiv>
              <SmallImg src={Logo2} />
              <Para>
                Customers can directly communicate to chefs via our website to
                specify any changes in their food or recieve updates on their
                order.
              </Para>
            </Imgdiv>
            <Imgdiv>
              <SmallImg src={Logo3} />
              <Para>
                We ensure that our customers have all their needs catered to and
                make sure that they had a remarkable experiance.
              </Para>
            </Imgdiv>
          </Images>
        </Section>
        <Section>
          <AutoImageSlider images={images} />
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
          <Img src={Cover} />
          <CoverTitle>
            Have a look at our exquisite handcrafted menu{" "}
          </CoverTitle>
          <Buttony>
            <Button text="Order Now" small onClick={() => navigate("/dishes")}>
              Explore
            </Button>
          </Buttony>
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
