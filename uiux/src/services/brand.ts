import { api } from "../api/api";
import { Brand } from "../types/Brand";

export const fetchBrandById = async (id: string) => {
  try {
    const response = await api().get(`/brands/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllBrands = async () => {
  try {
    const response = await api().get<Brand[]>("/brands");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
