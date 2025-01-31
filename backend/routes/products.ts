import { Router } from "express";
import {
    handleCreateNewProduct,
    handleDeleteProductById,
    handleGetAllProducts,
    handleUpdateProductById
} from "../controllers/product";

const router = Router();

router.route('/')
    .get(handleGetAllProducts)
    .post(handleCreateNewProduct);

router.route('/:id')
    .delete(handleDeleteProductById)
    .patch(handleUpdateProductById);


export default router;``