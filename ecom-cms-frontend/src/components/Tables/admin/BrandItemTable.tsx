import { useState } from "react";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { Brand } from "../../../types/brand";
import EditModal from "../../Modal/EditModal";

type BrandItemTableProps = {
    columnList: string[],
    itemData: Brand[],
    onDelete: (id: string) => void,
    onEdit: (brand: Omit<Brand, '_id'>, id: string) => void
}

const BrandItemTable = ({ columnList, itemData, onDelete, onEdit }: BrandItemTableProps) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

    const handleOnBrandSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget
        const formData = new FormData(form);
        const brandName = formData.get('brandName') as string;

        console.log("item table " + brandName)
        onEdit({ name: brandName }, selectedBrand?._id as string)
        setShowModal(false);
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Brands
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                    {columnList.map((columnName, idx) => (
                        <div key={columnName} className={`p-2.5 xl:p-5 sm:block ${idx > 1 ? "hidden" : ""}`}>
                            <h5 className="text-sm  font-medium uppercase xsm:text-base">
                                {columnName}
                            </h5>
                        </div>
                    ))}
                </div>

                {itemData.map((brand, key) => (
                    <div
                        className={`grid grid-cols-2 items sm:grid-cols-4  ${key === itemData.length - 1
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex items-center">
                                {/* <img src={brand._id} alt="Brand" /> */}
                                <p className="text-black w-full dark:text-white break-all" >{brand._id}</p>
                            </div>

                        </div>
                        <div className="flex items-center p-2.5 xl:p-5">
                            <p className=" text-black dark:text-white sm:block">
                                {brand.name}
                            </p>
                        </div>
                        <div className="flex gap-3 items-center p-2.5 xl:p-5 ">


                            <button onClick={() => { setSelectedBrand(brand); setShowModal(true) }}>
                                <MdModeEdit className="size-6" />
                            </button>
                            <button onClick={() => onDelete(brand._id)}>
                                <MdDeleteOutline className="size-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <EditModal showModal={showModal}
                    setShowModal={setShowModal}
                    slug='brand'
                    handleBrandSubmit={handleOnBrandSubmit}
                    selectedBrand={selectedBrand}

                />
            )}
        </div>
    )
}

export default BrandItemTable