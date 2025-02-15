import { createContext, useContext, useState } from "react";
import { addBrand, deleteBrandById, fetchAllBrands, updateBrandById } from "../services/brand";
import { Brand } from "../types/brand";

type BrandState = {
    allBrands: Brand[],
    fetchBrands: () => void,
    addBrand: (arg0: Omit<Brand, '_id'>) => Promise<string>,
    deleteBrand: (id: string) => void
    updateBrand: (id: string, data: Omit<Brand, '_id'>) => Promise<string>
}


const brandContext = createContext<BrandState | undefined>(undefined);


export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
    const [allBrands, setAllBrands] = useState<Brand[]>([]);

    
    const getAllBrands = async () => {
        const allBrands = await fetchAllBrands();
        setAllBrands(allBrands);
    }

    const addNewBrand = async (brand: Omit<Brand, '_id'>) => {
        const result = await addBrand(brand);
        await getAllBrands()
        return result.msg;
    }
    const deleteBrand = async (id: string) => {
        const result = await deleteBrandById(id);
        await getAllBrands()
        return result.msg;
    }
    const updateBrand = async (id: string, data: Omit<Brand, '_id'>) => {
        const result = await updateBrandById(id, data);
        await getAllBrands()
        return result.msg;
    }

    return (
        <brandContext.Provider value={{
            allBrands,
            fetchBrands: getAllBrands,
            addBrand: addNewBrand,
            deleteBrand,
            updateBrand
        }}>
            {children}
        </brandContext.Provider>
    )
}

export const useBrandContext = () => {
    const context = useContext(brandContext);
    if (!context) {
        throw new Error('useBrandContext must be used within a BrandProvider');
    }
    return context;
}