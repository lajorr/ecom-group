import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb"
import ProductItemTable from "../../../components/Tables/admin/ProductItemTable"
import { useProductContext } from "../../../provider/ProductProvider"
import { ProductRequest, ProductResponse } from "../../../types/product"

const ViewProducts = () => {

    const prodCtx = useProductContext()


    const handleDelete = async (id: string) => {
        const result = await prodCtx.deleteProduct(id);
        alert(result)
    }
    const handleEdit = async (product: ProductRequest, id: string) => {
        const result = await prodCtx.updateProduct(id, product)
        alert(result)
    }

    const prodList: ProductResponse[] = prodCtx.products
    // console.log("asdasdasda" + prodList[0].name)

    const columns = ['Name', 'Category', 'Brand', 'Price' , 'Action']
    return (
        <>
            <Breadcrumb pageName="All Products" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <ProductItemTable columnList={columns} itemData={prodList} onDelete={handleDelete} onEdit={handleEdit} />
            </div >
        </>
    )
}

export default ViewProducts