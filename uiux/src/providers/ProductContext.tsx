import { createContext, ReactNode, useContext, useState } from "react";
import { fetchAllProducts } from "../services/products";
import Product from "../types/Product";

type ProductState = {
    products: Product[]
    fetchProducts: () => void
}


const ProductContext = createContext<ProductState | undefined>(undefined);


export const ProductProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const prodResponse = await fetchAllProducts();

        const result: Product[] = await Promise.all(prodResponse.map(async (product) => {
            console.log("product", product);
            return {
                ...product,
            }
        }));

        console.log("result", result)

        setProducts(result)
    }

    return <ProductContext.Provider value={{ products, fetchProducts }}>
        {children}
    </ProductContext.Provider >
}


export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
}   