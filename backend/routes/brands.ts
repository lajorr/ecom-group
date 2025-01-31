import { Router } from "express";
import {
    handleCreateBrand,
    handleDeleteBrandById,
    handleGetAllBrands,
    handleGetBrandById,
    handleUpdateBrandById
} from "../controllers/brand";

const router = Router();

router.route('/')
    .get(handleGetAllBrands)
    .post(handleCreateBrand);


router.route('/:id')
    .get(handleGetBrandById)
    .delete(handleDeleteBrandById)
    .patch(handleUpdateBrandById);



export default router;