// import { productList } from '../constants/products';

import { useEffect } from "react";
import { AdBanner } from "../components/AdBanner";
import CategoryProducts from "../components/CategoryProducts";
import { useCategoryContext } from "../providers/CategoryContext";
import { useProductContext } from "../providers/ProductContext";
import { useBrandContext } from "../providers/BrandContext";

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
  const featuredProducts = productList.filter((product) => product.is_featured);
  const brandList = brandCtx.brands;

  return (
    <div className=" max-w-[1536px] mx-auto">
      <main className="mt-4">
        <div className="flex gap-4">
          <section className="w-[350px] h-min bg-gray-200 p-2  rounded-xl sticky top-4">
            {brandList.map((brand) => (
              <div key={brand._id}>{brand.name}</div>
            ))}
          </section>
          <div className="w-full flex flex-col gap-4">
            <CategoryProducts
              products={featuredProducts}
              prodTitle="Featured Products"
              isFeatured
            />
            {uniqueCategories.map((cat) => (
              <CategoryProducts
                key={cat._id}
                products={productList.filter(
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
