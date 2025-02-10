import { useCategoryContext } from "providers/CategoryProvider";
import { useState } from "react";

const AddCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const categoryContext = useCategoryContext();

  const handleAddNewCategory = async () => {
    if (categoryName === "") {
      return;
    }
    const result = await categoryContext.addNewCategory(categoryName);
    alert(result.msg);
    setCategoryName("");
  };
  return (
    <div className="flex flex-wrap relative">
      <div className="w-full px-4">
        <div className="relative  bg-white w-full shadow-lg rounded">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add Category
                </h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleAddNewCategory}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddNewCategory();
                }}
              >
                <h6 className="text-blueGray-400 text-sm mt-3  font-bold uppercase mb-6">
                  Category Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600
                       bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear 
                       transition-all duration-150"
                        placeholder="ex: Clothing"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
