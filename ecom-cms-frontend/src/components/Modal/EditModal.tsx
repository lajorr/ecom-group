import { FormEvent, useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useBrandContext } from "../../provider/BrandProvider";
import { useCategoryContext } from "../../provider/CategoryProvider";
import { Category } from "../../types/category";
import { Product } from "../../types/product";
import SelectGroupOne from "../Forms/SelectGroup/SelectGroupOne";
import MySwitcher from "../Switchers/MySwitcher";


type EditModalProps = {
    showModal: boolean,
    setShowModal: (arg: boolean) => void,
    slug: string,
    handleProductSubmit?: (e:
        FormEvent<HTMLFormElement>,
        bool: boolean
    ) => void,
    handleCategorySubmit?: (e: FormEvent<HTMLFormElement>) => void
    handleBrandSubmit?: (e: FormEvent<HTMLFormElement>) => void
    selectedProduct?: Product | null,
    selectedCategory?: Category | null
    selectedBrand?: Category | null
}
const EditModal = ({
    showModal,
    setShowModal,
    slug,
    handleProductSubmit,
    handleCategorySubmit,
    handleBrandSubmit,
    selectedProduct,
    selectedCategory,
    selectedBrand
}: EditModalProps) => {
    const [enabled, setEnabled] = useState<boolean>(false);

    const brands = useBrandContext().allBrands;
    const categories = useCategoryContext().categories;
    useEffect(() => {
        setEnabled(selectedProduct?.is_featured || false);
    }, [])

    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
            <div
                className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch 
                            shadow-lg bg-white dark:bg-boxdark gap-5 ${showModal ? 'translate-y-0' : 'translate-y-full'
                    }
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
                    <button
                        onClick={() => {
                            setShowModal(false);
                        }}
                        className="absolute top-5 right-3 btn btn-ghost btn-circle"
                    >
                        <HiOutlineXMark className="text-xl font-bold" />
                    </button>
                    <span className="text-2xl font-bold">Edit {slug}</span>
                </div>
                {slug === 'product' && (
                    <form onSubmit={(e) => handleProductSubmit?.(e, enabled)}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={selectedProduct?.name || ''}
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
                                            defaultValue={selectedProduct?.price.slice(1) || '0'}
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

                                            placeholder="123"
                                            name="offerPrice"
                                            defaultValue={selectedProduct?.offer_price?.slice(1) || ''}
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
                                        defaultValue={selectedProduct?.stock || ''}
                                        className="appearance-none w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className=" flex flex-col gap-6 xl:flex-row">
                                <SelectGroupOne labelText="Brand" hintText="Select Brand" fieldName="brandId" brands={brands} selectedBrand={selectedProduct?.brand} />
                                <SelectGroupOne labelText="Category" hintText="Select Category" fieldName="categoryId" categories={categories} selectedCategory={selectedProduct?.category} />
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
                                        defaultValue={selectedProduct?.image || ''}
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
                                    defaultValue={selectedProduct?.description || ''}
                                    className="resize-none w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Edit Product
                            </button>
                        </div>
                    </form>
                )}
                {slug === 'category' && (

                    <form onSubmit={handleCategorySubmit}>
                        <div className="p-6.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="catName"
                                defaultValue={selectedCategory?.name || ''}
                                placeholder="Enter category name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <button className="mt-6 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Edit Category
                            </button>
                        </div>
                    </form>
                )}
                {slug === 'brand' && (

                    <form onSubmit={handleBrandSubmit}>
                        <div className="p-6.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="brandName"
                                defaultValue={selectedBrand?.name || ''}
                                placeholder="Enter category name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <button className="mt-6 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Edit Brand
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default EditModal