import { api } from "../api/api";
import { ProductResponse } from "../types/Product";

export const fetchAllProducts = async () => {
    try {
        const response = await api().get<ProductResponse[]>('/products');
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}