import api from "./api";

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}

export async function getCategoryById(id) {
  const response = await api.get(`/categories/${id}`);
  return response.data;
}

export default {
  getCategories,
  getCategoryById
};
