import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import ProtectedRoute from "./config/routeProtector";
import Aboutus from "./pages/Aboutus";
import Authentication from "./pages/Authentication";
import Contactus from "./pages/Contactus";
import Error from "./pages/Error";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import Home from "./pages/Home";
import Admin from "./pages/admin/AdminPage";
import Chef from "./pages/chef/ChefPage";
import Cart from "./pages/customer/Cart";
import Detail from "./pages/customer/OrderDetails";
import Orders from "./pages/customer/Orders";
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
          {currentUser === null || currentUser.role === "customer" ? (
            <Navbar
              setOpenAuth={setOpenAuth}
              openAuth={openAuth}
              currentUser={currentUser}
            />
          ) : (
            <></>
          )}
          <Routes>
            <Route path="/" exact element={<Home />} />

            <Route path="/dishes/:id" exact element={<FoodDetails />} />
            <Route path="/dishes" exact element={<FoodListing />} />
            <Route path="/aboutus" exact element={<Aboutus />} />
            <Route path="/contactus" exact element={<Contactus />} />
            <Route path="*" exact element={<Error />} />

            <Route
              path="/auth"
              element={
                <Authentication setOpenAuth={setOpenAuth} openAuth={true} />
              }
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/cart" exact element={<Cart />} />
              <Route path="/orders" exact element={<Orders />} />
              <Route path="/details" exact element={<Detail />} />

              <Route path="/chef" exact element={<Chef />} />
              <Route path="/admin" exact element={<Admin />} />
            </Route>
          </Routes>

          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}

          {currentUser === null || currentUser.role === "customer" ? (
            <Footer />
          ) : (
            <></>
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
