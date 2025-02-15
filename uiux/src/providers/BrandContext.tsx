import { createContext, ReactNode, useContext, useState } from "react";
import { fetchAllBrands } from "../services/brand";
import { Brand } from "../types/Brand";

type BrandState = {
  brands: Brand[];
  fetchbrands: () => void;
};

const BrandContext = createContext<BrandState | undefined>(undefined);

export const BrandProvider = ({ children }: { children: ReactNode }) => {
  const [brands, setbrands] = useState<Brand[]>([]);

  const fetchbrands = async () => {
    const prodResponse = await fetchAllBrands();

    const result: Brand[] = await Promise.all(
      prodResponse.map(async (Brand) => {
        return {
          ...Brand,
        };
      })
    );

    setbrands(result);
  };

  return (
    <BrandContext.Provider value={{ brands, fetchbrands }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrandContext must be used within a BrandProvider");
  }
  return context;
};
