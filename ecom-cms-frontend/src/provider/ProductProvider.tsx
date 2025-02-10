import { createContext, useContext, useState } from "react";
import { getBrandById } from "../services/brand";
import { getCategoryById } from "../services/category";
import { addProduct, deleteProductById, fetchAllProducts, updateProductById } from "../services/product";
import { Product, ProductResponse } from "../types/product";

type ProductState = {
    products: Product[]
    fetchProducts: () => void
    addNewProduct: (data: Omit<ProductResponse, '_id'>) => Promise<string>
    deleteProduct: (id: string) => Promise<string>
    updateProduct: (id: string, data: Omit<ProductResponse, '_id'>) => Promise<string>
}

const ProductContext = createContext<ProductState | undefined>(undefined);


export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const getAllProducts = async () => {
        const productResponses = await fetchAllProducts();

        const products: Product[] = await Promise.all(
            productResponses.map(async (productResponse) => {
                return {
                    ...productResponse,
                    brand: await getBrandById(productResponse.brand),
                    category: await getCategoryById(productResponse.category),
                };
            })
        );

        setProducts(products);
    };

    const deleteProduct = async (id: string) => {
        const result = await deleteProductById(id);
        await getAllProducts()
        return result.msg;
    }

    const addNewProduct = async (product: Omit<ProductResponse, '_id'>) => {
        const result = await addProduct(product);
        await getAllProducts()
        return result.msg;
    }

    const updateProduct = async (id: string, product: Omit<ProductResponse, '_id'>) => {
        const result = await updateProductById(id, product);
        await getAllProducts()
        return result.msg;
    }

    return (
        <ProductContext.Provider value={{
            products,
            fetchProducts: getAllProducts,
            addNewProduct,
            deleteProduct,
            updateProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}


export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}