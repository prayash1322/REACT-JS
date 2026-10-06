import api from "./api";

export async function getOrders(params = {}) {
  const response = await api.get("/orders", { params });
  return response.data;
}

export async function getOrdersByUserId(userId) {
  const response = await api.get("/orders", { params: { userId } });
  return response.data;
}

export async function getOrderById(id) {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}

export async function createOrder(orderData) {
  const response = await api.post("/orders", orderData);
  return response.data;
}

export default {
  getOrders,
  getOrdersByUserId,
  getOrderById,
  createOrder
};
