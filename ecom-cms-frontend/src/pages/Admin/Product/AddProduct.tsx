import { useState } from "react"
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb"
import SelectGroupOne from "../../../components/Forms/SelectGroup/SelectGroupOne"
import MySwitcher from "../../../components/Switchers/MySwitcher"
import { useBrandContext } from "../../../provider/BrandProvider"
import { useCategoryContext } from "../../../provider/CategoryProvider"
import { useProductContext } from "../../../provider/ProductProvider"
import { ProductResponse } from "../../../types/product"

const AddProductPage = () => {

    const prodCtx = useProductContext()
    const brands = useBrandContext().allBrands;
    const categories = useCategoryContext().categories;

    const [enabled, setEnabled] = useState(false);



    const handleOnProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget
        const formData = new FormData(form);

        const name = formData.get('name') as string;
        const price = '$' + formData.get('price');
        const offer_price = '$' + formData.get('offerPrice');
        const brandId = formData.get('brandId') as string;
        const categoryId = formData.get('categoryId') as string;
        const description = formData.get('description') as string;
        const stock = Number(formData.get('stock'));
        const is_featured = enabled;
        const image = formData.get('image') as string;

        const newProduct: Omit<ProductResponse, '_id'> = {
            name,
            price,
            offer_price,
            brand: brandId,
            category: categoryId,
            description,
            stock,
            is_featured,
            image: image,
        }

        const result = await prodCtx.addNewProduct(newProduct);
        alert(result)
        form.reset()
    }
    return (
        <>
            <Breadcrumb pageName="Add Product" />
            <div className=" max-w-[720px] mx-auto" >
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Product Form
                            </h3>
                        </div>
                        <form onSubmit={handleOnProductSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Name <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Enter product name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Price <span className="text-meta-1">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                required
                                                placeholder="123"
                                                name="price"
                                                className="appearance-none w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 pl-9 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Offer Price
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                required
                                                placeholder="123"
                                                name="offerPrice"
                                                className="appearance-none w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 pl-9 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Stock <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            name="stock"
                                            placeholder="123"
                                            className="appearance-none w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-6 xl:flex-row">
                                    <SelectGroupOne labelText="Brand" hintText="Select Brand" fieldName="brandId" brands={brands} />
                                    <SelectGroupOne labelText="Category" hintText="Select Category" fieldName="categoryId" categories={categories} />
                                </div>
                                <div className=" flex flex-col  gap-6 xl:flex-row">

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Image <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="asdasd"
                                            name="image"
                                            className="appearance-none w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Featured
                                        </label>
                                        <MySwitcher enabled={enabled} setEnabled={setEnabled} />
                                    </div>
                                </div>
                                <div className="mb-6 mt-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        rows={6}
                                        placeholder="Type your message"
                                        className="resize-none w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                                </div>

                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default AddProductPage
