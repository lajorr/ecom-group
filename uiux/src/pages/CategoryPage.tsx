// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useProductContext } from "../providers/ProductContext";
// import ProductCard from "../components/ProductCard";
// import { AdBanner } from "../components/AdBanner";
// import { useBrandContext } from "../providers/BrandContext";
// import { Slider, Typography } from "@mui/material";

// const CategoryPage: React.FC = () => {
//   const { categoryName } = useParams<{ categoryName: string }>();
//   const prodCtx = useProductContext();
//   const brandCtx = useBrandContext();

//   const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

//   useEffect(() => {
//     prodCtx.fetchProducts();
//     brandCtx.fetchbrands();
//   }, []);

//   const prodList = prodCtx.products;
//   const brandList = brandCtx.brands;

//   const minPrice = Math.min(...prodList.map((p) => p.price), 0);
//   const maxPrice = Math.max(...prodList.map((p) => p.price), 1000);

//   let filteredProducts = prodList.filter(
//     (product) =>
//       product.category.name.toLowerCase() === categoryName?.toLowerCase()
//   );

//   if (selectedBrand) {
//     filteredProducts = filteredProducts.filter(
//       (product) =>
//         product.brand.name.toLowerCase() === selectedBrand.toLowerCase()
//     );
//   }

//   filteredProducts = filteredProducts.filter(
//     (product) =>
//       product.price >= priceRange[0] && product.price <= priceRange[1]
//   );

//   return (
//     <div className=" max-w-[1536px] mx-auto">
//       <main className="mt-4">
//         <div className="flex gap-4">
//           <section className="w-[350px] h-min bg-gray-200 p-2  rounded-xl sticky top-4 ">
//             <div className="p-4 bg-white rounded-lg shadow-md m-4">
//               <h2 className="text-lg font-bold mb-2 text-center">
//                 Filter by Brand
//               </h2>
//               <ul>
//                 <li
//                   className="cursor-pointer p-1 rounded"
//                   onClick={() => setSelectedBrand(null)}
//                 >
//                   All Brands
//                 </li>
//               </ul>
//               {brandList.map((brand) => (
//                 <li
//                   className="cursor-pointer p-1 rounded list-none"
//                   onClick={() => setSelectedBrand(brand.name)}
//                 >
//                   {brand.name}
//                 </li>
//               ))}
//             </div>
//             <div className="p-4 bg-white rounded-lg shadow-md m-4">
//               <h3 className="text-lg font-bold mb-2 text-center">
//                 Filter by Price
//               </h3>
//               {/* <div className="p-4 bg-white rounded-lg shadow-md"> */}
//               <div className="p-4 rounded-lg">
//                 <Slider
//                   value={priceRange}
//                   onChange={(_, newValue) =>
//                     setPriceRange(newValue as [number, number])
//                   }
//                   valueLabelDisplay="auto"
//                   min={minPrice}
//                   max={maxPrice}
//                   step={10}
//                 />
//                 <Typography gutterBottom align="center">
//                   Rs.{priceRange[0]} - Rs.{priceRange[1]}
//                 </Typography>
//               </div>
//             </div>
//           </section>
//           <div className="w-full flex flex-col gap-4">
//             <div className="grid grid-cols-3 gap-y-12 gap-x-12 mx-8 mb-4">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     className="p-4 border rounded-lg shadow-md"
//                   >
//                     <ProductCard key={product._id} product={product} />
//                   </div>
//                 ))
//               ) : (
//                 <p>No products found in this {categoryName}</p>
//               )}
//             </div>
//             <AdBanner>
//               <img
//                 className="size-full object-cover"
//                 src="https://picsum.photos/seed/img2/1536/600"
//                 alt=""
//               />
//             </AdBanner>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CategoryPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../providers/ProductContext";
import ProductCard from "../components/ProductCard";
import { AdBanner } from "../components/AdBanner";
import { useBrandContext } from "../providers/BrandContext";
import {
  Slider,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const prodCtx = useProductContext();
  const brandCtx = useBrandContext();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    prodCtx.fetchProducts();
    brandCtx.fetchbrands();
  }, []);

  const prodList = prodCtx.products;
  const brandList = brandCtx.brands;

  const minPrice = Math.min(...prodList.map((p) => p.price), 0);
  const maxPrice = Math.max(...prodList.map((p) => p.price), 1000);

  // 🔹 Handle brand selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // 🔹 Filter Products
  let filteredProducts = prodList.filter(
    (product) =>
      product.category.name.toLowerCase() === categoryName?.toLowerCase()
  );

  // Filter by selected brands
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedBrands.includes(product.brand.name)
    );
  }

  // Filter by price
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="max-w-[1536px] mx-auto">
      <main className="mt-4">
        <div className="flex gap-4">
          {/* Sidebar - Filters */}
          <section className="w-[350px] h-min bg-gray-200 p-4 rounded-xl sticky top-4">
            {/* 🔹 Brand Filter */}
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
              <h3 className="text-lg font-bold mb-2 text-center">
                Filter by Price
              </h3>
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
                  Rs. {priceRange[0]} - Rs. {priceRange[1]}
                </Typography>
              </div>
            </div>
          </section>

          {/* 🔹 Products List */}
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-y-12 gap-x-12 mx-8 mb-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="p-4 border rounded-lg shadow-md"
                  >
                    <ProductCard key={product._id} product={product} />
                  </div>
                ))
              ) : (
                <p>No products found in this category: {categoryName}</p>
              )}
            </div>

            {/* 🔹 Ad Banner */}
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

export default CategoryPage;
