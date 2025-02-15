import { Request, Response } from "express";
import Brand from "../models/brand";

const handleGetAllBrands = async (req: Request, res: Response) => {
    try {
        const allBrands = await Brand.find({})
        res
            .status(200)
            .json(allBrands);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }

}
const handleCreateBrand = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        if (!body || !body.name) {
            res.status(400).json({ msg: 'Brand name is required' });
            return
        }
        const newBrand = await Brand.create({
            name: body.name,
            description: body.description
        })

        res.status(201).json(
            { msg: `${newBrand.name} has been created` }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const handleGetBrandById = async (req: Request, res: Response) => {
    try {
        const brandId = req.params.id;
        const brand = await Brand.findById(brandId)
        res
            .status(200)
            .json(brand);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }

}

const handleDeleteBrandById = async (req: Request, res: Response) => {
    try {

        const brandId = req.params.id;
        const result = await Brand.findByIdAndDelete(brandId)
        if (result === null) {
            res.status(400).json({ msg: 'No brand found' });
            return
        }
        res.status(200)
            .json({ msg: `brand ${result._id} has been deleted` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const handleUpdateBrandById = async (req: Request, res: Response) => {
    try {
        const brandId = req.params.id;
        const result = await Brand.findByIdAndUpdate(brandId, req.body)
        if (result === null) {
            res.status(400).json({ msg: 'No brand found' });
            return
        }
        res.status(200)
            .json({ msg: `brand ${brandId} has been updated` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export {
    handleCreateBrand,
    handleDeleteBrandById,
    handleGetAllBrands,
    handleGetBrandById,
    handleUpdateBrandById
};

