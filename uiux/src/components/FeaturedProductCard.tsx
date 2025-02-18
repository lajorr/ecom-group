import { Link } from "react-router-dom";
import { useCartContext } from "../providers/CartContext";
import { ProductCardProp } from "../types/ProductCardProp";

const FeaturedProductCard = ({ product }: ProductCardProp) => {
  const cartContext = useCartContext();

  const { _id, name, description, price, brand, image } = product;

  const handleOnCartClick = () => {
    cartContext.addToCart(product);
  };

  return (
    <div className="flex justify-center">
      <Link to={`productdetail/${_id}`}>
        <div className="bg-gray-300 w-min rounded-xl overflow-hidden ">
          <div className="w-[300px] cursor-pointer relative group">
            <img
              className="w-full h-[200px] object-cover "
              src={image}
              alt="img"
              onClick={() => {
                console.log("img clicked");
              }}
            />
            <button
              className="absolute bottom-0 w-full bg-black/70 text-white text-[16px] font-bold py-4  hidden group-hover:block hover:underline"
              onClick={handleOnCartClick}
            >
              Add to Cart
            </button>
          </div>
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
            <p className="text-[14px] line-clamp-2 my-1">{description}</p>
            <p className="text-[16px] font-[500]">${price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProductCard;
