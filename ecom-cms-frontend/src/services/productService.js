import { api } from "utils/api";

export const getProducts = async () => {
  try {
    const response = await api().get("/products");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = async (product) => {
  try {
    const response = await api().post("/products", product);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await api().delete(`/products/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
