import { Request, Response } from "express";
import Category from "../models/category";

const handleGetAllCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await Category.find({})
        res
            .status(200)
            .json(allCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const handleGetCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId)
        res
            .status(200)
            .json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const handleCreateCategory = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        console.log(body)
        if (!body || !body.name) {
            res.status(400).json({ msg: 'Category name is required' });
            return
        }
        const newCategory = await Category.create({
            name: body.name,
            description: body.description
        })

        res.status(201).json(
            { msg: `${newCategory.name} has been created` }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const handleDeleteCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const result = await Category.findByIdAndDelete(categoryId)
        if (result === null) {
            res.status(400).json({ msg: 'No category found' });
            return
        }
        res.status(200)
            .json({ msg: `category ${categoryId} has been deleted` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const handleUpdateCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;

        const result = await Category.findByIdAndUpdate(categoryId, req.body)
        if (result === null) {
            res.status(400).json({ msg: 'No category found' });
        }
        res.status(200)
            .json({ msg: `category ${categoryId} has been updated` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export { handleCreateCategory, handleDeleteCategoryById, handleGetAllCategories, handleGetCategoryById, handleUpdateCategoryById };

