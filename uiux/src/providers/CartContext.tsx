import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { addItemToCart, checkoutCart, deleteItemFromCart, fetchCart, getOrderByCartId, updateCartItemQuantity } from "../services/cart";
import { CartProduct, CartRequest } from "../types/Cart";
import { Order } from "../types/Order";
import Product from "../types/Product";



type CartContextType = {
    cartList: CartProduct[],
    addToCart: (product: Product) => void,
    orderLength: number,
    removeItemFromCart: (id: string) => void,
    incrementQuantity: (id: string) => void,
    decrementQuantity: (id: string) => void,
    cartTotal: number,
    cartCheckout: (name: string, phone: number, address: string) => void,
    fetchOrderDetails: () => void,
    orderDetails: Order | null

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [cart, setCart] = useState<CartProduct[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [cartId, setCartId] = useState<string | null>(null);
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);

    useEffect(() => { fetchCartItems() }, [])

    const removeItem = async (id: string) => {
        const updatedCart = cart.filter(order => order.product._id !== id);
        await deleteItemFromCart(id);
        await fetchCartItems()
        setCart(updatedCart);
    }

    const addToCart = async (product: Product) => {
        const newProd: CartRequest = {
            product_id: product._id,
            quantity: 1,
            sub_total: product.price,
            cart_id: cartId
        }
        const existingProduct = cart.find(cart => cart.product._id === product._id);

        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.sub_total += Number(product.price);
        }
        await addItemToCart(
            newProd
        );
        await fetchCartItems()
    }

    const incrementQuantity = async (prodId: string) => {
        const cartProd = cart.find(c => c.product._id === prodId);
        if (cartProd) {
            const updatedCart: CartProduct = {
                ...cartProd,
                quantity: cartProd.quantity + 1,
                sub_total: cartProd.sub_total + cartProd.product.price
            };
            await updateCartItemQuantity(cartId!, updatedCart.product._id, updatedCart.quantity)
            await fetchCartItems()
            setCart(prev => prev.map(c => c.product._id === prodId ? updatedCart : c));
        }
    }

    const decrementQuantity = async (id: string) => {
        const cartProd = cart.find(order => order.product._id === id);
        if (cartProd) {
            if (cartProd.quantity > 1) {
                const updatedCart = {
                    ...cartProd,
                    quantity: cartProd.quantity - 1,
                    sub_total: cartProd.sub_total - cartProd.product.price
                }
                await updateCartItemQuantity(cartId!, updatedCart.product._id, updatedCart.quantity)
                await fetchCartItems()
                setCart(prev => prev.map(c => c.product._id === id ? updatedCart : c))
            }
        }
    }

    const fetchCartItems = async () => {
        const cartResponse = await fetchCart();
        if (cartResponse) {
            setCart(cartResponse.items);
            setCartTotal(cartResponse.cart_total)
            setCartId(cartResponse._id)
        } else {
            setCart([])
            setCartTotal(0)
            setCartId(null)
        }
    }

    const cartCheckout = async (name: string, phone: number, address: string) => {
        await checkoutCart({
            full_name: name,
            total_amount: cartTotal,
            address,
            cart_id: cartId!,
            phone
        });
        await fetchCartItems()
    }

    const fetchOrderDetails = async () => {
        const orderDetails = await getOrderByCartId(cartId!)
        await fetchCartItems()
        setOrderDetails(orderDetails)
    }

    return (
        <CartContext.Provider value={
            {
                cartList: cart,
                orderLength: cart.length,
                addToCart,
                removeItemFromCart: removeItem,
                incrementQuantity,
                decrementQuantity,
                cartTotal,
                cartCheckout,
                fetchOrderDetails,
                orderDetails
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
