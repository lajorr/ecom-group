import { api } from "../api/api";
import { CartRequest, CartResponse } from "../types/Cart";

export const fetchCart = async () => {
    try {
        const response = await api().get<CartResponse | null>('/carts');
        return response.data;
    } catch (error) {
        throw error
    }
}

export const addItemToCart = async (data: CartRequest) => {
    try {
        console.log("sertvice")
        const response = await api().post('/carts', data);
        console.log("resoinse", response.data)
        return response.data;
    } catch (error) {
        throw error
    }
}
export const deleteItemFromCart = async (cartId: string) => {
    try {
        const response = await api().delete(`/carts/${cartId}`);
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

export const checkoutCart = async () => {
    try {
        const response = await api().post('/carts/checkout');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}