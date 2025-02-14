import { Request, Response } from "express";
import Cart, { ICart } from "../models/cart";

export const getCartItems = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.find({})
        console.log(cart)
        const total = cart.reduce((total, item) => total + item.sub_total, 0)
        const response = {
            items: cart,
            cartTotal: total
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }

}

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { img_url, product_name, price, quantity, sub_total } = req.body;
        if (!img_url || !product_name || !price || !quantity) {
            res.status(400).json({ msg: 'All fields are required' });
            return
        }
        const subTotal = sub_total ?? quantity * price

        const cartItem: ICart = await Cart.create({
            img_url,
            product_name,
            price,
            quantity,
            sub_total: subTotal
        })

        res.status(200).json({ msg: "Added to cart" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })

    }
}

export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const cartId = req.params.id;
        const result = await Cart.findByIdAndDelete(cartId)
        if (result === null) {
            res.status(400).json({ msg: 'No cart item found' });
            return
        }
        res.status(200)
            .json({ msg: `cart item ${result._id} has been deleted` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export const updateItemQuantity = async (req: Request, res: Response) => {
    try {
        const { quantity, sub_total } = req.body
        if (!quantity || !sub_total) {
            res.status(400).json({ msg: 'Quantity and Sub total are required' });
            return
        }

        const cartId = req.params.id;
        const result = await Cart.findByIdAndUpdate(cartId, { quantity, sub_total })
        if (result === null) {
            res.status(400).json({ msg: 'No cart item found' });
            return
        }
        res.status(200)
            .json({ msg: `cart item ${result._id} has been updated` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export const handleCartCheckout = async (req: Request, res: Response) => {
    try {
        const cartItems = await Cart.find({})
        if (cartItems.length === 0) {
            res.status(400).json({ msg: 'Cart is empty' })
            return
        }
        await Cart.deleteMany({})
        const response = {
            items: cartItems,
            total: cartItems.reduce((total, item) => total + item.sub_total, 0),
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
}