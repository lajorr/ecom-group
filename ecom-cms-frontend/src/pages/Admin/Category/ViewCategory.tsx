import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb"
import CategoryItemTable from "../../../components/Tables/admin/CategoryItemTable"
import { useCategoryContext } from "../../../provider/CategoryProvider"
import { Category } from "../../../types/category"

const ViewCategory = () => {

    const catCtx = useCategoryContext();

    const categoryList: Category[] = catCtx.categories;

    const handleDelete = (id: string) => {
        const result = catCtx.deleteCategory(id);
        alert(result)
    }
    const handleEdit = async (category: Omit<Category, '_id'>, id: string) => {
        const result = await catCtx.updateCategory(id, category);
        alert(result)
    }

    return (
        <>

            <Breadcrumb pageName="All Categories" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <CategoryItemTable
                    columnList={['_id', 'Name', 'Action']}
                    itemData={categoryList}
                    onDelete={handleDelete}
                    onEdit={handleEdit} />
            </div >
        </>
    )
}

export default ViewCategory