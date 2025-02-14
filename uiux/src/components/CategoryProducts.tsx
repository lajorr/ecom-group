import Product from '../types/Product';
import FeaturedProductCard from './FeaturedProductCard';
import ProductCard from './ProductCard';


interface props {
    products: Product[],
    prodTitle?: string,
    className?: string,
    isFeatured?: boolean
}
const CategoryProducts = ({ className = "", products, prodTitle, isFeatured = false }: props) => {

    const title = prodTitle ?? products[0].category.name;
    return (
        <>
            {products.length !== 0 ? (<section className={`w-full bg-gray-200 py-4 px-12 rounded-xl ${className} `}>
                <h1 className='text-[24px] font-[500] mb-4 capitalize'>{title}</h1>
                <div className='grid grid-cols-3 gap-y-12 mx-8 mb-4 border' >
                    {products.map((product) => {
                        if (isFeatured) {
                            return < FeaturedProductCard key={product._id} product={product} />
                        } else {
                            return <ProductCard key={product._id} product={product} />
                        }
                    }
                    )}
                </div>
            </section>) : ""}

        </>
    )
}
export default CategoryProducts