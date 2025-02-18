import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../providers/CartContext";
import ExpandableSearch from "./ExpandableSearch";
import { useCategoryContext } from "../providers/CategoryContext";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartContext = useCartContext();
  const catCtx = useCategoryContext();

  useEffect(() => {
    catCtx.fetchCategories;
  }, []);

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
        {catList.map((item) => {
          const isActive =
            location.pathname === `/category/${item.name.toLowerCase()}`;
          return (
            <li
              key={item._id}
              className={`text-[20px] inline-block mr-8 font-semibold cursor-pointer ${
                isActive
                  ? "text-pink-200 border-b-2 border-pink-200"
                  : "text-white"
              }`}
            >
              <Link to={`/category/${item.name.toLowerCase()}`}>
                {item.name}
              </Link>
            </li>
          );
        })}
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
