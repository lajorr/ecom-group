import { api } from "../api/api";
import { CartCheckoutRequest, CartRequest, CartResponse } from "../types/Cart";
import { Order } from "../types/Order";

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

export const updateCartItemQuantity = async (cartId: string, productId: string, quantity: number) => {
    try {
        const response = await api().patch(`/carts/${cartId}`, { quantity, product_id: productId });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const checkoutCart = async (payload: CartCheckoutRequest) => {
    try {
        console.log(payload)
        const response = await api().post('/carts/checkout', payload);
        console.log("checkout response", response.data)
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getOrderByCartId = async (cartId: string) => {
    try {
        const response = await api().get<Order>(`/carts/checkout/${cartId}`);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}