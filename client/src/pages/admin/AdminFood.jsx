import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllProducts } from "../../api";
import Button from "../../components/Button";

const Title = styled.div`
  padding: 3px;
  font-size: 36px;
  font-weight: 500;
  display: flex;
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding-bottom: 20px;
  width: 80vw;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  width: 95%;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Table = styled.div`
  padding: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 40px;
  ${({ head }) => head && `margin-bottom: 22px`}
`;
const TableItem = styled.div`
  ${({ padding }) => padding && `padding: 0px 20px;`}
  ${({ flex }) => flex && `flex: 1; `}
  ${({ bold }) =>
    bold &&
    `font-weight: 600;
  font-size: 20px;`}
  color: black;
`;

const Product = styled.div`
  display: flex;
  gap: 16px;
`;
const Img = styled.img`
  border-radius: 15px;
  width: 200px;
  height: 150px;
`;
const Details = styled.div`
  max-width: 300px;
`;
const Protitle = styled.div`
  padding: 50px;
  color: black;
  font-size: 20px;
  font-weight: 500;
`;

const Tile = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.primary + 60};
`;

const AdminFood = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const LoadProduct = async () => {
    await getAllProducts().then((res) => {
      setProductData(res.data);
    });
  };

  useEffect(() => {
    LoadProduct();
  }, []);

  return (
    <Container>
      <Title>All Food</Title>
      <Wrapper>
        <Left>
          <Table>
            <TableItem bold flex padding>
              Product
            </TableItem>
            <TableItem bold padding>
              Cost
            </TableItem>
          </Table>
          {productData.map((product) => (
            <Tile>
              <Table>
                <TableItem flex>
                  <Product>
                    <Img src={product.img} />
                    <Details>
                      <Protitle>{product.name}</Protitle>
                    </Details>
                  </Product>
                </TableItem>
                <TableItem padding>₹{product.price}</TableItem>
              </Table>
            </Tile>
          ))}
          <Button
            text="Add new Product"
            onClick={() => navigate("/admin/foods/add")}
          />
        </Left>
      </Wrapper>
    </Container>
  );
};

export default AdminFood;
