import { Request, Response } from "express";
import Brand from "../models/brand";

const handleGetAllBrands = async (req: Request, res: Response) => {
    const allBrands = await Brand.find({})
    console.log(allBrands)
    res
        .status(200)
        .json(allBrands);
}
const handleCreateBrand = async (req: Request, res: Response) => {
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
}

const handleGetBrandById = async (req: Request, res: Response) => {
    const brandId = req.params.id;
    console.log(brandId)
    const brand = await Brand.findById(brandId)
    res
        .status(200)
        .json(brand);
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
    const brandId = req.params.id;
    const result = await Brand.findByIdAndUpdate(brandId, req.body)
    if (result === null) {
        res.status(400).json({ msg: 'No brand found' });
    }
    res.status(200)
        .json({ msg: `brand ${brandId} has been updated` })
}

export {
    handleCreateBrand,
    handleDeleteBrandById,
    handleGetAllBrands,
    handleGetBrandById,
    handleUpdateBrandById
};

