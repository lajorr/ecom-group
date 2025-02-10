import { Category } from "../types/category";
import { api } from "../utils/Api";

export const fetchAllCategories = async () => {
    const response = await api().get<Category[]>('categories')
    return response.data;
}
export const addCategory = async (data: Omit<Category, '_id'>) => {
    const response = await api().post('categories', data)
    return response.data;
}

export const getCategoryById = async (id: string) => {
    const response = await api().get<Category>(`categories/${id}`)
    return response.data;
}

export const deleteCategoryById = async (id: string) => {
    const response = await api().delete(`categories/${id}`)
    return response.data;
}

export const updateCategoryById = async (id: string, data: Omit<Category, '_id'>) => {
    const response = await api().patch(`categories/${id}`, data)
    return response.data;
}