import api from "./api";

export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function getUserById(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function register(userData) {
  const response = await api.post("/users", userData);
  return response.data;
}

export async function findUserByEmail(email) {
  const response = await api.get("/users", { params: { email } });
  return response.data?.[0] || null;
}

export async function updateUser(id, userData) {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
}

export default {
  getUsers,
  getUserById,
  register,
  findUserByEmail,
  updateUser
};
