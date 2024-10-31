import axios from "axios";

const API = axios.create({
  baseURL: "https://servereats.onrender.com/api",
});

//auth
export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);
export const getUser = async (token) =>
  await API.get(`/user/`, { headers: { Authorization: `Bearer ${token}` } });

//products
export const getAllProducts = async (filter) =>
  await API.get(`/food?${filter}`, filter);

export const getProductDetails = async (id) => await API.get(`/food/${id}`);

//Cart
export const getCart = async (token) =>
  await API.get(`/user/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromCart = async (token, data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAllFromCart = async (token) =>
  await API.delete(`/user/cart/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Orders
export const placeOrder = async (token, data) =>
  await API.post(`/user/orders/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrdersByCustomer = async (token) =>
  await API.get(`/user/orders/customer`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrdersByChef = async (token) =>
  await API.get(`/user/orders/chef`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrder = async (token, id) =>
  await API.get(`/user/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await API.get(`/user/orders/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateOrder = async (token, data) =>
  await API.put(`/user/orders/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
