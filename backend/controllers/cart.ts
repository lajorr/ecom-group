import { Request, Response } from "express";
import { Types } from "mongoose";
import Cart, { ICart } from "../models/cart";
import Product from "../models/product";

export const getCartItems = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({
            status: "pending"
        }).populate("items.product", "name price image").exec();
        console.log(cart);
        // const total = cart.reduce((total, item) => total + item.sub_total, 0)
        // const response = {
        //     items: cart,
        //     cart_total: total
        // }
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { quantity, sub_total, product_id, cart_id } = req.body;
        if (!product_id || !sub_total || !quantity) {
            res.status(400).json({ msg: "All fields are required" });
            return;
        }
        console.log("request", req.body);
        const prod = await Product.findById(product_id);
        if (!prod) {
            res.status(400).json({ msg: "Product not found" });
            return;
        }

        const subTotal = sub_total ?? quantity * prod.price;

        if (cart_id) {
            const cart = await Cart.findById(cart_id).populate("items.product").exec();
            if (!cart) {
                res.status(400).json({ msg: "Invalid cart id" });
                return;
            }
            if (cart.items.length !== 0) {
                let itemFound = false;
                cart.items = cart.items.map((item) => {
                    if (typeof item.product === "object") {
                        const productObj = item.product as any;
                        if (productObj._id.equals(prod._id)) {
                            itemFound = true
                            return {
                                ...item,
                                quantity: item.quantity + 1,
                                sub_total: item.sub_total + (item.product as any).price,
                            };
                        }
                    }
                    return item;
                });
                if (!itemFound) {
                    cart.items.push({
                        product: product_id,
                        quantity,
                        sub_total: subTotal,
                    },)
                }
            }
            else {
                cart.items.push({
                    product: product_id,
                    quantity,
                    sub_total: subTotal,
                },)
            }
            cart.cart_total = cart.items.reduce((sum, item) => sum + item.sub_total, 0);
            await cart.save()
            console.log("cartt", cart)
            res.status(200).json({ msg: "Added to cart" });
        } else {
            const cartItem: ICart = await Cart.create({
                items: [
                    {
                        product: new Types.ObjectId(product_id),
                        quantity,
                        sub_total: subTotal,
                    },
                ],
                cart_total: subTotal,
            });
            res.status(200).json({ msg: "Added to new cart" });
            return
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const prodId = req.params.id;
        const cart = await Cart.findOneAndUpdate(
            { "items.product": prodId }, // Find cart with matching product ID
            {
                $pull: { items: { product: prodId } },
                $set: { cart_total: 0 }
            },
            { new: true } // Return the updated cart
        );
        if (cart === null) {
            res.status(400).json({ msg: "No cart item found" });
            return;
        }
        const updatedCartTotal = cart.items.reduce(
            (total, item) => total + item.sub_total,
            0
        );
        cart.cart_total = updatedCartTotal;
        await cart.save();
        res.status(200).json({ msg: `cart ${prodId} has been removed` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateItemQuantity = async (req: Request, res: Response) => {
    try {
        const { quantity, sub_total } = req.body;
        if (!quantity || !sub_total) {
            res.status(400).json({ msg: "Quantity and Sub total are required" });
            return;
        }

        const prodId = req.params.id;
        const result = await Cart.findOneAndUpdate(
            { product: prodId },
            { quantity, sub_total }
        );
        if (result === null) {
            res.status(400).json({ msg: "No cart item found" });
            return;
        }
        res.status(200).json({ msg: `cart item ${result._id} has been updated` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const handleCartCheckout = async (req: Request, res: Response) => {
    try {
        const cartItems = await Cart.find({});
        if (cartItems.length === 0) {
            res.status(400).json({ msg: "Cart is empty" });
            return;
        }
        // await Cart.deleteMany({})
        // const response = {
        //     items: cartItems,
        //     total: cartItems.reduce((total, item) => total + item.sub_total, 0),
        // }
        res.status(200).json({ msg: "wip" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
