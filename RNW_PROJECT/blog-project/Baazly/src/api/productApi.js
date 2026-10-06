import api from "./api";

export async function getProducts(params = {}) {
  const cleanParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "" && value !== "all" && value !== "All Categories") {
      cleanParams[key] = value;
    }
  }

  const response = await api.get("/products", { params: cleanParams });
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function createProduct(productData) {
  const response = await api.post("/products", productData);
  return response.data;
}

export async function updateProduct(id, productData) {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
}

export async function patchProduct(id, productData) {
  const response = await api.patch(`/products/${id}`, productData);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
