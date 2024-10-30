import styled from "styled-components";

const Container = styled.div`
  padding: 100px 0 0 0;
  min-height: 460px;
`;

const Title = styled.div`
  padding: 70px;
  text-align: center;
  font-size: 50px;
  color: ${({ theme }) => theme.primary};
`;

const Error = () => {
  return (
    <Container>
      <Title>Error: Page not Found</Title>
    </Container>
  );
};

export default Error;
