import { createContext, useContext, useState } from "react";
import { addProduct, deleteProductById, fetchAllProducts, updateProductById } from "../services/product";
import { ProductRequest, ProductResponse } from "../types/product";

type ProductState = {
    products: ProductResponse[]
    fetchProducts: () => void
    addNewProduct: (data: ProductRequest) => Promise<string>
    deleteProduct: (id: string) => Promise<string>
    updateProduct: (id: string, data: ProductRequest) => Promise<string>
}

const ProductContext = createContext<ProductState | undefined>(undefined);


export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductResponse[]>([]);

    const getAllProducts = async () => {
        const productResponses = await fetchAllProducts();

        const products: ProductResponse[] = await Promise.all(
            productResponses.map(async (productResponse) => {
                return {
                    ...productResponse,
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

    const addNewProduct = async (product: ProductRequest) => {
        const result = await addProduct(product);
        await getAllProducts()
        return result.msg;
    }

    const updateProduct = async (id: string, product: ProductRequest) => {
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