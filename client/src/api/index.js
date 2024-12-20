import axios from "axios";

const API = axios.create({
  baseURL: "https://servereats.onrender.com/api",
});

//auth
export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);

//user
export const getUser = async (token) =>
  await API.get(`/user/`, { headers: { Authorization: `Bearer ${token}` } });

export const updateUser = async (token, data) =>
  await API.put(`/user/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//products
export const getAllProducts = async (filter) =>
  await API.get(`/food?${filter}`, filter);

export const getProductDetails = async (id) => await API.get(`/food/${id}`);

export const addProduct = async (token, data) =>
  await API.post(`/food/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

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
  await API.get(`/user/orders/id/${id}`, {
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

//chat
export const getChat = async (token, data) =>
  await API.post(`/chat/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getChatChef = async (token) =>
  await API.get(`/chat/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

//message
export const newMessage = async (token, data) =>
  await API.post(`/chat/message/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getMessage = async (token, data) =>
  await API.post(`/chat/message/all`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
