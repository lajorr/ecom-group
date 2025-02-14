import { Router } from "express";
import { addToCart, deleteCartItem, getCartItems, updateItemQuantity } from "../controllers/cart";

const router = Router()

router.route('/')
    .get(getCartItems)
    .post(addToCart)

router.route('/:id')
    .delete(deleteCartItem)
    .patch(updateItemQuantity)

export default router
