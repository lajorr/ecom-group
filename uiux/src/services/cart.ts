import { api } from "../api/api";
import { CartRequest, CartResponse } from "../types/Cart";

export const fetchCart = async () => {
    try {
        const response = await api().get<CartResponse>('/carts');
        return response.data;
    } catch (error) {
        throw error
    }
}

export const addItemToCart = async (data: CartRequest) => {
    try {
        const response = await api().post('/carts', data);
        return response.data;
    } catch (error) {
        throw error
    }
}
export const deleteItemFromCart = async (productId: string) => {
    try {
        const response = await api().delete(`/carts/${productId}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const updateCartItemQuantity = async (cartId: string, quantity: number, sub_total: number) => {
    try {
        const response = await api().patch(`/carts/${cartId}`, { quantity, sub_total });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }

}