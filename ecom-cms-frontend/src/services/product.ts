import { ProductResponse } from "../types/product";
import { api } from "../utils/Api";

export const fetchAllProducts = async () => {
    const response = await api().get<ProductResponse[]>('products')
    return response.data;
}
export const addProduct = async (data: Omit<ProductResponse, '_id'>) => {
    const response = await api().post('products', data)
    return response.data;
}

export const getProductById = async (id: string) => {
    const response = await api().get<ProductResponse>(`products/${id}`)
    return response.data;
}

export const deleteProductById = async (id: string) => {
    const response = await api().delete(`products/${id}`)
    return response.data;
}

export const updateProductById = async (id: string, data: Omit<ProductResponse, '_id'>) => {
    const response = await api().patch(`products/${id}`, data)
    return response.data;
}