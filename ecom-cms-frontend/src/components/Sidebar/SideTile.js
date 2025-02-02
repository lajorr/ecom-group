import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideTile = ({ title, linkTo, icon, options = null }) => {
  const [collapseShow, setCollapseShow] = useState(false);

  const navigate = useNavigate();
  const isActive = window.location.href.indexOf(linkTo) !== -1;

  return (
    <div className="items-center">
      <div
        className={
          "text-xs uppercase py-3 font-bold" +
          (isActive
            ? "text-lightBlue-500 hover:text-lightBlue-600"
            : "text-blueGray-700 hover:text-blueGray-500")
        }
      >
        <div
          className="cursor-pointer mr-4 flex items-center justify-between"
          onClick={() => {
            if (!options) {
              navigate(linkTo);
            } else {
              setCollapseShow((prev) => !prev);
            }
          }}
        >
          <div>
            <i
              className={
                icon +
                "mr-2 text-sm " +
                (window.location.href.indexOf(linkTo) !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>
            {title}
          </div>

          {options && (
            <i
              className={
                "fas fa-angle-down mr-2 text-sm block" +
                (window.location.href.indexOf(linkTo) !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
              style={{
                transform: collapseShow ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
              }}
            ></i>
          )}
        </div>
        {collapseShow && (
          <div className="mt-2 bg-red-300">
            {options.map((option) => {
              return (
                <SideTile
                  key={option.name}
                  title={option.name}
                  linkTo={option.path}
                  icon={option.icon}
                />
              );
            })}
            <hr className="my-2 h-[0.3rem]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideTile;
