import { api } from "utils/api";

export const getCategories = async () => {
  try {
    const response = await api().get("/categories");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api().get(`/categories/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addCategory = async (catName) => {
  try {
    const response = await api().post("/categories", catName);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await api().delete(`/categories/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
