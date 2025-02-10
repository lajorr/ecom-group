import { api } from "../api/api";

export const fetchCategoryById = async (id: string) => {
    try {
        const response = await api().get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const fetchAllCategories = async () => {
    try {
        const response = await api().get('/categories');
        return response.data;
    } catch (error) {
        throw error
    }
}   