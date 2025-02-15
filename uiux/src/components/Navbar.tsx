import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../providers/CartContext";
import ExpandableSearch from "./ExpandableSearch";
import { useCategoryContext } from "../providers/CategoryContext";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const cartContext = useCartContext();
  //   const navItems = ["Clothes", "Tech", "Food"];
  const catCtx = useCategoryContext();

  useEffect(() => {
    catCtx.fetchCategories;
  });

  const catList = catCtx.categories;
  return (
    <nav className="grid grid-cols-3 bg-black px-3">
      <div className="flex  items-center">
        <LocalMallIcon
          color="primary"
          sx={{ fontSize: "48px", color: "#DDBDD5", marginX: 1 }}
        />
        <Link to="/">
          <h1 className="text-[42px] font-bold text-white">Hamro E-commerce</h1>
        </Link>
      </div>
      <div className="place-self-center ">
        <ul className="items-center uppercase inline col-span-2 my-auto">
          {catList.map((item) => (
            <li
              key={item._id}
              className="text-[20px] text-white inline-block mr-8 font-semibold cursor-pointer"
            >
              {/* {item.name} */}
              <Link to={`/category/${item.name.toLowerCase()}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 justify-end items-center">
        <ExpandableSearch />
        <div className="relative">
          <button className="bg-red-500 text-white text-[12px] font-[500] rounded-full size-4 absolute top-[-0.25rem] right-[-0.25rem]">
            {cartContext.orderLength}
          </button>
          <ShoppingCartRoundedIcon
            sx={{ color: "white", fontSize: "28px", cursor: "pointer" }}
            onClick={() => {
              navigate("/cart");
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
