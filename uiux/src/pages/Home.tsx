// import { productList } from '../constants/products';

import { useEffect } from "react"
import { AdBanner } from "../components/AdBanner"
import CategoryProducts from "../components/CategoryProducts"
import { useCategoryContext } from "../providers/CategoryContext"
import { useProductContext } from "../providers/ProductContext"

export const Home = () => {

    const prodCtx = useProductContext()
    const catCtx = useCategoryContext()
    useEffect(() => {
        prodCtx.fetchProducts()
        catCtx.fetchCategories()
    }, [])

    const productList = prodCtx.products
    catCtx.fetchCategories()
    const uniqueCategories = catCtx.categories;
    const featuredProducts = productList.filter(product => product.is_featured);
    return (
        <div className=' max-w-[1536px] mx-auto'>

            <main className='mt-4' >
                <div className='flex gap-4' >
                    {/* side section */}
                    <section className='w-[350px] h-min bg-gray-200 p-2  rounded-xl sticky top-4'>
                        {uniqueCategories.map((cat) => (
                            <div key={cat._id}>{cat.name}</div>
                        ))}
                    </section>
                    <div className='w-full flex flex-col gap-4' >
                        <CategoryProducts products={featuredProducts} prodTitle="Featured Products" isFeatured />
                        {uniqueCategories.map((cat) => (
                            <CategoryProducts key={cat._id} products={productList.filter(product => product.category._id === cat._id)} prodTitle={cat.name} />
                        ))}
                        <AdBanner >
                            <img className='size-full object-cover' src='https://picsum.photos/seed/img2/1536/600' alt="" />
                        </AdBanner>
                    </div>
                </div>
            </main>

        </div>
    )
}
