import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb"
import BrandItemTable from "../../../components/Tables/admin/BrandItemTable"
import { useBrandContext } from "../../../provider/BrandProvider"
import { Brand } from "../../../types/brand"

const ViewBrands = () => {

    const brandCtx = useBrandContext();
    const brandList: Brand[] = brandCtx.allBrands;
    const handleDelete = (id: string) => {
        const result = brandCtx.deleteBrand(id);
        alert(result)
    }

    const handleEdit = async (brand: Omit<Brand, '_id'>, id: string) => {
        const result = await brandCtx.updateBrand(id, brand);
        alert(result)
    }

    return (
        <>
            <Breadcrumb pageName="All Brands" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <BrandItemTable columnList={['_id', 'Name', 'Action']} itemData={brandList} onDelete={handleDelete} onEdit={handleEdit} />
            </div >

        </>
    )
}

export default ViewBrands