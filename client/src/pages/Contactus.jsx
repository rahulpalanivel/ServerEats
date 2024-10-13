import styled from "styled-components";
import TextInput from "../components/TextInput";
import img from "../utils/Images/reception.jpg";

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
  padding: 20px;
  width: 60%;
  gap: 32px;
`;

const Right = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  width: 40%;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Text = styled.div`
  font-size: 20px;
  text-align: center;
  width: 100%;
  padding: 20px;
  color: ${({ theme }) => theme.primary};
`;

const Contactus = () => {
  return (
    <Container>
      <Section>
        <Left>
          <Title>Contact Us</Title>
          <Text>
            Have anything to say to us? Please feel free to reach out to us
          </Text>
          <br></br>
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            handelChange={(e) => {}}
          />
          <br></br>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            handelChange={(e) => {}}
          />
          <br></br>
          <TextInput
            label="Message"
            placeholder="Enter your message"
            textArea
            rows={7}
            handelChange={(e) => {}}
          />
        </Left>
        <Right>
          <Img src={img} />
        </Right>
      </Section>
    </Container>
  );
};

export default Contactus;
