import { useState } from "react";
import { IoEnterOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { Product, ProductResponse } from "../../../types/product";
import CheckboxTwo from "../../Checkboxes/CheckboxTwo";
import EditModal from "../../Modal/EditModal";


type ProductItemTableProps = {
    columnList: string[],
    itemData: Product[],
    onDelete: (id: string) => void,
    onEdit: (product: Omit<ProductResponse, '_id'>, id: string) => void
}

const ProductItemTable = ({ columnList, itemData, onDelete, onEdit }: ProductItemTableProps) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleOnProductSubmit = async (e: React.FormEvent<HTMLFormElement>, isFeatured: boolean) => {
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
        const is_featured = isFeatured;
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


        if (selectedProduct) {
            onEdit(newProduct, selectedProduct._id);
        }
        else {
            alert("No product selected")
        }
        form.reset()
        setShowModal(false);
    }


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Products
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3  rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
                    {columnList.map((columnName, idx) => (
                        <div key={columnName} className={`p-2.5 xl:p-5 sm:block  ${idx > 2 ? "hidden" : ""}`}>
                            <h5 className="text-sm  font-medium uppercase xsm:text-base">
                                {columnName}
                            </h5>
                        </div>
                    ))}
                </div>

                {itemData.map((product, key) => (
                    <div
                        className={`grid grid-cols-3 items sm:grid-cols-6  ${key === itemData.length - 1
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex-shrink-0">
                                {/* <img src={product._id} alt="product" /> */}
                                <p className="text-black dark:text-white" >{product.name}</p>
                            </div>

                        </div>
                        <div className="flex items-center p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                {product.category?.name ?? "category delete"}
                            </p>
                        </div>
                        <div className="flex items-center p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                {product.brand?.name ?? "brand deletedF"}
                            </p>
                        </div>
                        <div className="flex items-center p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                {product.price}
                            </p>
                        </div>

                        <div className="flex items-center  p-2.5 xl:p-5">

                            <CheckboxTwo isChecked={product.is_featured} />
                        </div>

                        <div className="flex gap-3 items-center p-2.5 xl:p-5 ">

                            <button>
                                <IoEnterOutline className="size-6" />
                            </button>
                            <button onClick={() => {
                                setSelectedProduct(product)
                                setShowModal(true)
                            }}>
                                <MdModeEdit className="size-6" />
                            </button>
                            <button onClick={() => onDelete(product._id)}>
                                <MdDeleteOutline className="size-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (

                <EditModal showModal={showModal}
                    setShowModal={setShowModal}
                    slug='product'
                    handleProductSubmit={handleOnProductSubmit}
                    selectedProduct={selectedProduct}

                />
            )}
        </div>
    )
}

export default ProductItemTable