import { Brand } from "../types/brand";
import { api } from "../utils/Api";

export const fetchAllBrands = async () => {
    const response = await api().get<Brand[]>('brands')
    return response.data;
}
export const addBrand = async (data: Omit<Brand, '_id'>) => {
    const response = await api().post('brands', data)
    return response.data;
}

export const getBrandById = async (id: string) => {
    const response = await api().get<Brand>(`brands/${id}`)
    return response.data;
}

export const deleteBrandById = async (id: string) => {
    const response = await api().delete(`brands/${id}`)
    return response.data;
}

export const updateBrandById = async (id: string, data: Omit<Brand, '_id'>) => {
    const response = await api().patch(`brands/${id}`, data)
    return response.data;
}