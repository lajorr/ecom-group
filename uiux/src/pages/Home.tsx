import { useEffect, useState } from "react";
import { AdBanner } from "../components/AdBanner";
import CategoryProducts from "../components/CategoryProducts";
import { useCategoryContext } from "../providers/CategoryContext";
import { useProductContext } from "../providers/ProductContext";
import { useBrandContext } from "../providers/BrandContext";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";

export const Home = () => {
  const prodCtx = useProductContext();
  const catCtx = useCategoryContext();
  const brandCtx = useBrandContext();

  useEffect(() => {
    prodCtx.fetchProducts();
    catCtx.fetchCategories();
    brandCtx.fetchbrands();
  }, []);

  const productList = prodCtx.products;
  const uniqueCategories = catCtx.categories;
  const brandList = brandCtx.brands;

  // 🔹 State for Filters
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // 🔹 Handle Brand Selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // 🔹 Get Min & Max Price Dynamically
  const minPrice = Math.min(...productList.map((p) => p.price), 0);
  const maxPrice = Math.max(...productList.map((p) => p.price), 1000);

  // 🔹 Filter Products
  let filteredProducts = productList;

  // Filter by Brand
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedBrands.includes(product.brand.name)
    );
  }

  // Filter by Price
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="max-w-[1536px] mx-auto">
      <main className="mt-4">
        <div className="flex gap-4">
          {/* Sidebar for Filters */}
          <section className="w-[350px] h-min bg-gray-200 p-4 rounded-xl sticky top-4">
            <div className="p-4 bg-white rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-bold mb-2 text-center">
                Filter by Brand
              </h2>
              <FormGroup>
                {brandList.map((brand) => (
                  <FormControlLabel
                    key={brand._id}
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => handleBrandChange(brand.name)}
                      />
                    }
                    label={brand.name}
                  />
                ))}
              </FormGroup>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-2 text-center">
                Filter by Price
              </h2>
              <div className="p-4">
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) =>
                    setPriceRange(newValue as [number, number])
                  }
                  valueLabelDisplay="auto"
                  min={minPrice}
                  max={maxPrice}
                  step={10}
                />
                <Typography gutterBottom align="center">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
              </div>
            </div>
          </section>

          {/* 🔹 Product List */}
          <div className="w-full flex flex-col gap-4">
            <CategoryProducts
              products={filteredProducts.filter((p) => p.is_featured)}
              prodTitle="Featured Products"
              isFeatured
            />
            {uniqueCategories.map((cat) => (
              <CategoryProducts
                key={cat._id}
                products={filteredProducts.filter(
                  (product) => product.category._id === cat._id
                )}
                prodTitle={cat.name}
              />
            ))}
            <AdBanner>
              <img
                className="size-full object-cover"
                src="https://picsum.photos/seed/img2/1536/600"
                alt=""
              />
            </AdBanner>
          </div>
        </div>
      </main>
    </div>
  );
};
