import { Router } from "express";
import { addToCart, deleteCartItem, getCartItems, handleCartCheckout, handleGetOrderByCartId, updateItemQuantity } from "../controllers/cart";

const router = Router()

router.route('/')
    .get(getCartItems)
    .post(addToCart)

router.route('/:id')
    .delete(deleteCartItem)
    .patch(updateItemQuantity)

router.route('/checkout')
    .post(handleCartCheckout)
router.route('/checkout/:id')
    .get(handleGetOrderByCartId)



export default router
