import styled from "styled-components";

const Container = styled.div`
  padding: 70px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
  color: ${({ theme }) => theme.primary};
`;

const Section = styled.div``;

const Left = styled.div`
  flex: 1;
  position: relative;
  border: solid 2px ${({ theme }) => theme.primary};
  //width: 75%;
`;

const Right = styled.div`
  flex: 0.9;
  position: relative;
  border: solid 2px black;
  background-color: ${({ theme }) => theme.bg};
  //width: 25%;
`;

const Aboutus = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Section>
        <Left></Left>
        <Right></Right>
      </Section>
    </Container>
  );
};

export default Aboutus;
