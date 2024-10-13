import styled from "styled-components";
import aboutus from "../utils/Images/aboutus.jpg";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 80px 0px 0px 0px;
  min-height: 780px;
  height: 100%;
`;

const Title = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 40px;
  color: ${({ theme }) => theme.primary};
`;

const Section = styled.div`
  display: flex;
`;

const Left = styled.div`
  display: flex;
  width: 40%;
`;

const Right = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 60%;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Text = styled.div`
  font-size: 20px;
  padding: 40px;
  color: ${({ theme }) => theme.primary};
`;
const Aboutus = () => {
  return (
    <Container>
      <Section>
        <Left>
          <Img src={aboutus} />
        </Left>
        <Right>
          <Title>About Us</Title>
          <Text>
            Welcome to ServerEats, where we believe that great food should
            always be just a click away! Our mission is to provide you with the
            best culinary experiance, bringing delicious meals straight to your
            table.
            <br></br>
            <br></br>
            At ServerEats, we’ve curated a diverse variety of foods, from cozy
            cafes to gourmet dining, ensuring there’s something for every
            craving. Our user-friendly platform makes it easy to browse menus,
            place orders, and recieve updates in real-time via our chat
            features, where you can easily communicate with our highly trained
            chefs.
            <br></br>
            <br></br>
            We’re passionate about quality and convenience. Our dedicated team
            works tirelessly to partner with local chefs and food artisans who
            share our commitment to freshness and flavor. We prioritize
            sustainable practices and strive to minimize our environmental
            impact while supporting our community.
            <br></br>
            <br></br>
            Whether you’re enjoying a cozy night in, hosting a gathering, or
            simply need a quick meal on the go, ServerEats is here to make your
            dining experience seamless and enjoyable. Thank you for choosing us
            to satisfy your cravings. We can’t wait to serve you!
          </Text>
        </Right>
      </Section>
    </Container>
  );
};

export default Aboutus;
