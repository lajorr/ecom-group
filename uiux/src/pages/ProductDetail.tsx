import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../providers/ProductContext";
import Product from "../types/Product";
import { useCartContext } from "../providers/CartContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const ProductDetail = () => {
  const { id } = useParams();
  const prodCtx = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  const cartContext = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const handleOnCartClick = async () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        await cartContext.addToCart(product);
      }
    }
  };

  useEffect(() => {
    const fetchedProduct = prodCtx.products.find((p) => p._id === id);
    setProduct(fetchedProduct || null);
  }, [id, prodCtx.products]);

  if (!product) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-xl mt-2">${product.price}</p>
          <p className="text-lg mt-4">{product.description}</p>

          <p className="mt-2 font-bold">
            Brand: <span className="italic">{product.brand.name}</span>
          </p>

          <div className="mt-4 flex items-center space-x-4">
            <span className="text-lg font-bold mb-2">Quantity</span>
            <button
              className="px-4 py-2 bg-red-500 text-black rounded-md"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <RemoveRoundedIcon sx={{ color: "white" }} />
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              className="px-4 py-2 bg-green-400 text-black rounded-md"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <AddRoundedIcon sx={{ color: "white" }} />
            </button>
          </div>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700"
            onClick={handleOnCartClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
