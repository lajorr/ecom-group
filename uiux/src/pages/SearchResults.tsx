import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../providers/ProductContext";
import { useBrandContext } from "../providers/BrandContext";
import CategoryProducts from "../components/CategoryProducts";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";
import { AdBanner } from "../components/AdBanner";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const prodCtx = useProductContext();
  const brandCtx = useBrandContext();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const minPrice = Math.min(...prodCtx.products.map((p) => p.price), 0);
  const maxPrice = Math.max(...prodCtx.products.map((p) => p.price), 1000);

  const filteredProducts = prodCtx.products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand.name);

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesBrand && matchesPrice;
  });

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="max-w-[1536px] mx-auto mt-4">
      <h1 className="text-2xl font-bold text-center">
        Search Results for "{searchQuery}"
      </h1>
      <main className="mt-4">
        <div className="flex gap-4 mt-6">
          <section className="w-[350px] h-min bg-gray-200 p-4 rounded-xl sticky top-4">
            <div className="p-4 bg-white rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-bold mb-2 text-center">
                Filter by Brand
              </h2>
              <FormGroup>
                {brandCtx.brands.map((brand) => (
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

          <div className="w-full flex flex-col gap-4">
            {filteredProducts.length === 0 ? (
              <h2 className="text-center text-xl font-semibold mt-6">
                No products found.
              </h2>
            ) : (
              <CategoryProducts
                products={filteredProducts}
                prodTitle="Matching Products"
              />
            )}
            <AdBanner>
              <img
                className="size-full object-cover"
                src="https://picsum.photos/seed/img2/1536/600"
                alt="Ad Banner"
              />
            </AdBanner>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
