import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useBrandContext } from "../../../provider/BrandProvider";

const AddBrand = () => {

    const brandCtx = useBrandContext();

    const handleOnBrandSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget
        const formData = new FormData(form);
        const brandName = formData.get('brandName') as string;
        const result = await brandCtx.addBrand({ name: brandName });
        form.reset()
        alert(result)
    }

    return (
        <>
            <Breadcrumb pageName="Add Brand" />
            <div className=" max-w-[720px] mx-auto" >
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Brand Form
                        </h3>
                    </div>
                    <form onSubmit={handleOnBrandSubmit}>
                        <div className="p-6.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter brand name"
                                name="brandName"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <button className="mt-6 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Add Brand
                            </button>
                        </div>
                    </form>
                </div >
            </div ></>
    )
}

export default AddBrand