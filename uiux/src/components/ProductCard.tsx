import { Link } from "react-router-dom";
import { useCartContext } from "../providers/CartContext";
import { ProductCardProp } from "../types/ProductCardProp";

const ProductCard = ({ product }: ProductCardProp) => {
  const cartContext = useCartContext();

  const { _id, name, price, brand, image } = product;

  const handleOnCartClick = () => {
    cartContext.addToCart(product);
  };
  return (
    <div className="flex justify-center">
      <div className="bg-gray-300 w-min rounded-xl overflow-hidden ">
        <div className="w-[250px] cursor-pointer relative group">
          <Link to={`productdetail/${_id}`}>
            <img
              className="w-full h-[180px] object-cover"
              src={image}
              alt="img"
              onClick={() => {
                console.log("img clicked");
              }}
            />
          </Link>
          <button
            className="absolute bottom-0 w-full bg-black/70 text-white text-[16px] font-bold py-4  hidden group-hover:block hover:underline"
            onClick={handleOnCartClick}
          >
            Add to Cart
          </button>
        </div>
        <Link to={`product-detail/${_id}`}>
          <div className="size-full py-3 px-4">
            <h2 className="font-bold text-[20px] leading-6">{name}</h2>
            <p
              className="text-[16px] font-bold italic cursor-pointer hover:underline inline "
              onClick={() => {
                console.log("brand CLick");
              }}
            >
              {brand.name}
            </p>
            <p className="text-[16px] font-[500]">${price}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
