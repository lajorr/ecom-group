import { Router } from "express";
import {
    handleCreateCategory,
    handleDeleteCategoryById,
    handleGetAllCategories,
    handleGetCategoryById,
    handleUpdateCategoryById
} from "../controllers/category";

const router = Router();

router.route('/')
    .get(handleGetAllCategories)
    .post(handleCreateCategory);

router.route('/:id')
    .get(handleGetCategoryById)
    .delete(handleDeleteCategoryById)
    .patch(handleUpdateCategoryById);


export default router;