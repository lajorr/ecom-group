import { Request, Response } from "express";
import { Types } from "mongoose";
import Cart, { ICart } from "../models/cart";
import { Order } from "../models/order";
import Product from "../models/product";

export const getCartItems = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({
            status: "pending"
        }).populate("items.product", "name price image").exec();
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
        const { quantity, product_id } = req.body;
        if (!quantity || !product_id) {
            res.status(400).json({ msg: "Quantity and Sub total are required" });
            return;
        }

        const prod = await Product.findById(product_id)
        if (!prod) {
            res.status(400).json({ msg: "Product not found" })
            return
        }

        const cartId = req.params.id;
        const cart = await Cart.findOneAndUpdate(
            { _id: cartId, 'items.product': product_id },
            {
                $set: {
                    "items.$.quantity": quantity,  // Update quantity
                    "items.$.sub_total": prod.toObject().price * quantity // Update sub_total
                },
            },
            { new: true }
        );
        if (cart === null) {
            res.status(400).json({ msg: "No cart item found" });
            return;
        }
        cart.cart_total = cart.items.reduce((sum, item) => sum + item.sub_total, 0);
        await cart.save();
        res.status(200).json({ msg: `cart item ${cart._id} has been updated` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const handleCartCheckout = async (req: Request, res: Response) => {
    try {
        console.log("asd", req.body)

        const { full_name, address, total_amount, cart_id, phone } = req.body
        if (!full_name || !address || !total_amount || !cart_id || !phone) {
            res.status(400).json({ msg: "All fields are required" });
            return
        }
        const cart = await Cart.findById(cart_id)
        if (!cart) {
            res.status(400).json({ msg: "No cart found" });
            return
        }
        const cartItems = cart.toObject().items
        if (cartItems.length === 0) {
            res.status(400).json({ msg: "Cart is empty" });
            return;
        }
        const order = await Order.create({
            full_name,
            address,
            total_amount,
            cart_id,
            phone
        })
        if (!order) {
            res.status(400).json({ msg: "Order could not be created" });
            return
        }
        await Cart.findByIdAndUpdate({ _id: cart_id },
            {
                $set: {
                    status: "processed"
                }
            }
        )

        res.status(200).json({ msg: "checkout complete" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const handleGetOrderByCartId = async (req: Request, res: Response) => {
    try {
        const cartId = req.params.id;
        const order = await Order.findOne({ cart_id: cartId })
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

