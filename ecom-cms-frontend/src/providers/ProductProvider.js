import { createContext, useContext, useState } from "react";
import { getBrandById } from "services/brandServices";
import { getCategoryById } from "services/categoryServices";
import {
  addProduct,
  deleteProductById,
  getProducts,
} from "services/productService";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const addNewProduct = async (data) => {
    const result = await addProduct(data);
    getAllProducts();
    return result;
  };

  const getBrand = async (id) => {
    const result = await getBrandById(id);
    return result;
  };
  const getCategory = async (id) => {
    const result = await getCategoryById(id);
    return result;
  };

  const getAllProducts = async () => {
    const result = await getProducts();
    const products = await Promise.all(
      result.map(async (product) => {
        const brand = await getBrand(product.brand);
        const cat = await getCategory(product.category);
        return { ...product, brand: brand, category: cat };
      })
    );
    console.log(products);
    setProducts(products);
  };

  const deleteProduct = async (id) => {
    const result = await deleteProductById(id);
    getAllProducts();
    return result;
  };

  return (
    <productContext.Provider
      value={{ addNewProduct, getAllProducts, deleteProduct, products }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;

export function useProductContext() {
  const ctx = useContext(productContext);
  if (!ctx) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return ctx;
}
