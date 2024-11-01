import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { addProduct } from "../../api";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

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
  //padding-bottom: 20px;
  width: 80vw;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  min-height: 90vh;
`;

const Box = styled.div`
  width: 50%;
  //border: 2px solid black;
`;

const AdminNewFood = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  const addFood = async () => {
    const token = localStorage.getItem("ServerEats");
    if (
      name.trim().length === 0 ||
      desc.trim().length === 0 ||
      link.trim().length === 0 ||
      price.trim().length === 0 ||
      category.trim().length === 0 ||
      ingredient.trim().length === 0
    ) {
      toast.error("All Fields are required");
    } else {
      const ing = ingredient.split(",");
      const cat = category.split(",");
      const data = {
        name: name,
        desc: desc,
        img: link,
        price: price,
        ingredients: ing,
        category: cat,
      };
      await addProduct(token, data);
      toast.success("Order placed successfully");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Title>New Product</Title>
      <Box>
        <TextInput
          label="Food Name"
          placeholder="Food Name"
          handelChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br></br>
        <TextInput
          label="Description"
          placeholder="Description"
          handelChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <br></br>
        <TextInput
          label="Image Link"
          placeholder="Image Link"
          handelChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <br></br>
        <TextInput
          label="Price"
          placeholder="Price"
          handelChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br></br>
        <TextInput
          label="Category"
          placeholder="Category (Each comma separated)"
          handelChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <br></br>
        <TextInput
          label="Ingrediants"
          placeholder="Ingrediants (Each comma separated)"
          handelChange={(e) => {
            setIngredient(e.target.value);
          }}
        />
      </Box>
      <Button text="Add new Product" onClick={() => addFood()} />
    </Container>
  );
};

export default AdminNewFood;
