import { createContext, ReactNode, useContext, useState } from "react";
import Product from "../types/Product";

export type CartProduct = {
    product: Product,
    quantity: number,
    subTotal: number
}

type CartContextType = {
    cartList: CartProduct[],
    addToCart: (product: Product) => void,
    orderLength: number,
    getTotal: () => number,
    removeItemFromCart: (id: string) => void,
    incrementQuantity: (id: string) => void,
    decrementQuantity: (id: string) => void,

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [orders, setOrders] = useState<CartProduct[]>([]);

    const calculateTotal = () => {
        const total = orders.reduce((prev, current) => prev + current.subTotal, 0).toFixed(2)
        return Number(total);
    }

    const removeItem = (id: string) => {
        const updatedCart = orders.filter(order => order.product._id !== id);
        setOrders(updatedCart);
    }

    const addToCart = (product: Product) => {
        const newOrder: CartProduct = { product, quantity: 1, subTotal: Number(product.price) }
        const existingOrder = orders.find(order => order.product._id === product._id);

        if (existingOrder) {
            existingOrder.quantity++;
            existingOrder.subTotal += Number();
        } else {
            setOrders(prev => [...prev, newOrder]);
        }
    }

    const incrementQuantity = (id: string) => {
        const order = orders.find(order => order.product._id === id);
        if (order) {
            const updatedOrder: CartProduct = {
                ...order,
                quantity: order.quantity + 1,
                subTotal: order.subTotal + Number(order.product.price)
            };
            setOrders(prev => prev.map(order => order.product._id === id ? updatedOrder : order));
        }
    }

    const decrementQuantity = (id: string) => {
        const order = orders.find(order => order.product._id === id);
        if (order) {
            if (order.quantity > 1) {
                const updatedOrder = {
                    ...order,
                    quantity: order.quantity - 1,
                    subTotal: order.subTotal - Number(order.product.price)
                }
                setOrders(prev => prev.map(order => order.product._id === id ? updatedOrder : order))
            }
        }
    }

    return (
        <CartContext.Provider value={
            {
                cartList: orders,
                addToCart,
                orderLength: orders.length,
                getTotal: calculateTotal,
                removeItemFromCart: removeItem,
                incrementQuantity,
                decrementQuantity
            }
        }
        >
            {children}
        </CartContext.Provider>)
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}
