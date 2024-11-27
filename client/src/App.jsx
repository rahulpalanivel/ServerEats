import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./config/routeProtector";
import Aboutus from "./pages/Aboutus";
import AdminAccOrders from "./pages/admin/AdminAccOrders.jsx";
import AdminAllOrders from "./pages/admin/AdminAllOrders.jsx";
import AdminChef from "./pages/admin/AdminChef.jsx";
import AdminFood from "./pages/admin/AdminFood.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import AdminNewFood from "./pages/admin/AdminNewProduct.jsx";
import Admin from "./pages/admin/AdminPage";
import AdminUserDetails from "./pages/admin/AdminUserDetails.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import Authentication from "./pages/Authentication";
import ChatPage from "./pages/ChatPage.jsx";
import ChefAccOrders from "./pages/chef/ChefAccOrders.jsx";
import ChefAllOrders from "./pages/chef/ChefAllOrders.jsx";
import ChefHome from "./pages/chef/ChefHome.jsx";
import ChefOrders from "./pages/chef/ChefOrders";
import Chef from "./pages/chef/ChefPage";
import Contactus from "./pages/Contactus";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import Error from "./pages/Error";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import Home from "./pages/Home";
import Detail from "./pages/OrderDetails.jsx";
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
            <Route path="/" element={<Home />} />

            <Route path="/dishes/:id" element={<FoodDetails />} />
            <Route path="/dishes" element={<FoodListing />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="*" element={<Error />} />

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

              <Route element={<Chef />}>
                <Route path="/chef/" exact element={<ChefHome />} />
                <Route path="/chef/orders" exact element={<ChefOrders />} />
                <Route
                  path="/chef/accorders"
                  exact
                  element={<ChefAccOrders />}
                />
                <Route
                  path="/chef/allorders"
                  exact
                  element={<ChefAllOrders />}
                />
              </Route>

              <Route element={<Admin />}>
                <Route path="/admin" exact element={<AdminHome />} />
                <Route
                  path="/admin/activeorders"
                  exact
                  element={<AdminAccOrders />}
                />
                <Route
                  path="/admin/allorders"
                  exact
                  element={<AdminAllOrders />}
                />
                <Route path="/admin/foods" exact element={<AdminFood />} />
                <Route
                  path="/admin/foods/add"
                  exact
                  element={<AdminNewFood />}
                />
                <Route path="/admin/chefs" exact element={<AdminChef />} />
                <Route path="/admin/users" exact element={<AdminUsers />} />
                <Route
                  path="/admin/details"
                  exact
                  element={<AdminUserDetails />}
                />
              </Route>
            </Route>

            <Route path="/chat" exact element={<ChatPage />} />
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
