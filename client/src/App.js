import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Aboutus from "./pages/Aboutus";
import Authentication from "./pages/Authentication";
import Cart from "./pages/Cart";
import Contactus from "./pages/Contactus";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import Home from "./pages/Home";
import Detail from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import { lightTheme } from "./utils/Themes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  //const { open, message, severity } = useSelector((state) => state.snackbar);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/dishes/:id" exact element={<FoodDetails />} />
            <Route path="/dishes" exact element={<FoodListing />} />
            <Route path="/orders" exact element={<Orders />} />
            <Route path="/details" exact element={<Detail />} />
            <Route path="/aboutus" exact element={<Aboutus />} />
            <Route path="/contactus" exact element={<Contactus />} />
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
