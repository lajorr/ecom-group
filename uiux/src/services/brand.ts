import { api } from "../api/api";

export const fetchBrandById = async (id: string) => {
    try {
        const response = await api().get(`/brands/${id}`);
        return response.data;
    } catch (error) {
        throw error
    }
}   