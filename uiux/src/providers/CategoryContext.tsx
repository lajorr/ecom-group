import { createContext, ReactNode, useContext, useState } from "react";
import { fetchAllCategories } from "../services/category";
import { Category } from "../types/Category";

type CategoryState = {
    categories: Category[]
    fetchCategories: () => void
}


const CatContext = createContext<CategoryState | undefined>(undefined);


export const CategoryProvider = ({ children }: { children: ReactNode }) => {

    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const cats = await fetchAllCategories();
        setCategories(cats)
    }


    return <CatContext.Provider value={{ categories, fetchCategories }}>{children}</CatContext.Provider>
}

export const useCategoryContext = () => {
    const context = useContext(CatContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }
    return context
}