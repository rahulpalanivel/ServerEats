import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProducts } from "../api";
import head1 from "../assets/Images/Head1.jpg";
import head2 from "../assets/Images/Head2.jpg";
import head3 from "../assets/Images/Head3.jpg";
import ProductCard from "../components/cards/ProductsCard";
import AutoImageSlider from "../components/imageSlider";
import { filter } from "../utils/data";

const Container = styled.div``;

const Box = styled.div`
  display: flex;
  padding: 20px 0;
  background: ${({ theme }) => theme.bg};
`;

const Menu = styled.div`
  padding: 20px;
  width: 25%;
  position: sticky;
  top: 90px;
  gap: 4px;
`;

const Products = styled.div`
  flex: 1; /* Allow Products to take the remaining space */
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

const FilterSection = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
  font-weight: 500;
`;

const MainTitle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.primary};
  font-size: 40px;
  font-weight: 500;
  padding: 30px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 300;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Selectableitem = styled.div`
  cursor: pointer;
  display: flex;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  color: ${({ theme }) => theme.text_secondary + 90};
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 16px;
  width: fit-content;
  ${({ selected, theme }) =>
    selected &&
    `
  border: 1px solid ${theme.primary};
  color: white;
  background: ${theme.primary};
  font-weight: 500;
  `}
`;

const Hero = styled.div`
  padding: 100px 0 0 0;
`;

const FoodListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [selectedCategories, setSelectedCategories] = useState([]); // Default selected categories

  const getFilteredProductsData = async () => {
    setLoading(true);
    // Call the API function for filtered products
    await getAllProducts(
      selectedCategories.length > 0
        ? `minPrice=${priceRange[0]}&maxPrice=${
            priceRange[1]
          }&categories=${selectedCategories.join(",")}`
        : `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
    ).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFilteredProductsData();
  }, [priceRange, selectedCategories]);

  const images = [head1, head2, head3];

  return (
    <Container>
      <Hero>
        <AutoImageSlider images={images} />
      </Hero>
      <Box>
        <Menu>
          {filter.map((filters) => (
            <FilterSection key={filters.name}>
              <Title>{filters.name}</Title>
              {filters.value === "price" ? (
                <Slider
                  aria-label="Price"
                  defaultValue={priceRange}
                  min={0}
                  max={1000}
                  valueLabelDisplay="auto"
                  style={{
                    color: "#aba945",
                  }}
                  marks={[
                    { value: 0, label: "₹0" },
                    { value: 1000, label: "₹1000" },
                  ]}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                />
              ) : filters.value === "category" ? (
                filters.sub.map((item) => (
                  <>
                    <SubTitle key={item.name}>{item.name}</SubTitle>
                    <Item>
                      {item.items.map((it) => (
                        <Selectableitem
                          key={it}
                          selected={selectedCategories.includes(it)}
                          onClick={() =>
                            setSelectedCategories((prevCategories) =>
                              prevCategories.includes(it)
                                ? prevCategories.filter(
                                    (category) => category !== it
                                  )
                                : [...prevCategories, it]
                            )
                          }
                        >
                          {it}
                        </Selectableitem>
                      ))}
                    </Item>
                  </>
                ))
              ) : null}
            </FilterSection>
          ))}
        </Menu>

        <Products>
          <MainTitle>Menu</MainTitle>
          <CardWrapper>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </CardWrapper>
        </Products>
      </Box>
    </Container>
  );
};

export default FoodListing;
