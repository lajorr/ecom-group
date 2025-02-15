import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useCategoryContext } from "../../../provider/CategoryProvider";

const AddCategory = () => {

    const catCtx = useCategoryContext();

    const handleOnCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget
        const formData = new FormData(form);
        const catName = formData.get('catName') as string;
        const result = await catCtx.addCategory({ name: catName });
        form.reset()
        alert(result)
    }
    return (
        <>
            <Breadcrumb pageName="Add Category" />
            <div className=" max-w-[720px] mx-auto" >
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Category Form
                            </h3>
                        </div>
                        <form onSubmit={handleOnCategorySubmit}>
                            <div className="p-6.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Name <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="catName"
                                    placeholder="Enter category name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <button className="mt-6 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default AddCategory