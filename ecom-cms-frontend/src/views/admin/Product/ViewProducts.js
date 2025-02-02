import ItemColumn from "components/Display/ItemColumn";
import ItemTile from "components/Display/ItemTile";
import { useProductContext } from "providers/ProductProvider";
import { getColumns } from "utils/utilFunctions";

const ViewProducts = () => {
  const prodCtx = useProductContext();
  const allProducts = prodCtx.products;
  const color = "light";

  const handleDeleteProduct = async (id) => {
    const result = await prodCtx.deleteProduct(id);
    alert(result.msg);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 ">
      <div className="rounded-t bg-white mb-0 px-6 py-4 ">
        <h6 className="text-blueGray-700 text-xl font-bold">
          View All Products
        </h6>
        <table className="w-full">
          <thead>
            <tr
              className={
                color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              {getColumns(allProducts).map((column, index) => (
                <ItemColumn key={index} color={color} columnName={column} />
              ))}
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <ItemTile
                key={product._id}
                item={product}
                onDeleteItem={() => handleDeleteProduct(product._id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProducts;
