import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { addItemToCart, deleteItemFromCart, fetchCart, updateCartItemQuantity } from "../services/cart";
import { CartProduct } from "../types/Cart";
import Product from "../types/Product";



type CartContextType = {
    cartList: CartProduct[],
    addToCart: (product: Product) => void,
    orderLength: number,
    removeItemFromCart: (id: string) => void,
    incrementQuantity: (id: string) => void,
    decrementQuantity: (id: string) => void,
    // fetchCartItems: () => void,
    cartTotal: number,

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [cart, setCart] = useState<CartProduct[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);

    useEffect(() => { fetchCartItems() }, [])

    const removeItem = async (id: string) => {
        const updatedCart = cart.filter(order => order.product_id !== id);
        await deleteItemFromCart(id);
        await fetchCartItems()
        setCart(updatedCart);
    }

    const addToCart = async (product: Product) => {
        const newProd: CartProduct = {
            product_name: product.name,
            product_id: product._id,
            quantity: 1,
            sub_total: Number(product.price),
            price: Number(product.price),
            image: product.image

        }
        const existingProduct = cart.find(order => order.product_id === product._id);

        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.sub_total += Number(product.price);
        } else {
            setCart(prev => [...prev, newProd]);
            await addItemToCart(
                {
                    product_name: newProd.product_name,
                    product_id: newProd.product_id,
                    quantity: 1,
                    sub_total: newProd.sub_total,
                    image: newProd.image,
                    price: Number(newProd.price)
                }
            );
        }
        await fetchCartItems()
    }

    const incrementQuantity = async (id: string) => {
        const cartProd = cart.find(c => c.product_id === id);
        if (cartProd) {
            const updatedCart: CartProduct = {
                ...cartProd,
                quantity: cartProd.quantity + 1,
                sub_total: cartProd.sub_total + Number(cartProd.price)
            };
            await updateCartItemQuantity(updatedCart.product_id, updatedCart.quantity, updatedCart.sub_total)
            await fetchCartItems()
            setCart(prev => prev.map(c => c.product_id === id ? updatedCart : c));
        }

    }

    const decrementQuantity = async (id: string) => {
        const cartProd = cart.find(order => order.product_id === id);
        if (cartProd) {
            if (cartProd.quantity > 1) {
                const updatedCart = {
                    ...cartProd,
                    quantity: cartProd.quantity - 1,
                    sub_total: cartProd.sub_total - Number(cartProd.price)
                }
                await updateCartItemQuantity(updatedCart.product_id, updatedCart.quantity, updatedCart.sub_total)
                await fetchCartItems()
                setCart(prev => prev.map(c => c.product_id === id ? updatedCart : c))
            }
        }
    }

    const fetchCartItems = async () => {
        const cartResponse = await fetchCart();
        console.log("fethcinggg", cartResponse.items)
        setCart(cartResponse.items);
        setCartTotal(cartResponse.cart_total)
    }

    return (
        <CartContext.Provider value={
            {
                cartList: cart,
                addToCart,
                orderLength: cart.length,
                removeItemFromCart: removeItem,
                incrementQuantity,
                decrementQuantity,
                cartTotal,
                // fetchCartItems
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
