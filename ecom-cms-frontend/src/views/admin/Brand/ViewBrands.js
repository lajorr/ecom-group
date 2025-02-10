import ItemColumn from "components/Display/ItemColumn";
import ItemTile from "components/Display/ItemTile";
import { useBrandContext } from "providers/BrandProvider";
import { getColumns } from "utils/utilFunctions";

const ViewBrands = () => {
  const brandCtx = useBrandContext();
  const allBrands = brandCtx.brands;
  const color = "light";

  const handleItemDelete = async (brandId) => {
    const result = await brandCtx.deleteBrand(brandId);
    alert(result.msg);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 ">
      <div className="rounded-t bg-white px-6 py-4 ">
        <h6 className="text-blueGray-700 text-xl font-bold mb-4">
          View All Brands
        </h6>
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr
              className={
                color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              {getColumns(allBrands).map((column, index) => (
                <ItemColumn key={index} color={color} columnName={column} />
              ))}
            </tr>
          </thead>
          <tbody>
            {allBrands.map((brand) => (
              <ItemTile
                key={brand._id}
                item={brand}
                onDeleteItem={() => handleItemDelete(brand._id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBrands;
