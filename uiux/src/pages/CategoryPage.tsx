import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../providers/ProductContext";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const prodCtx = useProductContext();

  useEffect(() => {
    prodCtx.fetchProducts();
  }, []);

  const prodList = prodCtx.products;
  const productsByCat = prodList.filter(
    (products) => products.category === categoryName
  );
  return (
    <div>
      <h2 className="uppercase">Products in {categoryName}</h2>
      <div>
        {productsByCat.length > 0 ? (
          productsByCat.map((product) => (
            <div key={product._id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
            </div>
          ))
        ) : (
          <p>No products found in this {categoryName}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
